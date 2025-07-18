import { fetchAIResponse } from "../services/ChatService.js";

export default class SupportChatViewModel {
  constructor() {
    this.messages = [];
  }

  loadMessages() {
    this.messages = [{ content: "Hola! ¿En qué puedo ayudarte?", type: "received" }];
    this.renderMessages(document.querySelector("#chat-messages"));
  }

  renderMessages(container) {
    if (!container) {
      console.error("El contenedor #chat-messages no existe en el DOM.");
      return;
    }
  
    container.innerHTML = "";
  
    this.messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${message.type}`;
      messageDiv.innerHTML = `
        <span class="message-text">${message.content}</span>
      `;
      container.appendChild(messageDiv);
    });
  
    container.scrollTop = container.scrollHeight;
  }

  async sendMessage(divElement) {
    const input = divElement.querySelector("#chat-input");
    const container = divElement.querySelector("#chat-messages");
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.textContent = "Escribiendo...";

    const message = input.value.trim();
    if (!message) return;

    this.messages.push({ content: message, type: "sent" });
    this.renderMessages(container);
    input.value = "";

    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    try {
      const aiResponse = await fetchAIResponse();
      this.messages.push({ content: aiResponse, type: "received" });
    } catch (error) {
      this.messages.push({ content: "Lo siento, ocurrió un problema.", type: "received" });
    } finally {
      typingIndicator.remove();
      this.renderMessages(container);
    }
  }
}

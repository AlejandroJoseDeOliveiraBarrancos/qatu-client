const AI_API_URL = "https://api.adviceslip.com/advice";

export async function fetchAIResponse() {
  try {
    const response = await fetch(AI_API_URL);
    if (!response.ok) {
      throw new Error("Error en la API");
    }

    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    return "Lo siento, no pude procesar tu solicitud.";
  }
}

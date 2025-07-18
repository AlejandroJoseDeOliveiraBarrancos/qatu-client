export const createCardView = (container) => {
  const renderCard = (model) => {
    if (!container || typeof container.appendChild !== 'function') {
      console.error(
        "Error: 'container' no es un elemento HTML válido:",
        container,
      )
      return
    }
    container.innerHTML = ''

    const card = document.createElement('div')
    card.className = 'card'

    const contentCard = document.createElement('div')
    contentCard.className = 'card-content'

    const img = document.createElement('img')
    img.src = model.image
    img.alt = model.name

    const title = document.createElement('h2')
    title.textContent = model.name

    const description = document.createElement('p')
    description.textContent = model.description

    const button = document.createElement('button')
    button.textContent = model.buttonText
    button.type = 'button'
    button.dataset.url = model.url

    card.append(img)
    contentCard.append(title, description, button)
    card.appendChild(contentCard)
    container.appendChild(card)
  }

  const bindButtonClick = (handler) => {
    container.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const url = event.target.dataset.url
        handler(url)
      }
    })
  }

  return {
    renderCard,
    bindButtonClick,
  }
}

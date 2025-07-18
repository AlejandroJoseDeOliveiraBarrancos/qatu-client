import { createCardModel } from '../card/CardModel.js'

export const createPanelModel = (initialCardItems) => {
  const validateArray = (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      console.warn('Array vacío, no hay elementos para mostrar.')
      return []
    }
    return value
  }

  let cardItems = validateArray(initialCardItems)

  const createCardModels = (itemsCardArray) => {
    return itemsCardArray.map((itemData) => {
      const {
        productId,
        name,
        description,
        price,
        status,
        creationDate,
      } = itemData

      return createCardModel(
        productId,
        name,
        description,
        price,
        status,
        creationDate
      )
    })
  }


  const update = (newCardItems) => {
    cardItems = validateArray(newCardItems) 
  }

  return {
    update,
    getCardItems: () => createCardModels(cardItems), 
  }

}

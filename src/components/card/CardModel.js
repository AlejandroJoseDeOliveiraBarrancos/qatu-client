
export const createCardModel = (
  productId,
  name,
  description,
  price,
  status,
  creationDate,
) => {
  const validateString = (value, errorMessage) => {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(errorMessage)
    }
    return value
  }

  const validateDate = (value) => {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      throw new Error('The creationDate must be a valid Date.')
    }
    return date
  }

  const validatePrice = (value) => {
    if (typeof value !== 'number' || value < 0) {
      throw new Error('The price must be a positive number.')
    }
    return value.toFixed(2)
  }

  return {
    name: validateString(name, 'The name must be a non-empty string.'),
    description: validateString(description, 'The description must be a string.'),
    price: validatePrice(price),
    status: validateString(status, 'The status must be a non-empty string.'),
    creationDate: validateDate(creationDate),
  }
}

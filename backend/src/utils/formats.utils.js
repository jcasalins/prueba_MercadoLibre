import utilItems from '../services/items.js'

const formats = {}

const randomAddress = () => {
  const address = [
    'Capital Federal',
    'Buenos Aires',
    'Córdoba',
    'Mendoza',
    'Rosario',
    'San Miguel de Tucumán',
    'San Salvador de Jujuy',
    'Santa Fe',
    'Tucumán',
    'Ushuaia',
    'Villa Gesell',
    'Villa María'
  ]
  return address[Math.floor(Math.random() * address.length)]
}

const searchBreadcrumb = async (items) => {
  const categoryIds = items.map((item) => item.category_id)
  const count = categoryIds.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1
    return acc
  }, {})
  const mostRepeated = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  )
  return await utilItems.getCategories(mostRepeated)
}

formats.itemsList = async (search) => {
  const resutl = {}
  const itemsL = await utilItems.getItemsApi(search)
  if (itemsL.error !== undefined || itemsL.length === 0) {
    return []
  }
  const categories = await searchBreadcrumb(itemsL)
  const items = itemsL.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.trunc(item.price),
        decimals: Number(item.price.toString().split('.')[1] || 0)
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: randomAddress()
    }
  })
  resutl.author = utilItems.author
  resutl.categories = categories
  resutl.items = items
  return resutl
}

formats.item = async (id) => {
  const resutl = {}
  const item = await utilItems.getItemById(id)
  if (!item.id) {
    return item
  }
  const description = await utilItems.getItemDescription(id)
  const categories = await utilItems.getCategories(item.category_id)
  resutl.author = utilItems.author
  resutl.item = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.trunc(item.price),
      decimals: Number(item.price.toString().split('.')[1] || 0),
    },
    picture: item.pictures[0].url,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: description.plain_text,
  }
  resutl.categories = categories
  return resutl
}
export default formats

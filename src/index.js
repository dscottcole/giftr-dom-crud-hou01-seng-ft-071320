document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)
  populateGifts()
  enableSearch()
  enableGiftCreation()
})

const populateGifts = () => {
  const giftSection = document.querySelector('ul.gift-list')
  giftSection.innerHTML = ''
  for (const gift of gifts) {
    const giftLi = document.createElement('li')
    const giftImg = document.createElement('img')
    giftLi.dataset.giftId = gift.id
    giftLi.innerText = gift.name
    giftImg.src = gift.image
    giftImg.width = "200"
    giftImg.height = "200"
    giftImg.className = "gift-image"
    giftLi.appendChild(giftImg)
    giftSection.appendChild(giftLi)
  }
}

const populateSearchGift = (item) => {
  const itemSection = document.querySelector('ul.gift-list')
  itemSection.innerHTML = ''
    const itemLi = document.createElement('li')
    const itemImg = document.createElement('img')
    itemLi.dataset.itemId = item.id
    itemLi.innerText = item.name
    itemImg.src = item.image
    itemImg.width = "200"
    itemImg.height = "200"
    itemImg.className = "item-image"
    itemLi.appendChild(itemImg)
    itemSection.appendChild(itemLi)
}

const enableSearch = () => {
  const searchField = document.querySelector('#filter-input')
  let foundItems = []
  let singleItem = ''
  searchField.addEventListener('input', (e) => {
    
    if (searchField.value !== '') {
      const searchTerm = searchField.value
      for (const gift of gifts) {
        if (gift.name.includes(searchTerm)){
          foundItems.push(gift)
          for (const item of foundItems) {
            if (item.name.includes(searchTerm) === false) {
              let index = foundItems.indexOf(item)
              foundItems.splice(index,1)
              singleItem = foundItems[foundItems.length - 1]
            }
          }
        }
      }
      populateSearchGift(singleItem)
    } else if (searchField.value === '') {
      populateGifts()
    }
  })
}

const enableGiftCreation = () => {
  const giftForm = document.getElementById('gift-form')
  const giftNameField = document.getElementById('gift-name-input')
  const giftImgField = document.getElementById('gift-image-input')
  const newGift = {}
  giftForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newGift.id = gifts.length + 1
    newGift.name = giftNameField.value
    newGift.image = giftImgField.value
    e.target.reset()
    console.log(newGift)
    gifts.push(newGift)
    populateGifts()
  })
}
const cart = []

itemsLocalStorage()
cart.forEach(item => postItem(item))

function itemsLocalStorage() {
    const productItems = localStorage.length
    for (let i = 0; i < productItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

/* Création des articles dans la page panier */

function postItem(item) {
    const article = makeArticle(item)
    const div = makeImage(item)
    article.appendChild(div)

    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)

    postArticle(article)
    postTotalQuantity()
    postTotalPrice()
}

function makeCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__intem__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function postArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.productId = item.productId
    article.dataset.color = item.color
    return article
}

function makeImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)

    return div
}

/* Gestion de la quantité depuis le panier */

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => changeQuantityAndPrice(item.productId, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

/* Gestion de la suppression depuis le panier */

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemDelete = cart.findIndex(product => product.productId === item.productId && product.color === item.color)
    cart.splice[itemDelete, 1]
    postTotalQuantity()
    postTotalPrice()
    deleteCart(item)
    deleteArticleToCart(item)
}

function deleteCart(item) {
    const productKey = `${item.productId}-${item.color}`
    localStorage.removeItem(productKey)
}

function deleteArticleToCart(item) {
    const articleDelete = document.querySelector(
        `article[data-product-id="${item.productId}"][data-color="${item.color}"]`
    )
    console.log(item)
    articleDelete.remove()

    alert("Ce produit a bien été retiré du panier")
    location.reload()
}

function postTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function postTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

function changeQuantityAndPrice(productId, changeCart, item) {
    const changeId = cart.find((item) => item.productId === productId)
    changeId.quantity = Number(changeCart)
    item.quantity = changeId.quantity
    postTotalQuantity()
    postTotalPrice()
    saveCart(item)
}

function saveCart(item) {
    const data = JSON.stringify(item)
    const productKey = `${item.productId}-${item.color}`
    localStorage.setItem(productKey, data)
}
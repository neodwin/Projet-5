const cart = []

itemsLocalStorage()
cart.forEach(item => postItem(item))

function itemsLocalStorage() {
    const productItems = localStorage.length
    for (let i = 0; i < productItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function postItem(item) {
    const article = makeArticle(item)
    postArticle(article)
    const div = makeImage(item)
    article.appendChild(div)

    const cartItemContent = makeCartItemContent(item)
    article.appendChild(cartItemContent)
}

function makeCartItemContent(item) {

    const div = document.createElement("div")
    div.classList.add("cart__item__content")

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
    div.appendChild(description)
    return div
}

function postArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
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
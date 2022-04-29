const cart = []

itemsLocalStorage()
cart.forEach(item => postItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => sendForm(e))

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
    cart.splice(itemDelete, 1)
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
    articleDelete.remove()

    alert("Ce produit a bien été retiré du panier")
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
    const changeId = cart.find((product) => item.productId === productId && product.color === item.color)
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

/* Formulaire */

function sendForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Votre panier est vide :'(")
        return
    }

    if (formNotOk()) return
    if (firstNameNotOk()) return
    if (lastNameNotOk()) return
    if (cityNotOk()) return
    if (emailNotOk()) return

    const contact = makeFormContact()
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "./confirmation.html" + "?orderId=" + orderId
        })
}

function makeFormContact() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const contact = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: idsProducts()
    }
    return contact
}

function formNotOk() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Merci de remplir tous les champs")
            return true
        }
        return false
    })
}

function firstNameNotOk() {
    const firstName = document.querySelector("#firstName").value
    const regexFirstName = /^([^0-9]*)$/
    if (regexFirstName.test(firstName) === false) {
        alert("Merci d'entrer un prénom valide")
        return true
    }
    return false
}

function lastNameNotOk() {
    const lastName = document.querySelector("#lastName").value
    const regexLastName = /^([^0-9]*)$/
    if (regexLastName.test(lastName) === false) {
        alert("Merci d'entrer un nom valide")
        return true
    }
    return false
}

function cityNotOk() {
    const city = document.querySelector("#city").value
    const regexCity = /^([^0-9]*)$/
    if (regexCity.test(city) === false) {
        alert("Merci d'entrer une ville valide")
        return true
    }
    return false
}

function emailNotOk() {
    const email = document.querySelector("#email").value
    const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
    if (regexMail.test(email) === false) {
        alert("Merci d'entrer un email valide")
        return true
    }
    return false
}

function idsProducts() {
    const quantityProducts = localStorage.length
    const ids = []
    for (let i = 0; i < quantityProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}
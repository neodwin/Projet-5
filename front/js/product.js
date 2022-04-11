const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")

if (productId != null) {
    let itemPrice = 0
    let imgUrl
    let altText
}

/* Articles récupérés depuis l'API */

fetch("http://localhost:3000/api/products/" + productId)
    .then(response => response.json())
    .then((res) => productData(res))

function productData(couch) {
    const altTxt = couch.altTxt
    const colors = couch.colors
    const description = couch.description
    const imageUrl = couch.imageUrl
    const name = couch.name
    const price = couch.price
    const _id = couch._id


    /* Création de la carte du produit */

    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)

    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
}

/* Récupération de l'image */

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

/* Récupération du titre */

function makeTitle(name) {
    document.querySelector("#title").textContent = name
}

/* Récupération du prix */

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

/* Récupération de la description */

function makeDescription(description) {
    document.querySelector("#description").textContent = description
}

/* Récupération des options de couleurs */

function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

/* Ajout au panier */

const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value

        if (isOrderInvalid(color, quantity)) return
        addCart(color, quantity)
        goToCart()
    })
}

function addCart(color, quantity) {
    const data = {
        productId: productId,
        color: color,
        quantity: quantity,
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(productId, JSON.stringify(data))
}

function isOrderInvalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Please select a color and quantity")
        return true
    }
}

function goToCart() {
    window.location.href = "cart.html"
}
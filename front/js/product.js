const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")

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
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

function makeTitle(name) {
    document.querySelector("#title").textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    document.querySelector("#description").textContent = description
}

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
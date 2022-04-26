/* Finalisation de commande & affichage du numéro de commande */

function confirmationOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    return orderId
}

function setOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function cleanLocalStorage() {
    const cartLocalStorage = window.localStorage
    cartLocalStorage.clear()
}

const orderId = confirmationOrderId()
setOrderId(orderId)
cleanLocalStorage()
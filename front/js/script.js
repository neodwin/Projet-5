/* Récupération des produits */
getProducts();

/* Création des articles */
createProducts();

async function getProducts() {
    let products = await fetch("http://localhost:3000/api/products");
    console.log("Les produits sont récupérés !")
    return products.json();
}

async function createProducts() {
    let result = await getProducts()
        .then((products) => {
            for (let i = 0; i < products.length; i++) {

                /* Insertion de l'élément "<a>" */
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${products[i]._id}`;

                /* Insertion de l'élément "<article>" */
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                /* Insertion de l'image */
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = products[i].imageUrl;
                productImg.alt = products[i].altTxt;

                /* Insertion du titre "<h3>" */
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = products[i].name;

                /* Insertion de la description "<p>" */
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = products[i].description;
            }
        });
    console.log("Les produits sont crées !");
}
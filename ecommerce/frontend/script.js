document.addEventListener("DOMContentLoaded", function() {
    fetch("../backend/fetch.php")
        .then(response => response.json())
        .then(products => {
            let productsDiv = document.getElementById("products");
            products.forEach(product => {

                let productCard = document.createElement("div");
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <img src="${product.image_url}">
                    <p>Price: sh ${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;

                let button = productCard.querySelector(".add-to-cart");
                button.addEventListener("click", () => addToCart(product));
                productsDiv.appendChild(productCard);

            });
        });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
}


function updateCart(cart) {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartDiv.appendChild(cartItem);
    });
}

function removeFromCart(id) {
    fetch("api.php?action=removeFromCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(cart => {
        updateCart(cart);
    });
}

function checkout() {
    fetch("api.php?action=checkout")
        .then(response => response.json())
        .then(response => alert(response.message));
}

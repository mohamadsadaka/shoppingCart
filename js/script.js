let allProducts = document.querySelector(".prodect");

let products = [
    {
        id: 1,
        title: "Solitaire Diamond Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "200$",
        imageUrl: "Images/zen-pirla.webp"
    },
    {
        id: 2,
        title: "Solitaire Diamond Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "300$",
        imageUrl: "Images/1.webp"
    },
    {
        id: 3,
        title: "Blue Diamond Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "250$",
        imageUrl: "Images/55.webp"
    },
    {
        id: 4,
        title: "Crown Diamond Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "500$",
        imageUrl: "Images/1666590840-1.webp"
    },
    {
        id: 5,
        title: "Diamond Halo Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "400$",
        imageUrl: "Images/RG097345-108-1666700928-1.webp"
    },
    {
        id: 6,
        title: "Designer Diamond Ring",
        description: "An elegant ring with intertwined central diamond, and ZEN engraved inside, symbolizing eternal love and balance",
        price: "350$",
        imageUrl: "Images/zen-pirlant1.webp"
    }
];

function drawItems() {
    let htmlContent = products.map(item => `
        <div class="prodects">
            <div class="prodect_item">
                <img class="prodect-item_img" src="${item.imageUrl}" alt="">
                <div class="prodect_item_desc">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <p>Price: ${item.price}</p>
                </div>
                <div class="prodect_item_action">
                    <button class="add_to_cart" data-id="${item.id}">Add To Cart</button>
                    
                </div>
            </div>
        </div>
    `).join('');
  
    allProducts.innerHTML = htmlContent;

    // Add event listeners for Add to Cart buttons
    document.querySelectorAll(".add_to_cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}
let badge =document.querySelector(".badge");


 
document.addEventListener("DOMContentLoaded", function() {
    let cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = ''; 
});
function addToCart(event) {
    let productId = event.target.getAttribute("data-id");
    let product = products.find(p => p.id == productId);
    
    if (product) {
        let cartContent = document.querySelector(".cart-content");
        let existingItem = cartContent.querySelector(`.cart-box[data-id="${productId}"]`);

        if (existingItem) {
            
            let quantityInput = existingItem.querySelector(".cart-quantity");
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
            
            let cartItem = `
                <div class="cart-box" data-id="${product.id}">
                    <img src="${product.imageUrl}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${product.title}</div>
                        <div class="cart-price">${product.price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class="fas fa-trash-alt cart-remove"></i>
                </div>
            `;
            cartContent.insertAdjacentHTML('beforeend', cartItem);
        }

        updateTotal(); 
        updateBadge();
        ready(); 
    }
   

}

function updateBadge() {
    let cartItemsCount = 0;
    let quantityInputs = document.querySelectorAll(".cart-content .cart-quantity");
    quantityInputs.forEach(input => {
        cartItemsCount += parseInt(input.value);
    });

    if (cartItemsCount > 0) {
        badge.innerText = cartItemsCount;
        badge.style.display = "block";
    } else {
        badge.style.display = "none";
    }
}

//buy button work
let buyButton = document.querySelector(".btn-buy");
buyButton.addEventListener("click", buyButtonClicked);

function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function ready() {
    // Remove Item from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let button of removeCartButtons) {
        button.addEventListener("click", removeCartItem);
    }
    // Quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }
}

function removeCartItem(event) {
    event.target.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    let cartContent = document.querySelector(".cart-content");
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let cartBox of cartBoxes) {
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        
        total += (price * quantity);
    }
    
    document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    drawItems();
    ready();
});

let cartIcon = document.querySelector("#cartIcon");
let cart = document.querySelector(".carts_prodects");
let closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

let searchbt = document.querySelector("#search");
searchbt.addEventListener("keyup", () => {
    let searchValue = searchbt.value.trim().toUpperCase();
    let productItems = document.querySelectorAll(".prodect_item");

    productItems.forEach(item => {
        let title = item.querySelector("h2").innerText.trim().toUpperCase();
        if (!title.startsWith(searchValue)) {
            item.parentElement.style.display = "none";
        } else {
            item.parentElement.style.display = "block";
        }
    });
});

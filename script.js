
"use strict";

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Casual Sneakers",
        category: "Fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "Home",
        price: 899,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "Accessories",
        price: 699,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 7,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 8,
        name: "Coffee Table",
        category: "Home",
        price: 4999,
        image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500"
    }
];

// Cart stores products and their quantities
const cart = [];

let selectedCategory = "All";

// HTML elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCountElement = document.getElementById("cartCount");
const cartTotalElement = document.getElementById("cartTotal");

// Format price in Indian Rupees
function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// Display products based on search and category
function displayProducts() {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    productGrid.innerHTML = "";

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.alt = product.name + " image unavailable";
            this.style.display = "none";
        };

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "Add to Cart";

        button.addEventListener("click", () => {
            addToCart(product.id);

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 800);
        });

        card.append(image, category, name, price, button);
        productGrid.appendChild(card);
    });

    resultCount.textContent =
        `${filteredProducts.length} products found`;

    emptyMessage.hidden = filteredProducts.length !== 0;
}

// Add a product or increase its quantity
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Remove one product completely from the cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Update cart items, item count and total
function updateCart() {
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCountElement.textContent = totalQuantity;
    cartTotalElement.textContent = formatPrice(totalPrice);

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.className = "cart-empty";
        message.textContent = "Your cart is empty.";

        cartItems.appendChild(message);
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent =
            `${formatPrice(item.price)} × ${item.quantity}`;

        const subtotal = document.createElement("p");
        subtotal.textContent =
            `Subtotal: ${formatPrice(item.price * item.quantity)}`;

        details.append(name, quantity, subtotal);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.textContent = "Remove";
        removeButton.setAttribute(
            "aria-label",
            `Remove ${item.name} from cart`
        );

        removeButton.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        row.append(details, removeButton);
        cartItems.appendChild(row);
    });
}

// Open and close the cart panel
function openCart() {
    cartPanel.hidden = false;
    cartButton.setAttribute("aria-expanded", "true");

    cartPanel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function closeCart() {
    cartPanel.hidden = true;
    cartButton.setAttribute("aria-expanded", "false");
}

cartButton.addEventListener("click", () => {
    if (cartPanel.hidden) {
        openCart();
    } else {
        closeCart();
    }
});

document.getElementById("closeCart").addEventListener(
    "click",
    closeCart
);

// Clear all cart items
document.getElementById("clearCart").addEventListener("click", () => {
    cart.length = 0;
    updateCart();
});

// Category filters
document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(categoryButton => {
            categoryButton.classList.remove("active");
        });

        button.classList.add("active");
        displayProducts();
    });
});

// Search as the user types
searchInput.addEventListener("input", displayProducts);

// Search button
document.getElementById("searchButton").addEventListener(
    "click",
    displayProducts
);

// Initialize the website
displayProducts();
updateCart();

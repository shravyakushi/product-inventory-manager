"use strict";
let products = [];
// Show Add Product Form
function showAddForm() {
    const form = document.getElementById("addProductCard");
    form.style.display = "block";
}
// Hide Add Product Form
function hideAddForm() {
    const form = document.getElementById("addProductCard");
    form.style.display = "none";
}
// Add Product
function addProduct() {
    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("productCategory");
    const priceInput = document.getElementById("productPrice");
    const quantityInput = document.getElementById("productQuantity");
    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    // Validation
    if (name === "" ||
        category === "" ||
        price <= 0 ||
        quantity < 0) {
        alert("Please enter valid product details.");
        return;
    }
    // Create product
    const product = {
        id: products.length + 1,
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };
    // Add product
    products.push(product);
    // Clear inputs
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    hideAddForm();
    displayProducts();
}
// Get stock status
function getStockStatus(quantity) {
    if (quantity === 0) {
        return "Out of Stock";
    }
    else if (quantity <= 5) {
        return "Low Stock";
    }
    else {
        return "In Stock";
    }
}
// Get CSS class for stock status
function getStatusClass(quantity) {
    if (quantity === 0) {
        return "out-stock";
    }
    else if (quantity <= 5) {
        return "low-stock";
    }
    else {
        return "in-stock";
    }
}
// Display products
function displayProducts() {
    const table = document.getElementById("productTable");
    const searchInput = document.getElementById("search");
    const searchText = searchInput.value.toLowerCase();
    table.innerHTML = "";
    let totalStock = 0;
    let totalValue = 0;
    products
        .filter(product => product.name.toLowerCase().includes(searchText))
        .forEach(product => {
        const row = document.createElement("tr");
        const productTotal = product.price * product.quantity;
        totalStock += product.quantity;
        totalValue += productTotal;
        const status = getStockStatus(product.quantity);
        const statusClass = getStatusClass(product.quantity);
        row.innerHTML = `

                <td>
                    #${product.id}
                </td>

                <td>
                    <strong>${product.name}</strong>
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ₹${product.price.toFixed(2)}
                </td>

                <td>
                    ${product.quantity}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${status}
                    </span>
                </td>

                <td>
                    ₹${productTotal.toFixed(2)}
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                </td>
            `;
        table.appendChild(row);
    });
    updateStatistics(totalStock, totalValue);
}
// Delete product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    displayProducts();
}
// Update statistics
function updateStatistics(totalStock, totalValue) {
    const totalProducts = document.getElementById("totalProducts");
    const totalStockElement = document.getElementById("totalStock");
    const totalValueElement = document.getElementById("totalValue");
    totalProducts.textContent =
        products.length.toString();
    totalStockElement.textContent =
        totalStock.toString();
    totalValueElement.textContent =
        totalValue.toFixed(2);
}
// Display products when page loads
displayProducts();

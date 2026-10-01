interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

let products: Product[] = [];


// Show Add Product Form
function showAddForm(): void {

    const form = document.getElementById("addProductCard") as HTMLElement;

    form.style.display = "block";
}


// Hide Add Product Form
function hideAddForm(): void {

    const form = document.getElementById("addProductCard") as HTMLElement;

    form.style.display = "none";
}


// Add Product
function addProduct(): void {

    const nameInput = document.getElementById("productName") as HTMLInputElement;

    const categoryInput = document.getElementById("productCategory") as HTMLSelectElement;

    const priceInput = document.getElementById("productPrice") as HTMLInputElement;

    const quantityInput = document.getElementById("productQuantity") as HTMLInputElement;


    const name: string = nameInput.value.trim();

    const category: string = categoryInput.value;

    const price: number = Number(priceInput.value);

    const quantity: number = Number(quantityInput.value);


    // Validation
    if (
        name === "" ||
        category === "" ||
        price <= 0 ||
        quantity < 0
    ) {

        alert("Please enter valid product details.");

        return;
    }


    // Create product
    const product: Product = {

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
function getStockStatus(quantity: number): string {

    if (quantity === 0) {

        return "Out of Stock";

    } else if (quantity <= 5) {

        return "Low Stock";

    } else {

        return "In Stock";
    }
}


// Get CSS class for stock status
function getStatusClass(quantity: number): string {

    if (quantity === 0) {

        return "out-stock";

    } else if (quantity <= 5) {

        return "low-stock";

    } else {

        return "in-stock";
    }
}


// Display products
function displayProducts(): void {

    const table = document.getElementById("productTable") as HTMLTableSectionElement;

    const searchInput = document.getElementById("search") as HTMLInputElement;


    const searchText: string = searchInput.value.toLowerCase();


    table.innerHTML = "";


    let totalStock: number = 0;

    let totalValue: number = 0;


    products
        .filter(product =>
            product.name.toLowerCase().includes(searchText)
        )
        .forEach(product => {

            const row = document.createElement("tr");


            const productTotal: number =
                product.price * product.quantity;


            totalStock += product.quantity;

            totalValue += productTotal;


            const status: string =
                getStockStatus(product.quantity);


            const statusClass: string =
                getStatusClass(product.quantity);


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
function deleteProduct(id: number): void {

    products = products.filter(
        product => product.id !== id
    );

    displayProducts();
}


// Update statistics
function updateStatistics(
    totalStock: number,
    totalValue: number
): void {

    const totalProducts = document.getElementById("totalProducts") as HTMLSpanElement;

    const totalStockElement = document.getElementById("totalStock") as HTMLSpanElement;

    const totalValueElement = document.getElementById("totalValue") as HTMLSpanElement;


    totalProducts.textContent =
        products.length.toString();


    totalStockElement.textContent =
        totalStock.toString();


    totalValueElement.textContent =
        totalValue.toFixed(2);
}


// Display products when page loads
displayProducts();
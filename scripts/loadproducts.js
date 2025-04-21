let shoppingCart = [];
const MAX_STOCK = 10;

function formatPrice(price) {
    return 'LKR ' + parseFloat(price).toLocaleString('en-US' , {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
document.addEventListener("DOMContentLoaded", () => {
    fetch("scripts/products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load the products");
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("products-container");

            //section for each category
            data.categories.forEach(category => {
                if (!category.products || category.products.length ===0)
                return;

                const section = document.createElement("section");
                section.className = "category-section";

                const title = document.createElement("h2");
                title.textContent = category.category;
                section.appendChild(title);


                const grid = document.createElement("div");
                grid.className = "product-grid";

                category.products.forEach(product => {
                    //No price products (the more ram coming soon part)
                    if (product.price === "0 LKR") return;

                    const card = document.createElement("div");
                    card.className= "product-card";

                    card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.specs}</p>
                    ${product.buttonText ? `<button class="add-to-cart">${product.buttonText}</button>` : ""}
                `;

                grid.appendChild(card);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });

        })
        .catch(error => {
            console.error("failed to load products:", error);
        });
});
    





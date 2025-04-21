document.addEventListener("DOMContentLoaded", () => {
    fetch("scripts/products.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");

            data.categories.forEach(category => {
                const section = document.createElement("section");
                section.classList.add("category-section");

                const title = document.createElement("h2");
                title.textContent = category.category;
                section.appendChild(title);

                const grid = document.createElement("div");
                grid.classList.add("product-grid");

                category.products.forEach(product => {
                    const card = document.createElement("div");
                    card.classList.add("product-card");

                    card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.specs}</p>
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
    





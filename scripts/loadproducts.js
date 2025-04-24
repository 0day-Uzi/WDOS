var cart = window.cart || {};

//Load the products from the json file
fetch("scripts/products.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("products-container");

        //process each product category
        data.categories.forEach(category => {
            const section = document.createElement("section");
            section.className = "category-section";
            section.innerHTML = `<h2>${category.category}</h2><div class="product-grid"></div>`;

            const grid = section.querySelector('.product-grid');

            category.products.forEach(product => {
                const card = document.createElement("div");
                card.className= "product-card";

                if (product.price === "0 LKR") {
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="coming-soon">
                            <h3>${product.name}</h3>
                            <p>${product.specs}</p>
                            <div class="coming-soon-badge">Coming Soon</div>
                        </div>

                    `;
                    card.classList.add('coming-soon-card');

                } else {
                    const rawPrice = product.price.replace(/\s+/g, '').replace('LKR', '');
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.specs}</p>
                        <p class="price" data-raw-price="${rawPrice}">${product.price}</p>
                        <button class="add-btn">Add to Cart</button>
                    `;     
                } 

                grid.appendChild(card);  
            });
            container.appendChild(section);
        });
        setupAddButtons();  
    })
    .catch(error => {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
          '<p class="error">Could not load products. Please try again.</p>';
    });  


//add to cart step
function setupAddButtons() {
    document.querySelectorAll('.add-btn').forEach(button => {
      button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const priceElement = card.querySelector('.price');
            const price = parseFloat(priceElement.dataset.rawPrice);

            // Initialize cart if needed
            if (!cart[name]) {
                cart[name] = { qty: 0, price: price };
            }

            //max 10 items
            if (cart[name].qty >=10) {
                alert(`maximum 10 items  is allowed!`);
                return;
            }

            cart[name].qty +=1;
            updateCart();

            //Added to cart visuals
            this.textContent = 'Added';
            setTimeout(() => {
                this.textContent = 'Add To Cart';
            }, 1000 );
        });
    });
}

//if cart is empty
if (typeof updateCart === 'undefined') {
    console.warn('updateCart function not found - make sure cart.js is loaded');
  }






    





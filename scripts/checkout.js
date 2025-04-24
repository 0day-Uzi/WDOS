document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const cartBody = document.getElementById("cart-items");
    let total = 0;

    Object.entries(cart).forEach(([name, item]) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        cartBody.innerHTML += `<tr>
            <td>${name}</td>
            <td>${item.qty}</td>
            <td>LKR ${itemTotal.toLocaleString()}</td>
        </tr>`;
    });
    document.getElementById("cart-total").textContent = `LKR ${total.toLocaleString()}`;

    // 2. Payment section closing for credit card when cod selected
    const creditCardSection = document.getElementById("credit-card-info");
    const cardFields = creditCardSection.querySelectorAll("[required]");
    
    document.querySelectorAll("input[name='payment']").forEach(radio => {
        radio.addEventListener("change", () => {
            const showCardFields = radio.value === "credit-card";
            creditCardSection.style.display = showCardFields ? "block" : "none";
            
            // closing based on payment method
            cardFields.forEach(field => {
                field.required = showCardFields;
            });
        });
    });

    // 3. Form submission handling
    document.getElementById("payment-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Always prevent default
        
        // check validity
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // If valid, show confirmation
        document.querySelector(".checkout-box").style.display = "none";
        document.querySelector(".order-summary").style.display = "none";
        document.getElementById("confirmation-message").style.display = "block";
        localStorage.removeItem("cart");
    });

});
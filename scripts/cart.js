var cart = {};

// Initialize cart from localStorage
function initCart() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) cart = JSON.parse(savedCart);
    updateCart();
  } catch (e) {
    console.error('Cart load error:', e);
  }
}
//Update cart display
function updateCart() {
  const cartBody = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  
  cartBody.innerHTML = '';
  let total = 0;
  
  for (const [itemName, itemData] of Object.entries(cart)) {
    const row = document.createElement('tr');
    const price = itemData.price;
    const qty = itemData.qty;
    const itemTotal = price * qty;
    total += itemTotal;
    
    row.innerHTML = `
      <td>${itemName}</td>
      <td>
        <button class="quantity-btn" onclick="changeQty('${itemName}', -1)">-</button>
        ${qty}
        <button class="quantity-btn" onclick="changeQty('${itemName}', 1)">+</button>
      </td>
      <td>LKR ${price.toLocaleString()}</td>
      <td>LKR ${itemTotal.toLocaleString()}</td>
      <td><button class="delete-btn" onclick="removeItem('${itemName}')">Remove</button></td>
    `;
    cartBody.appendChild(row);
  }
  
  totalEl.textContent = `LKR ${total.toLocaleString()}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

//adjust quantities
function changeQty(name,change) {
    const newQty = cart[name].qty + change;

    if (newQty <1) {
        removeItem(name);
        return;
    }
    if (newQty > 10) {
        alert('Maximum 10 items per product');
        return;
    }

    cart[name].qty = newQty;
    updateCart();
}

// Remove item completely
function removeItem(name) {
    delete cart[name];
    updateCart();
}
  
// Save current cart as favorites
function saveFavorites() {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty! Add items before saving.');
    return;
  }
    
  localStorage.setItem('favorites', JSON.stringify(cart));
  alert('Current cart saved as favorites!');
}
  

//load favorite order
function loadFavorites() {
    const saved = localStorage.getItem('favorites');

    if(!saved) {
        alert('No favorites added');
        return;
    }

    try {
      cart = JSON.parse(saved);
      updateCart();
      alert('Favorite Order Applied');
    } catch (e) {
      console.error('error loading favorites', e);
      alert('Error loading favorites. Please try again');
    }
}

//checkout section
function checkout () {
    if (Object.keys(cart).length ===0) {
        alert('your cart is empty nothing to pay')
        return;
    }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'Checkout.html';
}
// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  initCart();
    
  const saveFavoritesBtn = document.getElementById('savefavorites');
  const loadFavoritesBtn = document.getElementById('loadfavorites');
  const checkoutBtn = document.getElementById('checkout');

  if (saveFavoritesBtn) saveFavoritesBtn.addEventListener('click', saveFavorites);
  if (loadFavoritesBtn) loadFavoritesBtn.addEventListener('click', loadFavorites);
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});

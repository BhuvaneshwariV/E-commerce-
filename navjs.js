const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// Navigation functionality
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Store cart items in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
    });
}

// Add to cart function
function addToCart(e) {
    const productCard = e.target.closest('.pro');
    if (!productCard) return;
    
    // Get product details
    const product = {
        id: Date.now(),
        image: productCard.querySelector('img').src,
        title: productCard.querySelector('.des h5').textContent,
        price: parseFloat(productCard.querySelector('.des h4').textContent.replace('$', '')),
        quantity: 1
    };

    // Add as new item instead of updating quantity
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (document.getElementById('bhuv')) {
        updateCartDisplay();
    }
    
}

// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('bhuv');
    if (!cartContainer) return;
    
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="6" class="text-center">Your cart is empty</td></tr>';
        updateCartTotal();
        return;
    }
    
    cart.forEach((item, index) => {
        const cartItem = `
            <tr>
                <td><i class="far fa-times-circle" onclick="removeFromCart(${index})"></i></td>
                <td><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" 
                           value="${item.quantity}" 
                           min="1" 
                           onchange="updateQuantity(${index}, this.value)"
                           class="cart-quantity">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
        cartContainer.innerHTML += cartItem;
    });

    updateCartTotal();
}

// Remove item from cart
function removeFromCart(index) {
    alert('Are you sure to remove this product!')
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    newQuantity = Math.max(1, parseInt(newQuantity) || 1);
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const subtotalElement = document.querySelector('#subtotal table tr:first-child td:last-child');
    const totalElement = document.querySelector('#subtotal table tr:last-child td:last-child strong');
    
    if (subtotalElement) subtotalElement.textContent = `$ ${total.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$ ${total.toFixed(2)}`;
}

// Initialize cart functionality
function initializeCart() {
    // Add click handlers to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Display cart items if on cart page
    if (document.getElementById('bhuv')) {
        updateCartDisplay();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart);















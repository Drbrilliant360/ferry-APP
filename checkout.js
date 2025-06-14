// Checkout functionality
class Checkout {
  constructor() {
    this.cart = new Cart();
    this.orderSummary = document.getElementById('checkout-order-summary');
    this.totalPrice = document.getElementById('checkout-total-price');
    this.placeOrderBtn = document.getElementById('place-order-btn');
    
    this.initializeCheckout();
  }

  initializeCheckout() {
    // Display cart items and total
    this.displayOrderSummary();
    
    // Add event listener for place order button
    this.placeOrderBtn.addEventListener('click', () => this.handlePlaceOrder());
  }

  displayOrderSummary() {
    if (!this.orderSummary) return;

    // Clear existing content
    this.orderSummary.innerHTML = '';

    if (this.cart.items.length === 0) {
      this.orderSummary.innerHTML = `
        <div class="text-center py-4">
          <p class="text-gray-500">Your cart is empty</p>
          <a href="catalog.html" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">Continue Shopping</a>
        </div>
      `;
      this.placeOrderBtn.disabled = true;
      this.placeOrderBtn.classList.add('opacity-50', 'cursor-not-allowed');
      return;
    }

    // Display each item
    this.cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'flex justify-between items-center py-2 border-b';
      itemElement.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded" onerror="this.src='images/placeholder.jpg'">
          <div>
            <h4 class="font-medium">${item.name}</h4>
            <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
          </div>
        </div>
        <p class="font-medium">TZS ${(item.price * item.quantity).toLocaleString()}</p>
      `;
      this.orderSummary.appendChild(itemElement);
    });

    // Update total price
    this.updateTotal();
  }

  updateTotal() {
    if (this.totalPrice) {
      this.totalPrice.textContent = `TZS ${this.cart.getTotal().toLocaleString()}`;
    }
  }

  validateForm() {
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const streetAddress = document.getElementById('street-address').value;
    const area = document.getElementById('area-kigamboni').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

    if (!fullName || !phoneNumber || !streetAddress || !area || !deliveryTime || !paymentMethod) {
      this.showMessage('Please fill in all required fields', 'error');
      return false;
    }

    // Validate phone number (Tanzania format)
    const phoneRegex = /^(?:\+255|0)[67]\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      this.showMessage('Please enter a valid Tanzania phone number', 'error');
      return false;
    }

    return true;
  }

  showMessage(message, type = 'success') {
    const messageElement = document.createElement('div');
    messageElement.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-y-0 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.style.transform = 'translateY(-100%)';
      setTimeout(() => messageElement.remove(), 300);
    }, 3000);
  }

  async handlePlaceOrder() {
    if (!this.validateForm()) return;

    try {
      // Get form values
      const orderDetails = {
        fullName: document.getElementById('full-name').value,
        phoneNumber: document.getElementById('phone-number').value,
        streetAddress: document.getElementById('street-address').value,
        area: document.getElementById('area-kigamboni').value,
        deliveryTime: document.getElementById('delivery-time').value,
        paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
        items: this.cart.items,
        total: this.cart.getTotal(),
        orderDate: new Date().toISOString(),
        orderId: 'ORD' + Date.now().toString().slice(-6)
      };

      // Save order details
      localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
      
      // Clear cart
      this.cart.items = [];
      this.cart.saveCart();
      this.cart.updateCartCount();

      // Show success message
      this.showMessage('Order placed successfully! Redirecting to payment...');

      // Redirect to payment page after a short delay
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 2000);

    } catch (error) {
      console.error('Error placing order:', error);
      this.showMessage('Error placing order. Please try again.', 'error');
    }
  }
}

// Initialize checkout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const checkout = new Checkout();
}); 
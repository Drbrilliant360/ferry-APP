// Cart functionality
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    this.updateCartCount();
  }

  addItem(product) {
    if (!product || !product.id || !product.name || !product.price) {
      console.error('Invalid product data:', product);
      return;
    }

    const existingItem = this.items.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.items.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: product.quantity || 1,
        image: product.image
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  }

  removeItem(productId) {
    const item = this.items.items.find(item => item.id === productId);
    if (!item) return;

    if (confirm(`Are you sure you want to remove ${item.name} from your cart?`)) {
      this.items.items = this.items.items.filter(item => item.id !== productId);
      this.saveCart();
      this.updateCartCount();
      this.renderCart();
    }
  }

  updateQuantity(productId, quantity) {
    const item = this.items.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
      }
    }
  }

  getTotal() {
    return this.items.items.reduce((total, item) => {
      const itemTotal = Number(item.price) * Number(item.quantity);
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  }

  saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  updateCartCount() {
    const count = this.items.items.reduce((total, item) => {
      const quantity = Number(item.quantity);
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    
    if (!this.items.items || this.items.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500">Your cart is empty</p>
          <a href="catalog.html" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">Continue Shopping</a>
        </div>
      `;
      return;
    }

    this.items.items.forEach(item => {
      if (!item || !item.name || !item.price) {
        console.error('Invalid item data:', item);
        return;
      }

      const itemElement = document.createElement('div');
      itemElement.className = 'flex justify-between items-center p-4 border-b hover:bg-gray-50 transition-colors duration-200';
      itemElement.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" class="w-16 h-16 object-cover rounded" onerror="this.src='images/placeholder.jpg'">
          <div>
            <h3 class="font-medium">${item.name}</h3>
            <p class="text-gray-600">TZS ${Number(item.price).toLocaleString()}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span class="quantity">${Number(item.quantity)}</span>
            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <div class="text-right">
            <p class="font-medium">TZS ${(Number(item.price) * Number(item.quantity)).toLocaleString()}</p>
            <button class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200" data-action="remove" data-id="${item.id}">
              Remove
            </button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    // Add event listeners for quantity buttons
    cartItemsContainer.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const productId = e.target.dataset.id;
        const item = this.items.items.find(item => item.id === productId);
        
        if (item) {
          if (action === 'increase') {
            this.updateQuantity(productId, Number(item.quantity) + 1);
          } else if (action === 'decrease') {
            this.updateQuantity(productId, Number(item.quantity) - 1);
          }
        }
      });
    });

    // Add event listeners for remove buttons
    cartItemsContainer.querySelectorAll('[data-action="remove"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      });
    });

    // Update total price
    this.updateTotal();
  }

  updateTotal() {
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
      const total = this.getTotal();
      totalElement.textContent = `TZS ${total.toLocaleString()}`;
    }
  }
}

// Initialize cart
const cart = new Cart();

// Export cart instance for use in other files
window.cart = cart; 
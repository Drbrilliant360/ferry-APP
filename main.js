// Ferry Sokoni Main JS

const cart = [
  { id: 1, name: 'Red Snapper', weight: '1kg', price: 25000, qty: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' },
  { id: 2, name: 'Tiger Prawns', weight: '500g', price: 18000, qty: 2, image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=80&q=80' },
];

const mockProducts = [
  { id: 1, name: 'Red Snapper', category: 'Fish' },
  { id: 2, name: 'Tiger Prawns', category: 'Crustaceans' },
  { id: 3, name: 'Mud Crab', category: 'Crustaceans' },
  { id: 4, name: 'Kingfish', category: 'Fish' },
  { id: 5, name: 'Octopus', category: 'Shellfish' },
  { id: 6, name: 'Dried Sardines', category: 'Dried Fish' },
  { id: 7, name: 'Tilapia', category: 'Fish' },
  { id: 8, name: 'Lobster', category: 'Crustaceans' },
];

const seasonalBanner = {
  active: true,
  message: 'welcome get the best fishes in tanzania',
};

const productReviews = [
  {
    id: 1, userName: 'Aisha M.', date: '2 weeks ago', rating: 4, reviewText: 'The snapper was fresh and delicious! Will order again.',
    photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80' // Example photo
  },
  { id: 2, userName: 'Juma K.', date: '1 month ago', rating: 3, reviewText: 'Good quality, but a few scales left. Still tasty and well-packaged.' },
];

const userProfile = {
  name: 'Aisha M.',
  email: 'aisha@ferrysokoni.com',
  avatarInitial: 'A',
};

const orderHistory = [
  { id: 'ORD12345', date: '2024-05-12', total: 40000, status: 'Delivered', items: ['Red Snapper (1kg)', 'Shrimp (500g)'] },
  { id: 'ORD12344', date: '2024-05-10', total: 18000, status: 'Pending', items: ['Tiger Prawns (500g)'] },
];

const savedAddresses = [
  { id: 1, address: '123 Kivukoni Rd, Kigamboni, Dar es Salaam' },
  { id: 2, address: 'P.O. Box 456, Vijibweni, Kigamboni' },
];

const DELIVERY_FEE = 3000; // Example fixed delivery fee

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return; // Only run if on cart page

  cartItemsContainer.innerHTML = ''; // Clear existing items

  cart.forEach(item => {
    const cartItemEl = document.createElement('div');
    cartItemEl.classList.add('flex', 'items-center', 'bg-white', 'rounded', 'shadow', 'p-2', 'cart-item');
    cartItemEl.setAttribute('data-id', item.id);
    cartItemEl.innerHTML = `
      <img src="${item.image}" class="w-16 h-16 object-cover rounded" alt="${item.name}"/>
      <div class="ml-3 flex-1">
        <h4 class="font-bold text-sm">${item.name}</h4>
        <p class="text-xs text-gray-500">${item.weight}</p>
        <div class="flex items-center mt-1 cart-qty">
          <button class="px-2 py-1 bg-gray-200 rounded cart-minus">-</button>
          <span class="mx-2 cart-qty-value">${item.qty}</span>
          <button class="px-2 py-1 bg-gray-200 rounded cart-plus">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="text-blue-600 font-semibold">TZS ${(item.price * item.qty).toLocaleString()}</p>
        <button class="text-xs text-red-500 mt-2 remove-item">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  updateCartTotals();
}

function updateCartTotals() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
  });

  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0; // Only charge delivery if there are items
  const total = subtotal + deliveryFee;

  document.getElementById('cart-subtotal').textContent = `TZS ${subtotal.toLocaleString()}`;
  document.getElementById('cart-delivery').textContent = `TZS ${deliveryFee.toLocaleString()}`;
  document.getElementById('cart-total').textContent = `TZS ${total.toLocaleString()}`;
}

function renderCheckoutSummary() {
  const orderSummaryContainer = document.getElementById('checkout-order-summary');
  if (!orderSummaryContainer) return; // Only run if on checkout page

  orderSummaryContainer.innerHTML = ''; // Clear existing items
  let subtotal = 0;

  cart.forEach(item => {
    const summaryItemEl = document.createElement('div');
    summaryItemEl.classList.add('flex', 'justify-between', 'text-sm');
    summaryItemEl.innerHTML = `
      <span>${item.name} (${item.weight}) x ${item.qty}</span>
      <span>TZS ${(item.price * item.qty).toLocaleString()}</span>
    `;
    orderSummaryContainer.appendChild(summaryItemEl);
    subtotal += item.price * item.qty;
  });

  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  document.getElementById('checkout-subtotal').textContent = `TZS ${subtotal.toLocaleString()}`;
  document.getElementById('checkout-delivery').textContent = `TZS ${deliveryFee.toLocaleString()}`;
  document.getElementById('checkout-total').textContent = `TZS ${total.toLocaleString()}`;
}

function renderUserProfile() {
  const userNameEl = document.getElementById('user-name');
  const userEmailEl = document.getElementById('user-email');
  const userAvatarEl = document.getElementById('user-avatar');

  if (userNameEl) userNameEl.textContent = userProfile.name;
  if (userEmailEl) userEmailEl.textContent = userProfile.email;
  if (userAvatarEl) userAvatarEl.textContent = userProfile.avatarInitial;
}

function renderOrderHistory() {
  const orderHistoryContainer = document.getElementById('order-history-container');
  if (!orderHistoryContainer) return;

  orderHistoryContainer.innerHTML = '';

  orderHistory.forEach(order => {
    const orderEl = document.createElement('div');
    orderEl.classList.add('bg-white', 'rounded', 'shadow', 'p-2', 'mb-2');
    orderEl.innerHTML = `
      <div class="flex justify-between">
        <span>Order #${order.id}</span>
        <span class="${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}">${order.status}</span>
      </div>
      <div class="text-xs text-gray-500">${order.items.length} items • ${new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      <div class="text-sm font-semibold">TZS ${order.total.toLocaleString()}</div>
      <button class="text-xs text-blue-500 mt-1 review-order-btn" data-order-id="${order.id}">Review Order</button>
    `;
    orderHistoryContainer.appendChild(orderEl);
  });

  // Add event listeners for review buttons
  document.querySelectorAll('.review-order-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const orderId = e.target.getAttribute('data-order-id');
      alert(`Reviewing order: ${orderId}`);
      // In a real app, you would navigate to a review page or open a modal
    });
  });
}

function renderSavedAddresses() {
  const savedAddressesContainer = document.getElementById('saved-addresses-container');
  if (!savedAddressesContainer) return;

  savedAddressesContainer.innerHTML = '';

  savedAddresses.forEach(address => {
    const addressEl = document.createElement('div');
    addressEl.classList.add('bg-white', 'rounded', 'shadow', 'p-2', 'mb-2');
    addressEl.innerHTML = `
      <div>${address.address}</div>
      <button class="text-xs text-blue-500 mt-1 edit-address-btn" data-address-id="${address.id}">Edit</button>
    `;
    savedAddressesContainer.appendChild(addressEl);
  });

  // Add event listeners for edit address buttons
  document.querySelectorAll('.edit-address-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const addressId = e.target.getAttribute('data-address-id');
      alert(`Editing address: ${addressId}`);
      // In a real app, you would open an address edit form
    });
  });
}

function renderProductReviews() {
  const reviewsContainer = document.getElementById('customer-reviews-container');
  if (!reviewsContainer) return; // Only run if on product page

  reviewsContainer.innerHTML = ''; // Clear existing reviews

  productReviews.forEach(review => {
    const reviewEl = document.createElement('div');
    reviewEl.classList.add('bg-white', 'rounded', 'shadow', 'p-2', 'mb-2');
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<svg class="w-4 h-4 ${i <= review.rating ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>`;
    }
    reviewEl.innerHTML = `
      <div class="flex items-center mb-1">
        <span class="flex">${starsHtml}</span>
        <span class="ml-2 text-xs text-gray-500">${review.userName} • ${review.date}</span>
      </div>
      <div class="text-sm">${review.reviewText}</div>
      ${review.photo ? `<img src="${review.photo}" class="w-24 h-24 object-cover rounded mt-2" alt="Review photo"/>` : ''}
    `;
    reviewsContainer.appendChild(reviewEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Update cart count on all pages
  const cartCount = localStorage.getItem('cartCount') || 0;
  const cartCountEls = document.querySelectorAll('#cart-count');
  cartCountEls.forEach(el => el.textContent = cartCount);

  // Render cart items if on cart page
  renderCart();

  // Render checkout summary if on checkout page
  renderCheckoutSummary();

  // Render user account data if on account page
  renderUserProfile();
  renderOrderHistory();
  renderSavedAddresses();

  // Account page button handlers
  document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
    alert('Edit Profile clicked!');
  });

  document.getElementById('add-new-address-btn')?.addEventListener('click', () => {
    alert('Add New Address clicked!');
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    alert('Logout clicked!');
    // In a real app, clear user session and redirect to login/homepage
  });

  // Cart quantity controls (cart.html)
  document.getElementById('cart-items')?.addEventListener('click', (e) => {
    const target = e.target;
    const cartItemEl = target.closest('.cart-item');
    if (!cartItemEl) return;

    const itemId = parseInt(cartItemEl.getAttribute('data-id'));
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    if (target.classList.contains('cart-minus')) {
      if (item.qty > 1) {
        item.qty--;
        renderCart();
      }
    } else if (target.classList.contains('cart-plus')) {
      item.qty++;
      renderCart();
    } else if (target.classList.contains('remove-item')) {
      const itemIndex = cart.findIndex(i => i.id === itemId);
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        renderCart();
      }
    }
  });

  // Simple contact form validation (support.html)
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      const name = contactForm.querySelector('input[type="text"]');
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector('textarea');
      if (!name.value || !email.value || !message.value) {
        e.preventDefault();
        alert('Please fill in all fields.');
      }
    });
  }

  // Checkout form validation (checkout.html)
  const checkoutForm = document.querySelector('button.bg-green-600')?.closest('div').previousElementSibling.querySelector('form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      const fullName = checkoutForm.querySelector('input[placeholder="Full Name"]');
      const phone = checkoutForm.querySelector('input[placeholder="Phone Number"]');
      const street = checkoutForm.querySelector('input[placeholder="Street Address"]');
      const area = checkoutForm.querySelector('input[placeholder="Area (e.g., Kimbiji, Vijibweni)"]');
      const deliveryTime = checkoutForm.querySelector('select');

      if (!fullName.value || !phone.value || !street.value || !area.value || !deliveryTime.value) {
        e.preventDefault();
        alert('Please fill in all delivery details and select a delivery time.');
      }
    });
  }

  // Render product reviews if on product page
  renderProductReviews();

  // Render seasonal banner if on index page
  const seasonalBannerContainer = document.getElementById('seasonal-banner-container');
  if (seasonalBanner.active && seasonalBannerContainer) {
    seasonalBannerContainer.textContent = seasonalBanner.message;
    seasonalBannerContainer.classList.remove('hidden');
  }

  // Search auto-suggest (index.html)
  const searchInput = document.getElementById('search-input');
  const searchSuggestionsContainer = document.getElementById('search-suggestions');

  if (searchInput && searchSuggestionsContainer) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      searchSuggestionsContainer.innerHTML = '';

      if (query.length > 1) {
        const filteredProducts = mockProducts.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
        );

        if (filteredProducts.length > 0) {
          filteredProducts.forEach(product => {
            const suggestionEl = document.createElement('div');
            suggestionEl.classList.add('p-2', 'cursor-pointer', 'hover:bg-gray-100');
            suggestionEl.textContent = product.name;
            suggestionEl.addEventListener('click', () => {
              searchInput.value = product.name;
              searchSuggestionsContainer.classList.add('hidden');
              // In a real app, you would trigger a search or navigate to the product/category page
              alert(`Searching for: ${product.name}`);
            });
            searchSuggestionsContainer.appendChild(suggestionEl);
          });
          searchSuggestionsContainer.classList.remove('hidden');
        } else {
          searchSuggestionsContainer.classList.add('hidden');
        }
      } else {
        searchSuggestionsContainer.classList.add('hidden');
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (searchSuggestionsContainer && !searchSuggestionsContainer.contains(e.target) && e.target !== searchInput) {
        searchSuggestionsContainer.classList.add('hidden');
      }
    });
  }

  // Location-Based Sorting (Conceptual)
  // A real implementation would involve:
  // 1. Getting user's geolocation (requires user permission).
  // 2. Sending location data to a backend to query nearest suppliers.
  // 3. Displaying products sorted by proximity.
  console.log('Location-based sorting would be implemented on the backend or with a geolocation API.');

  // Star rating functionality (product.html)
  const starRatingContainer = document.getElementById('star-rating');
  const ratingValueInput = document.getElementById('rating-value');
  if (starRatingContainer && ratingValueInput) {
    const stars = starRatingContainer.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        ratingValueInput.value = value;
        stars.forEach(s => {
          if (parseInt(s.getAttribute('data-value')) <= value) {
            s.classList.add('text-yellow-400');
            s.classList.remove('text-gray-300');
          } else {
            s.classList.add('text-gray-300');
            s.classList.remove('text-yellow-400');
          }
        });
      });
    });
  }

  // Review form submission (product.html)
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const rating = ratingValueInput?.value || 0;
      const reviewText = document.getElementById('review-text').value;
      const reviewPhoto = document.getElementById('review-photo').files[0];

      if (rating === 0) {
        alert('Please select a star rating.');
        return;
      }
      if (!reviewText.trim()) {
        alert('Please write a review.');
        return;
      }

      // For now, just simulate submission
      let photoUrl = '';
      if (reviewPhoto) {
        photoUrl = URL.createObjectURL(reviewPhoto);
      }

      const newReview = {
        id: productReviews.length + 1,
        userName: userProfile.name, // Assuming logged-in user
        date: 'Just now',
        rating: parseInt(rating),
        reviewText: reviewText.trim(),
        photo: photoUrl
      };

      productReviews.unshift(newReview); // Add new review to the beginning
      renderProductReviews();

      // Reset form
      reviewForm.reset();
      ratingValueInput.value = 0;
      stars.forEach(s => {
        s.classList.add('text-gray-300');
        s.classList.remove('text-yellow-400');
      });
      alert('Review submitted successfully!');

      // In a real application, you would send this data to a backend
    });
  }

  // Enable Add to Cart functionality on catalog and index pages
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === 'Add to Cart') {
      btn.addEventListener('click', function() {
        // Find product info from the card
        const card = btn.closest('.bg-white');
        if (!card) return;
        const name = card.querySelector('h4')?.textContent?.trim();
        const priceText = card.querySelector('p.font-bold')?.textContent?.replace(/[^\d]/g, '');
        const price = priceText ? parseInt(priceText) : 0;
        const image = card.querySelector('img')?.src;
        const weight = card.querySelector('p.text-xs')?.textContent?.trim() || '';
        if (!name || !price) return;
        // Generate a simple id based on name (in real app, use product id)
        const id = name.split(' ').join('-').toLowerCase();
        // Check if already in cart
        let item = cart.find(i => i.id === id);
        if (item) {
          item.qty++;
        } else {
          cart.push({ id, name, price, qty: 1, image, weight });
        }
        // Update cart count in localStorage
        const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
        localStorage.setItem('cartCount', cartCount);
        // Optionally, save cart to localStorage for persistence
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update cart count on page
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = cartCount);
        // Show feedback
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1200);
      });
    }
  });
}); 
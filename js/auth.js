// Utility Functions
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function validatePhone(phone) {
    const phoneRegex = /^7[0-9]{8}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

// Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const location = document.getElementById('location').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validation
            if (!validatePhone(phone)) {
                alert('Please enter a valid phone number (7XXXXXXXX)');
                return;
            }

            if (email && !validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!validatePassword(password)) {
                alert('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                const response = await signup({
                    name,
                    phone,
                    email,
                    location,
                    password
                });

                if (response.success) {
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(response.user));
                    // Redirect to home page
                    window.location.href = 'index.html';
                } else {
                    alert(response.message || 'Signup failed. Please try again.');
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('An error occurred during signup. Please try again.');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            try {
                // Here you would typically make an API call to your backend
                const response = await login({
                    login,
                    password,
                    remember
                });

                if (response.success) {
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(response.user));
                    // Redirect to home page
                    window.location.href = 'index.html';
                } else {
                    alert(response.message || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});

// WhatsApp Login
function loginWithWhatsApp() {
    // Here you would implement WhatsApp OAuth flow
    // For now, we'll just show a message
    alert('WhatsApp login will be implemented soon!');
}

// Mock API calls (replace with actual API calls)
async function signup(userData) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    id: '1',
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                    location: userData.location
                }
            });
        }, 1000);
    });
}

async function login(credentials) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    id: '1',
                    name: 'Test User',
                    phone: credentials.login,
                    email: 'test@example.com',
                    location: 'Kigamboni'
                }
            });
        }, 1000);
    });
}

// Check authentication status
function checkAuth() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
} 
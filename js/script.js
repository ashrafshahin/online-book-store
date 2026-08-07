
// navbar ->

    // Toggle Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Optional function to dynamically update the cart item counter
    function updateCartCount(newCount) {
        const badge = document.getElementById('cart-count');
    badge.textContent = newCount;
    }

// Example trigger: updateCartCount(5);


// navbar <-

// footer 

// Dynamic copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Simple newsletter interactive validation
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const msgSpan = document.getElementById('newsletter-msg');

    if (emailInput.value.trim() !== '') {
        msgSpan.style.color = '#28a745';
        msgSpan.textContent = 'Thank you for subscribing!';
        emailInput.value = '';
    } else {
        msgSpan.style.color = '#dc3545';
        msgSpan.textContent = 'Please enter a valid email address.';
    }
});
// footer ends


// Filter Logic
document.getElementById('book-search').addEventListener('keyup', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.book-card').forEach(card => {
        const title = card.getAttribute('data-title');
        card.style.display = title.includes(searchTerm) ? "flex" : "none";
    });
});


// register page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    // Utility validation functions
    const showError = (inputElement, errorElementId, message) => {
        const group = inputElement.closest('.input-group') || inputElement.parentElement;
        group.classList.add('error');
        group.classList.remove('success');
        document.getElementById(errorElementId).innerText = message;
    };

    const showSuccess = (inputElement, errorElementId) => {
        const group = inputElement.closest('.input-group') || inputElement.parentElement;
        group.classList.remove('error');
        group.classList.add('success');
        document.getElementById(errorElementId).innerText = '';
    };

    const isValidEmail = (emailVal) => {
        // Basic pattern check for name@domain.ext format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailVal);
    };

    // Live Individual Field Validators
    const validateName = () => {
        if (fullName.value.trim() === '') {
            showError(fullName, 'nameError', 'Full name is required.');
            return false;
        } else {
            showSuccess(fullName, 'nameError');
            return true;
        }
    };

    const validateEmail = () => {
        const emailVal = email.value.trim();
        if (emailVal === '') {
            showError(email, 'emailError', 'Email address is required.');
            return false;
        } else if (!isValidEmail(emailVal)) {
            showError(email, 'emailError', 'Please enter a valid email address.');
            return false;
        } else {
            showSuccess(email, 'emailError');
            return true;
        }
    };

    const validatePassword = () => {
        const passVal = password.value;
        if (passVal === '') {
            showError(password, 'passwordError', 'Password is required.');
            return false;
        } else if (passVal.length < 8) {
            showError(password, 'passwordError', 'Password must be at least 8 characters long.');
            return false;
        } else {
            showSuccess(password, 'passwordError');
            return true;
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword.value === '') {
            showError(confirmPassword, 'confirmError', 'Please re-type your password.');
            return false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'confirmError', 'Passwords do not match.');
            return false;
        } else {
            showSuccess(confirmPassword, 'confirmError');
            return true;
        }
    };

    const validateTerms = () => {
        const termsError = document.getElementById('termsError');
        if (!terms.checked) {
            termsError.innerText = 'You must accept the terms and conditions.';
            return false;
        } else {
            termsError.innerText = '';
            return true;
        }
    };

    // Attach real-time input event listeners for seamless UX
    fullName.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);

    // intercept form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent standard page reloads

        // Run all explicit validation methods
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
            // Form payload is clean and ready for backend processing or API dispatch
            alert('Welcome aboard! Your reader account has been created successfully.');
            form.reset();

            // Clear success styling classes post-reset
            document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('success');
            });
        }
    });
});



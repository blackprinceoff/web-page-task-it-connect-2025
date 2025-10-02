// Отримання елементів форми
const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const togglePassword = document.getElementById("togglePassword");
const successMessage = document.getElementById("successMessage");

// Елементи для відображення помилок
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");

// Елементи індикатора сили пароля
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// Показ/приховування пароля
togglePassword.addEventListener('click', function(){
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    password.textContent = type === 'password' ? '👁️' : '🙈';
});

// Валідація імені в реальному часі
fullName.addEventListener('input', function(){
    validateName();
});

// Валідація email в реальному часі
email.addEventListener('input', function(){
    validateEmail();
});

// Перевірка сили пароля в реальному часі
password.addEventListener('input', function(){
    checkPasswordStrength();
    validatePassword();
    if (confirmPassword.value) {
        validateConfirmPassword();
    }
});

// Валідація підтвердження пароля
confirmPassword.addEventListener('input', function(){
    validateConfirmPassword();
});

// Функція валідації імені
function validateName(){
    const nameValue = fullName.value.trim();

    if (nameValue === ''){
        setError(fullName, nameError, 'Ім\'я має містити щонайменше 2 символи');
        return false;
    } else if (!/^[А-ЯІЇЄҐа-яіїєґA-Za-z\s]+$/.test(nameValue)) {
        setError(fullName, nameError, 'Ім\'я може містити тільки літери');
        return false;
    } else {
        setSuccess(fullName, nameError);
        return true;
    }
}

function validateEmail(){
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === ''){
        setError(email, emailError, 'Email є обов\'язковим');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        setError(email, emailError, 'Введіть коректний email');
        return false;
    } else {
        setSuccess(email, emailError);
        return true;
    }
}

// Функція валідації пароля
function validatePassword(){
    const passwordValue = password.value;

    if (passwordValue === ''){
        setError(password, passwordError, 'Пароль є обов\'язковим');
        return false;
    } else if (passwordValue.length < 8) {
        setError(password, passwordError, 'Пароль має містити щонайменше 8 символів');
        return false;
    } else {
        setSuccess(password, passwordError);
        return true;
    }
}

// Функція валідації підтвердження пароля
function validateConfirmPassword(){
    const confirmValue = confirmPassword.value;

    if (confirmValue === ''){
        setError(confirmPassword, confirmError, 'Підтвердіть пароль');
        return false;
    } else if (confirmValue !== password.value) {
        setError(confirmPassword, confirmError, 'Паролі не співпадають');
        return false;
    } else {
        setSuccess(confirmPassword, confirmError);
        return true;
    }
}

// Функція перевірки сили пароля
function checkPasswordStrength(){
    const passwordValue = password.value;
    let strength = 0;

    if (passwordValue.length >= 8) strength++;
    if (passwordValue.length >= 12) strength++;
    if (/[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue)) strength++;
    if (/\d/.test(passwordValue)) strength++;
    if (/[^a-zA-Z\d]/.test(passwordValue)) strength++;

    // Очищення класів
    strengthBar.className = 'strength-bar__fill';
    strengthText.className = 'strength-text';

    if (passwordValue.length === 0){
        strengthText.textContent = '';
        return;
    }
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Слабкий пароль';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Середній пароль';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Сильний пароль';
    }
}

// Функції встановлення помилок та успіху
function setError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
}

function setSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

// Обробка відправки форми
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Валідація всіх полів
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    // Перевірка checkbox
    let isTermsValid = true;
    if (!terms.checked) {
        termsError.textContent = 'Необхідно погодитись з умовами';
        isTermsValid = false;
    } else {
        termsError.textContent = '';
    }

    // Якщо всі поля валідні
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
        // Приховати форму
        form.style.display = 'none';

        // Показати повідомлення про успіх
        successMessage.classList.add('active');

        // Опціонально: скинути форму через 3 секунди
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            successMessage.classList.remove('active');

            // Очистити всі класи
            document.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('success', 'error');
            });
        }, 3000);
    }
});


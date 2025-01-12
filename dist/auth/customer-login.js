var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login } from '../api';
const loginForm = document.getElementById('customer-login-form');
const emailLoginInput = document.getElementById('email');
const passwordLoginInput = document.getElementById('password');
loginForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = emailLoginInput.value;
    const password = passwordLoginInput.value;
    try {
        const result = yield login(email, password);
        if (result.success) {
            localStorage.setItem('authToken', result.token); // Store token in local storage
            alert('Login successful!');
            window.location.href = 'customer-menu.html'; // Redirect to the customer menu page
        }
        else {
            alert(`Error: ${result.message}`);
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        alert('There was an error with the login process.');
    }
}));

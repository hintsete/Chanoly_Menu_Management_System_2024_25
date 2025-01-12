var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signup } from '../api';
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
// We no longer need the messageDiv as we're using alerts directly.
signupForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    try {
        const result = yield signup(username, email, password);
        if (result.success) {
            alert('Signup successful!');
            // Store the token in localStorage and redirect
            localStorage.setItem('authToken', result.token);
            window.location.href = 'customer-menu.html'; // Redirect to menu page
        }
        else {
            alert(`Error: ${result.message}`);
        }
    }
    catch (error) {
        console.error('Error during signup:', error);
        alert('There was an error with the signup process.');
    }
}));

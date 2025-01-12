import { login } from '../api';

const loginForm = document.getElementById('customer-login-form') as HTMLFormElement;
const emailLoginInput = document.getElementById('email') as HTMLInputElement;
const passwordLoginInput = document.getElementById('password') as HTMLInputElement;

loginForm.addEventListener('submit', async (event: Event) => {
  event.preventDefault();
  const email = emailLoginInput.value;
  const password = passwordLoginInput.value;

  try {
    const result = await login(email, password);

    if (result.success) {
      localStorage.setItem('authToken', result.token); // Store token in local storage
      alert('Login successful!');
      window.location.href = 'customer-menu.html'; // Redirect to the customer menu page
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('There was an error with the login process.');
  }
});

import { signup } from '../api';

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

// We no longer need the messageDiv as we're using alerts directly.
signupForm.addEventListener('submit', async (event: Event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const result = await signup(username, email, password);

    if (result.success) {
      alert('Signup successful!');
      // Store the token in localStorage and redirect
      localStorage.setItem('authToken', result.token);
      window.location.href = 'customer-menu.html'; // Redirect to menu page
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('There was an error with the signup process.');
  }
});

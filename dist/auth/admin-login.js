"use strict";
// import { login } from '../api';
// const loginForm = document.querySelector('#admin-login-form') as HTMLFormElement;
// loginForm?.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const email = (document.querySelector('#email') as HTMLInputElement).value;
//   const password = (document.querySelector('#password') as HTMLInputElement).value;
//   try {
//     // Call the login function from api.ts
//     const result = await login(email, password);
//     if (result?.token && result?.user?.roles?.includes('ADMIN')) {
//       // Store the token in localStorage or sessionStorage for authentication
//       localStorage.setItem('authToken', result.token);
//       // Redirect to admin dashboard
//       window.location.href = '/admin-dashboard.html'; // Or wherever the admin dashboard is
//     } else {
//       alert('Login failed. Please check your credentials or user role.');
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     alert('An error occurred while logging in. Please try again.');
//   }
// });

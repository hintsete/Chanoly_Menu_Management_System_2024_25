// customer-menu.ts
import { getMenuItems } from '../api';

const menuItemsDiv = document.getElementById('menu-items') as HTMLDivElement;

const authTokenCustomer = localStorage.getItem('authToken');
if (!authTokenCustomer) {
  window.location.href = '/login.html'; // Redirect to login if no auth token
}

async function loadMenuItems() {
  const menuItems = await getMenuItems(authTokenCustomer!);

  menuItemsDiv.innerHTML = '';
  menuItems.forEach((item: any) => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
    `;
    menuItemsDiv.appendChild(itemDiv);
  });
}

loadMenuItems(); // Initial load of menu items

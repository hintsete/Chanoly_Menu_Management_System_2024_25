import { getMenuItems, deleteMenuItem } from '../api';

// Get the token from localStorage and ensure it's a valid string
const token = localStorage.getItem('authToken');

// If there's no token, redirect to the admin login page
if (!token) {
  window.location.href = '/admin-login.html';
} else {
  // Proceed with the valid token
  // Fetch and display all menu items
  const menuItemsContainer = document.querySelector('#menu-items') as HTMLElement;

  const loadMenuItems = async () => {
    try {
      // Pass the token as an argument to getMenuItems
      const menuItems = await getMenuItems(token);
      menuItemsContainer.innerHTML = ''; // Clear any existing content

      menuItems.forEach((item: { id: string; name: string; price: number; categories: string[] }) => {
        const menuItemRow = document.createElement('div');
        menuItemRow.classList.add('menu-item');
        menuItemRow.innerHTML = `
          <div>${item.name}</div>
          <div>${item.price}</div>
          <div>${item.categories.join(', ')}</div>
          <button class="edit-btn" data-id="${item.id}">Edit</button>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
        `;

        // Add the delete event listener for each menu item
        menuItemRow.querySelector('.delete-btn')?.addEventListener('click', async (e) => {
          const id = (e.target as HTMLElement).dataset.id;
          if (id) {
            // Pass the token as an argument to deleteMenuItem
            await deleteMenuItem(id, token); 
            loadMenuItems(); // Reload the menu items after deletion
          }
        });

        // Add the edit event listener for each menu item
        menuItemRow.querySelector('.edit-btn')?.addEventListener('click', (e) => {
          const id = (e.target as HTMLElement).dataset.id;
          if (id) {
            // Redirect to the edit page or open an edit form
            window.location.href = `/edit-menu-item.html?id=${id}`;
          }
        });

        menuItemsContainer.appendChild(menuItemRow);
      });
    } catch (error) {
      console.error('Error loading menu items:', error);
      alert('An error occurred while fetching the menu items.');
    }
  };

  // Load the menu items on page load
  loadMenuItems();
}

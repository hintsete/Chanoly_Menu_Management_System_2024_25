var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getMenuItems, deleteMenuItem } from '../api';
// Get the token from localStorage and ensure it's a valid string
const token = localStorage.getItem('authToken');
// If there's no token, redirect to the admin login page
if (!token) {
    window.location.href = '/admin-login.html';
}
else {
    // Proceed with the valid token
    // Fetch and display all menu items
    const menuItemsContainer = document.querySelector('#menu-items');
    const loadMenuItems = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Pass the token as an argument to getMenuItems
            const menuItems = yield getMenuItems(token);
            menuItemsContainer.innerHTML = ''; // Clear any existing content
            menuItems.forEach((item) => {
                var _a, _b;
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
                (_a = menuItemRow.querySelector('.delete-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
                    const id = e.target.dataset.id;
                    if (id) {
                        // Pass the token as an argument to deleteMenuItem
                        yield deleteMenuItem(id, token);
                        loadMenuItems(); // Reload the menu items after deletion
                    }
                }));
                // Add the edit event listener for each menu item
                (_b = menuItemRow.querySelector('.edit-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    if (id) {
                        // Redirect to the edit page or open an edit form
                        window.location.href = `/edit-menu-item.html?id=${id}`;
                    }
                });
                menuItemsContainer.appendChild(menuItemRow);
            });
        }
        catch (error) {
            console.error('Error loading menu items:', error);
            alert('An error occurred while fetching the menu items.');
        }
    });
    // Load the menu items on page load
    loadMenuItems();
}

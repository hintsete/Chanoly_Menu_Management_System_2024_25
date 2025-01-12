var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// customer-menu.ts
import { getMenuItems } from '../api';
const menuItemsDiv = document.getElementById('menu-items');
const authTokenCustomer = localStorage.getItem('authToken');
if (!authTokenCustomer) {
    window.location.href = '/login.html'; // Redirect to login if no auth token
}
function loadMenuItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield getMenuItems(authTokenCustomer);
        menuItemsDiv.innerHTML = '';
        menuItems.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
    `;
            menuItemsDiv.appendChild(itemDiv);
        });
    });
}
loadMenuItems(); // Initial load of menu items

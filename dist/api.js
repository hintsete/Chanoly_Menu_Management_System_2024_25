var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// api.ts
const API_URL = 'http://localhost:3000'; // Base URL of the backend
// Function to handle user signup
export const signup = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = yield response.json();
        if (response.ok) {
            return {
                success: true,
                token: data.token,
            };
        }
        else {
            return {
                success: false,
                message: data.message || 'Signup failed',
            };
        }
    }
    catch (error) {
        console.error('API error:', error);
        return {
            success: false,
            message: 'An error occurred while contacting the server',
        };
    }
});
// Function to handle user login
export const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = yield response.json();
        if (response.ok) {
            return {
                success: true,
                token: data.token,
            };
        }
        else {
            return {
                success: false,
                message: data.message || 'Login failed',
            };
        }
    }
    catch (error) {
        console.error('API error:', error);
        return {
            success: false,
            message: 'An error occurred while contacting the server',
        };
    }
});
// Function to get all menu items (accessible to both customers and admin)
export const getMenuItems = (authToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('/api/menu-items', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        return yield response.json();
    }
    catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
});
// Function to create a new menu item (admin-only)
export function createMenuItem(name, description, price, authToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/menu-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, description, price }),
        });
        const result = yield response.json();
        return result;
    });
}
// Function to update an existing menu item (admin-only)
export function updateMenuItem(id, data, authToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/menu-items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        });
        const result = yield response.json();
        return result;
    });
}
// Function to delete a menu item (admin-only)
export const deleteMenuItem = (id, authToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`/api/menu-items/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete menu item');
        }
        alert('Menu item deleted successfully');
    }
    catch (error) {
        console.error('Error deleting menu item:', error);
        alert('An error occurred while deleting the menu item.');
    }
});

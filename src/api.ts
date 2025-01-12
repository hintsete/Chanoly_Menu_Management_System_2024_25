// api.ts
const API_URL = 'http://localhost:3000'; // Base URL of the backend

// Function to handle user signup
export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        token: data.token,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Signup failed',
      };
    }
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      message: 'An error occurred while contacting the server',
    };
  }
};


// Function to handle user login
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        token: data.token,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      message: 'An error occurred while contacting the server',
    };
  }
};


// Function to get all menu items (accessible to both customers and admin)
export const getMenuItems = async (authToken: string) => {
  try {
    const response = await fetch('/api/menu-items', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

// Function to create a new menu item (admin-only)
export async function createMenuItem(name: string, description: string, price: number, authToken: string) {
  const response = await fetch(`${API_URL}/menu-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ name, description, price }),
  });

  const result = await response.json();
  return result;
}

// Function to update an existing menu item (admin-only)
export async function updateMenuItem(id: number, data: { name: string, description: string, price: number }, authToken: string) {
  const response = await fetch(`${API_URL}/menu-items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

// Function to delete a menu item (admin-only)
export const deleteMenuItem = async (id: string, authToken: string) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }

    alert('Menu item deleted successfully');
  } catch (error) {
    console.error('Error deleting menu item:', error);
    alert('An error occurred while deleting the menu item.');
  }
};
import { createSlice } from "@reduxjs/toolkit";
import { clearCart, setCartItems } from "../shopping-cart/cartItemsSlide";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      // Load user's saved cart items from localStorage
      const savedCartItems = localStorage.getItem(
        `cartItems_${state.user.username}`
      );
      if (savedCartItems) {
        // Dispatching setCartItems action to update the cart state
        setCartItems(JSON.parse(savedCartItems)); // Assuming you have access to dispatch
      }
    },
    logout: (state) => {
      // Save the current cart items before logging out
      if (state.user) {
        const currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
        localStorage.setItem(
          `cartItems_${state.user.username}`,
          JSON.stringify(currentCartItems)
        );
      }

      state.isAuthenticated = false;
      state.user = null;

      // Clear the cart (you'll need to dispatch the clearCart action from a component or a thunk)
      clearCart(); // Assuming you have access to dispatch
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    resetPassword: (state, action) => {
      const { username, newPassword } = action.payload;
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = existingUsers.findIndex(
        (user) => user.username === username
      );

      if (userIndex !== -1) {
        existingUsers[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(existingUsers));
      } else {
        return { error: "Username does not exist." };
      }
    },
  },
});

export const { login, logout, register, resetPassword } = authSlice.actions;

export default authSlice.reducer;

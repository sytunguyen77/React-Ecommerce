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

      const savedCartItems = localStorage.getItem(
        `cartItems_${state.user.email}`
      );
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    },
    logout: (state) => {
      if (state.user) {
        const currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
        localStorage.setItem(
          `cartItems_${state.user.email}`,
          JSON.stringify(currentCartItems)
        );
      }

      state.isAuthenticated = false;
      state.user = null;

      clearCart();
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = existingUsers.findIndex((user) => user.email === email);

      if (userIndex !== -1) {
        existingUsers[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }
    },
  },
});

export const { login, logout, register, resetPassword } = authSlice.actions;

export default authSlice.reducer;

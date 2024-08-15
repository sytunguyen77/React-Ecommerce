import { configureStore } from "@reduxjs/toolkit";

import productModalSlice from "./product-modal/productModalSlice";

import cartItemsSlide from "./shopping-cart/cartItemsSlide";

import authSlice from "./authentication/authSlice";

export const store = configureStore({
  reducer: {
    productModal: productModalSlice,
    cartItems: cartItemsSlide,
    auth: authSlice,
  },
});

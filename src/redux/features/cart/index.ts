import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const MAX_QUANTITY = 30; 


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTicketQuantity: (state, { payload }) => {
      const { movieId, quantity } = payload;
      state[movieId] = Math.min(quantity, MAX_QUANTITY);
    },
    increment: (state, { payload }) => {
      const count = state[payload] || 0;
      state[payload] = count + 1;
    },
    decrement: (state, { payload }) => {
      const count = state[payload];

      if (!count) {
        return;
      }

      if (count === 1) {
        delete state[payload];
        return;
      }

      state[payload] = count - 1;
    },
    reset: () => initialState,
  },
});

export const { setTicketQuantity, increment, decrement, reset } = cartSlice.actions;

export const selectTicketQuantities = (state) => state.cart;

export const cartReducer = cartSlice.reducer;

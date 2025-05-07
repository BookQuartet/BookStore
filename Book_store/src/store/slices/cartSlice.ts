import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';

interface Book {
  title: string;
  id: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: Book[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

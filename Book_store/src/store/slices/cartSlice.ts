import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState: CartState = {
  items: cartLocalStorage,
};
const saveToLocalStorage = (items: Book[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        toast.error('Item already exists in this Cart ❌')
        exists.quantity += 1;
      } else {
        toast.success('Item Added to Cart ✅')

        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      toast.success("Item Removed from the Cart")
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items);

    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state.items);

    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToLocalStorage(state.items);

    },
    buyItem(state){
      toast.success('Order Successfull')
      state.items= [];
      saveToLocalStorage(state.items);

    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, buyItem } = cartSlice.actions;
export default cartSlice.reducer;

// redux/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../thunk/cart';

type CartItem = {
  productId: number;
  quantity: number;
  price: number;
};

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = { items: [], loading: false, error: null };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // optional: local add/remove for optimistic updates
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // If your API returns the updated cart, replace it:
        // state.items = action.payload.items;

        // If API returns only the item, merge it locally:
        const incoming: CartItem = action.meta.arg; // the request we sent
        const existing = state.items.find(i => i.productId === incoming.productId);
        if (existing) {
          existing.quantity += incoming.quantity;
          existing.price = incoming.price; // or keep existing if price is per unit
        } else {
          state.items.push(incoming);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to add product to cart';
      });
  }
});

export default cartSlice.reducer;

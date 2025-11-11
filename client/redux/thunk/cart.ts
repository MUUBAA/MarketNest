// redux/thunk/cart.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AddToCartPayload {
  userId: number;    // make this required to avoid surprise undefined
  productId: number;
  quantity: number;
  price: number;
}

export const addToCart = createAsyncThunk<any, AddToCartPayload>(
  'cart/add',
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) return rejectWithValue('No authentication token found');

      const response = await axios.post(
        '/cart/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,     // raw token here
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return response.data; // return server's updated item/cart if available
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product to cart');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

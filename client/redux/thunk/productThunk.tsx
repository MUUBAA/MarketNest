import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../../src/api/productApi.js';
import { getDecryptedJwt } from "../../utils/auth";


// Get JWT token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('jwtToken');
};

export interface ProductGetAllResponse {
  productId: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  itemUrl: string;
  id: number;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
}

// Fetch all products
export const fetchAllProducts = createAsyncThunk<ProductGetAllResponse[], ProductGetAllResponse>(
  'products/fetchAll',
  async (payload: ProductGetAllResponse, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      const decodedToken = getDecryptedJwt(); // Decode the base64 encoded toke
      if (!decodedToken) {
        return rejectWithValue('Invalid authentication token');
      }

      const response = await axios.post(
        `/product/get-all`, payload,
        {
          headers: {
            Authorization: `Bearer ${decodedToken}`,
            "Content-Type": "application/json-patch+json",
            Accept: 'text/plain'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Fetch products by category


// Fetch single product by ID
export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get<{ success: boolean; message: string; data: Product }>(
        `/product/get-by-id`,
        {
          params: { productId },
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  'products/search',
  async (query, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.get<{ success: boolean; message: string; data: Product[] }>(
        `/products/search`,
        {
          params: { q: query },
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to search products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

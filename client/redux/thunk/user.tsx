import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDecryptedJwt } from "../../utils/auth";

interface CreateUserPayload {
  userId: number;
  name: string;
  password: string;
  email: string;
}

export const createUser = createAsyncThunk<
  { success: boolean; message: string },
  CreateUserPayload
>("users/create", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    const decodedToken = getDecryptedJwt();
    if (!decodedToken) {
      return rejectWithValue("Invalid authentication token");
    }

    const response = await axios.post(
      `/users/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${decodedToken}`,
          "Content-Type": "application/json-patch+json",
          Accept: "*/*",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

interface GetUserByIdPayload {
  id: number;
}

export const getUserById = createAsyncThunk<
  { id: number; name: string; email: string, address?: string },
  GetUserByIdPayload
>("users/getById", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    const decodedToken = getDecryptedJwt();
    if (!decodedToken) {
      return rejectWithValue("Invalid authentication token");
    }

    const response = await axios.get(
      `/users/getById`,
      {
        params: { id: payload.id },
        headers: {
          Authorization: `Bearer ${decodedToken}`,
          Accept: "*/*",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user by ID"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

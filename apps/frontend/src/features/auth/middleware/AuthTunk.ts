import { createAsyncThunk } from '@reduxjs/toolkit';

export const verifyToken = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('http://localhost:8000/api/auth/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem('token');
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      return rejectWithValue('Error validando sesión');
    }
  }
);

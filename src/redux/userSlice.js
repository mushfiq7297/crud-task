import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for CRUD operations
export const getAllUsers = createAsyncThunk('users/getAll', async () => {
  const response = await axios.get('https://wesoftin-backend.vercel.app/users?sort=asc');
  return response.data;
});

export const getSingleUser = createAsyncThunk('users/getSingle', async (_id) => {  // Use _id
  const response = await axios.get(`https://wesoftin-backend.vercel.app/users/${_id}`);
  return response.data;
});

export const addUser = createAsyncThunk('users/add', async (user) => {
  const response = await axios.post('https://wesoftin-backend.vercel.app/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/update', async ({ _id, user }) => {  // Use _id
  const response = await axios.put(`https://wesoftin-backend.vercel.app/users/${_id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (_id) => {  // Use _id
  await axios.delete(`https://wesoftin-backend.vercel.app/users/${_id}`);
  return _id;
});

// User Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.users = [action.payload];
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);  // Use _id
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);  // Use _id
      });
  },
});

export default userSlice.reducer;

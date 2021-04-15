import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/auth/login',
          {
            username,
            password,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        // let data = await response.json();
        console.log('response', response.data);
        if (response.status === 200) {
          localStorage.setItem('token', response.data);//token
          return response.data;
        } else {
          return thunkAPI.rejectWithValue(response.data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
);
  
  


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
      // Reducer comes here
  },
  extraReducers: {
       // Extra reducer comes here
       [loginUser.fulfilled]: (state, { payload }) => {
        state.email = payload.email;
        state.username = payload.name;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      },
      [loginUser.rejected]: (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      },
      [loginUser.pending]: (state) => {
        state.isFetching = true;
      },
  
  },
});

export const userSelector = (state) => state.user;

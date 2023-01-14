import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Запрос на сервер (auth)
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);

  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toLogout: (state, action) => {
      state.data = null;
      console.log('Hello');
    },
  },
  extraReducers: {
    // Авторизация
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

// Actions
export const { toLogout } = authSlice.actions;

// Проверка на наличия авторизации пользователя
export const selectIsAuth = (state) => Boolean(state.authReducer.data);

export const authReducer = authSlice.reducer;

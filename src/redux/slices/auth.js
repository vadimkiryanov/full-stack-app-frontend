import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Запрос на сервер (auth)
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);

  return data;
});

// Register
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);

  return data;
});

// authMe
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
  // get запрос без параметров, так axios автоматически будет вытаскивать из localStorage token
  const { data } = await axios.get('/auth/me');

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

    // Me
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    // Register
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
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

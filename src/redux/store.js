import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';

const store = configureStore({
  reducer: {
    postsReducer,
    authReducer,
  },
});

export default store;

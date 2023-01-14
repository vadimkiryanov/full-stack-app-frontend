import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    postsReducer,
  },
});

export default store;

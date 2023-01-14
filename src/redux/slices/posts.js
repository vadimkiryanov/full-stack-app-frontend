import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    items: [],
    loading: 'loading',
  },
  tags: {
    items: [],
    loading: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
});

export const postsReducer = postsSlice.reducer;

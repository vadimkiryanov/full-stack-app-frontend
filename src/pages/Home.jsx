import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import axios from '../axios'; // Важно импортировать не библиотеку
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.postsReducer);

  const isPostsLoading = posts.status === 'loading';

  console.log(posts);

  // Запрос на БЭК
  React.useEffect(() => {
    // axios.get('/posts');
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((itemPost, idPost) =>
            isPostsLoading ? (
              <Post key={idPost} isLoading={true} />
            ) : (
              <Post
                id={itemPost._id}
                title={itemPost.title}
                imageUrl={itemPost.imageUrl}
                user={itemPost.user}
                createdAt={itemPost.createdAt}
                viewsCount={itemPost.viewsCount}
                commentsCount={3}
                tags={itemPost.tags}
                isEditable
                isLoading={false}
              />
            )
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

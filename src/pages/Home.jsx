import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.postsReducer);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = posts.status === 'loading';
  const isPostsError = posts.status === 'error';

  console.log(posts);

  // Запрос на БЭК (Актуально, чтобы запрос шел из Home для акутальной информации)
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
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
                _id={itemPost._id}
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
          {isPostsError && <h2>Произошла непредвиденная ошибка</h2>}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
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

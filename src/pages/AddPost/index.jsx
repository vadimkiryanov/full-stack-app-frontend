import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Simple editor
import SimpleMDE from 'react-simplemde-editor';

import { Link, Navigate, useNavigate } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import axios from '../../axios';

export const AddPost = () => {
  // Проверка входа пользователя
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate(); // Для редиректа

  const [isLoading, setLoading] = React.useState(false);

  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef(null);

  // Проверка изменений в инпуте и отправка картинок на сервер
  const handleChangeFile = async (event) => {
    try {
      // Специальный формат, который позволяет вшивать в себя картинку и отправять на бекенд
      const formData = new FormData();
      const file = event.target.files[0]; // Сам файл
      formData.append('image', file); // 1 - ключ, 2 - сам файл

      // Отправка файла на сервер
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
      console.log({ data });
    } catch (err) {
      console.warn('Произошла ошибка:', err);
      alert('Произошла ошибка при загрузке файла');
    }

    console.log(event.target.files);
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  // Используется в simpleEditor и она требует useCallback() по дефолту
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      // Общий объект со всеми введенными данными статьи
      const postFields = {
        title,
        text,
        imageUrl,
        tags, // Превращение строк в массив
      };
      // Выполняем отправку данных и тут же получаем ответ в data
      const { data } = await axios.post('/posts', postFields);

      // Из даты берем нужный _id для последующего редиректа на пост
      const _id = data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn('Произошла ошибка:', err);
      alert('Произошла ошибка при создании статьи');
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  // Если пользователь НЕ авторизовался, то его редиректят на главную стр
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {/* Когда кликаем на эту кнопку-пустышку, она перенаправляет клик на настоящий инпут */}
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      {/* Инпут скрыт, но свою функцию выполняет */}
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

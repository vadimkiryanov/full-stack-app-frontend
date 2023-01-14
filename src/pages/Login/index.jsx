import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

// useForm
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import { Navigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();

  // Проверка входа пользователя
  const isAuth = useSelector(selectIsAuth);
  console.log({ isAuth });

  // useForm()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    // Дефолтные значения
    defaultValues: {
      email: 'test@test.com',
      password: 'test123',
    },
    // Происходить валидация будет каждый раз при изменении формы
    mode: 'onChange',
  });

  // Выполняется, если вся валидация прошла успешно
  const onSubmitForm = async (values) => {
    // Отправка формы на сервер входа и сохранение в data
    const data = await dispatch(fetchAuth(values));

    // Альтернативный способ отлова ошибок
    // if (!data.payload) {
    //   alert('Не удалось авторизоваться');
    // }

    // Отлов ошибок, если не получилось авторизоваться
    try {
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      alert('Не удалось авторизоваться');
      console.error('Произошла ошибка:', error);
    }

    // Если поле token есть в data.payload, то грузим токен в localStorage

    console.log(data);
  };

  // Если пользователь авторизовался, то его редиректят на главную стр
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>

      {/* onSubmit={handleSubmit(onSubmitForm)} */}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          // errors.email?.message - если это есть, то будет отрабатывать ошибка
          error={Boolean(errors.email?.message)}
          // errors - из useForm()
          helperText={errors.email?.message}
          // Даем понять, на какие компоненты должен реагировать useForm
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          type="password"
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

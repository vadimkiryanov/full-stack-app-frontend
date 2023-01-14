import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
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
      fullName: 'Вася Пупкин',
      email: 'vasya@test.com',
      password: 'test123',
    },
    // Происходить валидация будет каждый раз при изменении формы
    mode: 'onChange',
  });

  // Выполняется, если вся валидация прошла успешно
  const onSubmitForm = async (values) => {
    // Отправка формы на сервер входа и сохранение в data
    const data = await dispatch(fetchRegister(values));

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
      alert('Не удалось зарегистрироваться');
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
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          type="text"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите корректное имя' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

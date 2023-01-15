import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, toLogout } from '../../redux/slices/auth';

export const Header = () => {
  // Проверка входа пользователя
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(toLogout()); // Выход из аккаунта
      window.localStorage.removeItem('token'); // Удаление токена из localStorage
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>VADOS BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth || window.localStorage.getItem('token') ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

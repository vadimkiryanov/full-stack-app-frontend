import axios from 'axios';

// Создание оболочки axios`a
const instance = axios.create({
  baseURL: 'http://localhost:4444', // URL по умолчанию
});

export default instance;

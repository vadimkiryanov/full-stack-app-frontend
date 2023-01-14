import axios from 'axios';

// Создание оболочки axios`a
const instance = axios.create({
  baseURL: 'http://localhost:4444', // URL по умолчанию
});

// Когда происходит любой запрос, функция проверяет наличие токена
instance.interceptors.request.use((config) => {
  // config.headers.Authorization - поле для хранения доступа к запросам
  config.headers.Authorization = window.localStorage.getItem('token');

  // Возвращение изменной конфигурации axios
  return config;
});

export default instance;

import axios from 'axios';
import { API_URL } from './constants';

const mainApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Обработка ошибок должна быть асинхронной
const responseHandler = async (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    throw new Error(
      JSON.stringify({
        status: res.status,
        message: res.data ? res.data.message : 'Произошла ошибка',
      }),
    );
  }
};

export const getData = async () => {
  try {
    const response = await mainApi.get('/glossary', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return responseHandler(response);
  } catch (error) {
    // Обрабатываем ошибку, например, выводим в консоль
    console.error('Ошибка при получении данных:', error.message);
    throw error; // Перебрасываем ошибку для дальнейшей обработки
  }
};

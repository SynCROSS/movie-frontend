import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return data?.access_token;
  } catch (e) {
    console.error(e);
  }
};

export const register = async ({ username, nickname, email, password }) => {
  try {
    return await axios.post(`${BASE_URL}/users/register`, {
      username,
      nickname,
      email,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};

export const checkLoggedIn = async (token: string) => {
  try {
    return await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

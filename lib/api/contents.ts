import client, { BASE_URL } from './client';

export const getPopularContents = async (media: string, page: number = 1) => {
  try {
    return await client.get(`${BASE_URL}/${media}/popular?page=${page}`);
  } catch (e) {
    console.error(e);
  }
};

export const getTopRatedContents = async (media: string, page: number = 1) => {
  try {
    return await client.get(`${BASE_URL}/${media}/top_rated?page=${page}`);
  } catch (e) {
    console.error(e);
  }
};

export const getTrendingContents = async (media: string, page: number = 1) => {
  try {
    return await client.get(
      `${BASE_URL}/${media}/trending?time_window=week&page=${page}`,
    );
  } catch (e) {
    console.error(e);
  }
};

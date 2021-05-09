import axios from 'axios';

export const getPopularContents = async (media: string, page: number = 1) => {
  try {
    return await axios.get(
      `http://localhost:4000/api/${media}?target=popular&page=${page || 1}`,
    );
  } catch (e) {
    console.error(e);
  }
};

export const getTopRatedContents = async (media: string, page: number = 1) => {
  try {
    return await axios.get(
      `http://localhost:4000/api/${media}?target=top_rated&page=${page || 1}`,
    );
  } catch (e) {
    console.error(e);
  }
};

export const getTrendingContents = async (media: string, page: number = 1) => {
  try {
    return await axios.get(
      `http://localhost:4000/api/${media}/trending?time_window=week&page=${
        page || 1
      }`,
    );
  } catch (e) {
    console.error(e);
  }
};

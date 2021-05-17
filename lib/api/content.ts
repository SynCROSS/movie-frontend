import client, { BASE_URL } from './client';

export const getDetailContent = async (media: string, id: number) => {
  try {
    const { data } = await client.get(`${BASE_URL}/${media}/detail/${id}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

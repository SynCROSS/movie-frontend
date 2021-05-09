import Home from '../../components/contents/Home';
import { useCallback, useEffect, useState } from 'react';
import { maxBy, uniqBy } from 'lodash';
import {
  getPopularContents,
  getTopRatedContents,
  getTrendingContents,
} from '../../lib/api/contents';

const shuffleArray = (array: Array<any>) =>
  array.sort(() => Math.random() - 0.5);

const HomeContainer = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const fetchPopular = useCallback(async (media: string) => {
    const popularContents = await getPopularContents(media);
    setPopular(popular => popular.concat(popularContents?.data?.results));
  }, []);

  const fetchTopRated = useCallback(async (media: string) => {
    const topRatedContents = await getTopRatedContents(media);
    setTopRated(topRated => topRated.concat(topRatedContents?.data?.results));
  }, []);

  const fetchTrending = useCallback(async (media: string) => {
    const trendingContents = await getTrendingContents(media);
    setTrending(trending => trending.concat(trendingContents?.data?.results));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for await (const media of ['movies', 'tv']) {
          await fetchPopular(media);
          await fetchTopRated(media);
          await fetchTrending(media);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // console.log('popular:', popular);
  // console.log('topRated:', topRated);
  // console.log('trending:', trending);

  return (
    <Home
      popular={shuffleArray(uniqBy(popular, 'id'))}
      topRated={shuffleArray(uniqBy(topRated, 'id'))}
      trending={shuffleArray(uniqBy(trending, 'id'))}
      trendingContent={maxBy(uniqBy(trending, 'id'), 'popularity')}
    />
  );
};

export default HomeContainer;

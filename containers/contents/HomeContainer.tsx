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
  const [popularContents, setPopularContents] = useState([]);
  const [topRatedContents, setTopRatedContents] = useState([]);
  const [trendingContents, setTrendingContents] = useState([]);

  const fetchPopular = useCallback(async (media: string) => {
    const {
      data: { results },
    } = await getPopularContents(media);

    setPopularContents(popularContents => popularContents.concat(results));
  }, []);

  const fetchTopRated = useCallback(async (media: string) => {
    const {
      data: { results },
    } = await getTopRatedContents(media);

    setTopRatedContents(topRatedContents => topRatedContents.concat(results));
  }, []);

  const fetchTrending = useCallback(async (media: string) => {
    const {
      data: { results },
    } = await getTrendingContents(media);

    setTrendingContents(trendingContents => trendingContents.concat(results));
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
      popular={shuffleArray(uniqBy(popularContents, 'id'))}
      topRated={shuffleArray(uniqBy(topRatedContents, 'id'))}
      trending={shuffleArray(uniqBy(trendingContents, 'id'))}
      trendingContent={maxBy(uniqBy(trendingContents, 'id'), 'popularity')}
    />
  );
};

export default HomeContainer;

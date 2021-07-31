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

  useEffect(() => {
    setPopularContents(popularContents =>
      shuffleArray(uniqBy(popularContents, 'id')),
    );
    setTopRatedContents(topRatedContents =>
      shuffleArray(uniqBy(topRatedContents, 'id')),
    );
    setTrendingContents(trendingContents =>
      shuffleArray(uniqBy(trendingContents, 'id')),
    );
  }, []);

  // console.log('popularContents:', popularContents);
  // console.log('topRatedContents:', topRatedContents);
  // console.log('trendingContents:', trendingContents);

  return (
    <Home
      popular={popularContents}
      topRated={topRatedContents}
      trending={trendingContents}
      trendingContent={maxBy(uniqBy(trendingContents, 'id'), 'popularity')}
    />
  );
};

export default HomeContainer;

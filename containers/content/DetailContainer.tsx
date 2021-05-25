import { useCallback, useEffect, useState } from 'react';
import Detail from '../../components/content/Detail';
import { getDetailContent } from '../../lib/api/content';

const DetailContainer = ({ media_type, id }) => {
  const [content, setContent] = useState(null);

  const getContent = useCallback(async (media: string, id: number) => {
    const detailContent = await getDetailContent(
      media === 'movie' ? 'movies' : media,
      id,
    );
    setContent(detailContent);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContent(media_type, id);
      } catch (e) {
        console.error(e);
      }
    };
    fetchContent();
  }, []);

  return <Detail content={content} />;
};

export default DetailContainer;

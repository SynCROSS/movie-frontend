import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDetailContent } from '../../lib/api/content';
import { BASE_IMAGE_URL } from '../../lib/link';

const DetailBlock = styled.div`
  width: 100%;
  background: ${props =>
    `url(${props.backdrop}) center no-repeat local` || '#111'};
  box-shadow: inset 100vw 100vh rgba(0, 0, 0, 0.7);
`;

const Recommendation = styled.div`
  min-height: 100vh;
  justify-content: space-around;
  flex-direction: row-reverse;

  @media screen and (max-device-width: 480px) and (orientation: portrait),
    screen and (max-device-width: 640px) and (orientation: landscape),
    screen and (max-device-width: 640px),
    screen and (min-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2),
    (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2),
    (device-height: 667px) and (device-width: 375px) {
    flex-direction: column;
  }

  @media screen and (min-device-width: 768px) and (max-device-width: 1024px),
    screen and (min-width: 1024px) {
    padding: 3rem;
  }
`;

const InfoArea = styled.div`
  text-align: left;
  margin: 2rem;
  align-items: baseline;
`;

const ContentTitle = styled.h1`
  font-size: 6rem;
  line-height: 2;

  @media screen and (max-device-width: 480px) and (orientation: portrait),
    screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 4rem;
  }

  @media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2),
    (device-height: 667px) and (device-width: 375px) {
    font-size: 2.5rem;
  }
`;

const Overview = styled.p`
  margin: 0;
  font-size: 3rem;
  color: #bbb;

  @media screen and (max-device-width: 480px) and (orientation: portrait),
    screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 2rem;
  }

  @media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2),
    (device-height: 667px) and (device-width: 375px) {
    font-size: 1.5rem;
  }
`;

const Poster = styled.img`
  height: 35rem;
  margin: 0 2rem;
  /* #### iPhone 5 Portrait or Landscape #### */
  @media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2) {
    height: 30rem;
    margin: 1rem 0;
  }

  /* #### Tablets Portrait or Landscape #### */
  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    height: 50rem;
  }
`;

const Detail = ({ media_type, id }) => {
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

  return (
    <DetailBlock
      className="main-content flex jc-center ai-center flex-dir-col"
      backdrop={`${BASE_IMAGE_URL}${content?.backdrop_path}`}
    >
      <Recommendation className="flex ai-center">
        <Poster src={`${BASE_IMAGE_URL}${content?.poster_path}`} alt="" />
        <InfoArea className="flex flex-dir-col">
          <ContentTitle>{content?.title || content?.name}</ContentTitle>
          <Overview>{content?.overview?.slice(0, 200)}</Overview>
        </InfoArea>
      </Recommendation>
    </DetailBlock>
  );
};

export default Detail;

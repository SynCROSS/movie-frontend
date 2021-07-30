import Link from 'next/link';
import { Dispatch, SetStateAction, UIEvent, useState } from 'react';
import styled from 'styled-components';
import DetailContainer from '../../containers/content/DetailContainer';
import { BASE_IMAGE_URL, PLACEHOlDER_URL } from '../../lib/link';

const HomeBlock = styled.div`
  width: 100%;
  color: #eee;
  background: #000;
`;

const StyledSection = styled.section`
  width: 90%;
  /* padding: 2.5rem 5.5rem; */
`;

const ContentsHeader = styled.h2`
  text-align: left;
  font-size: 2rem;
  margin: 1rem auto;
`;

const ContentsWrapper = styled.div`
  position: relative;
`;

const ContentsList = styled.ul`
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  scroll-behavior: smooth;

  .shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  &.off-bottom {
    .shadow-top {
      box-shadow: inset 5rem 0 5rem -5rem white;
    }
  }

  &.off-top {
    .shadow-bottom {
      box-shadow: inset -5rem 0 5rem -5rem white;
    }
  }

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;

    &:hover {
      background: #ddd;
    }
  }
`;

const ContentsItem = styled.li`
  flex: 0 0 auto;
  position: relative;
`;

const ContentShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  box-shadow: inset 0 -5rem 10rem 0 rgba(0, 0, 0, 0.7);
`;

const ContentTitle = styled.b`
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 10px;
  z-index: 4;
  color: #ccc;
`;

function setShadows(e: UIEvent, setState: Dispatch<SetStateAction<boolean>>) {
  if (e.currentTarget.scrollLeft > 0) {
    setState(true);
    return;
  }
  setState(false);
}

const ContentsArea = ({ isScrolling, setScrolling, contents }) => {
  if (typeof window === 'undefined' || typeof screen === 'undefined') {
    return <ContentsWrapper />;
  }

  const deviceWidth =
    (window?.innerWidth > 0 ? window?.innerWidth : screen?.width) * 0.9;

  return (
    <ContentsWrapper>
      <ContentsList
        className={`flex ai-center ${isScrolling ? 'off-bottom' : 'off-top'}`}
        onScroll={e => setShadows(e, setScrolling)}
      >
        <div className="shadow shadow-top" aria-hidden="true" />
        {contents?.map(content => (
          <ContentsItem key={content?.id}>
            <Link
              href={`/Detail/${
                content?.media_type
                  ? content?.media_type
                  : content?.first_air_date
                  ? 'tv'
                  : 'movie'
              }/${content?.id}`}
            >
              <a>
                <img
                  src={
                    content.backdrop_path ?? false
                      ? `${BASE_IMAGE_URL}${content?.backdrop_path}`
                      : PLACEHOlDER_URL + encodeURIComponent('No Background')
                  }
                  alt=""
                  width={deviceWidth > 540 ? deviceWidth * 0.2 : deviceWidth}
                  loading="lazy"
                />
                <ContentShadow />
                <ContentTitle>{content?.name || content?.title}</ContentTitle>
              </a>
            </Link>
          </ContentsItem>
        ))}
        <div className="shadow shadow-bottom" aria-hidden="true" />
      </ContentsList>
    </ContentsWrapper>
  );
};

const Home = ({
  popular = [],
  topRated = [],
  trending = [],
  trendingContent,
}) => {
  const [popularScrolling, setPopularScrolling] = useState(false);
  const [topRatedScrolling, setTopRatedScrolling] = useState(false);
  const [trendingScrolling, setTrendingScrolling] = useState(false);

  return (
    <HomeBlock className="main-content flex jc-center ai-center flex-dir-col">
      {trendingContent && (
        <DetailContainer
          media_type={trendingContent?.media_type}
          id={trendingContent?.id}
        />
      )}
      <StyledSection>
        <div id="popular">
          <ContentsHeader>What's Popular!</ContentsHeader>
          <ContentsArea
            isScrolling={popularScrolling}
            setScrolling={setPopularScrolling}
            contents={popular}
          />
        </div>
        <div id="topRated">
          <ContentsHeader>Top Rated</ContentsHeader>
          <ContentsArea
            isScrolling={topRatedScrolling}
            setScrolling={setTopRatedScrolling}
            contents={topRated}
          />
        </div>
        <div id="trending">
          <ContentsHeader>Trending</ContentsHeader>
          <ContentsArea
            isScrolling={trendingScrolling}
            setScrolling={setTrendingScrolling}
            contents={trending}
          />
        </div>
      </StyledSection>
    </HomeBlock>
  );
};

export default Home;

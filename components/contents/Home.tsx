import Link from 'next/link';
import { Dispatch, SetStateAction, UIEvent, useState } from 'react';
import styled from 'styled-components';
import DetailContainer from '../../containers/content/DetailContainer';
import { BASE_IMAGE_URL, PLACEHOlDER_URL } from '../../lib/link';

const HomeBlock = styled.div`
  width: 100%;
  color: #eee;
  background: linear-gradient(#000, #111);
`;

const StyledSection = styled.section`
  width: 90%;
  /* padding: 2.5rem 5.5rem; */
`;

const ContentsHeader = styled.h2`
  text-align: left;
  font-size: 2rem;
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
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  &.off-top {
    .shadow-top {
      box-shadow: inset 5rem 0 5rem -5rem white;
    }
  }
  &.off-bottom {
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
  } else if (e.currentTarget.scrollLeft < 5390) {
    setState(false);
  }
}

const ContentsArea = ({ isScrolling, setScrolling, contents }) => {
  return (
    <ContentsWrapper>
      <ContentsList
        className={`flex ai-center ${isScrolling ? 'off-top' : 'off-bottom'}`}
        onScroll={e => setShadows(e, setScrolling)}
      >
        <div className="shadow shadow-top" aria-hidden="true"></div>
        {contents?.map(content => (
          <ContentsItem key={content?.id}>
            <Link
              href={`/Detail/${
                content?.media_type
                  ? undefined
                  : content?.first_air_date
                  ? 'tv'
                  : 'movie'
              }/${content?.id}`}
            >
              <a>
                <img
                  src={
                    content?.backdrop_path
                      ? `${BASE_IMAGE_URL}${content?.backdrop_path}`
                      : PLACEHOlDER_URL + encodeURIComponent(`${content?.name}`)
                  }
                  alt=""
                  width="342.538"
                  loading="lazy"
                />
                <ContentShadow />
                <ContentTitle>{content?.name || content?.title}</ContentTitle>
              </a>
            </Link>
          </ContentsItem>
        ))}
        <div className="shadow shadow-bottom" aria-hidden="true"></div>
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

import { Dispatch, SetStateAction, UIEvent, useState } from 'react';
import styled from 'styled-components';

const HomeBlock = styled.div`
  width: 100%;
  background-color: #111;
  color: #eee;
`;

const StyledSection = styled.section`
  width: -webkit-fill-available;
  padding: 2.5rem 10.5rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  filter: brightness(0.4);
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
`;

const Home = ({
  popular = [],
  topRated = [],
  trending = [],
  trendingContent,
}) => {
  const [popularScrolling, setPopularScrolling] = useState(false);
  const [topRatedScrolling, setTopRatedScrolling] = useState(false);
  const [trendingScrolling, setTrendingScrolling] = useState(false);

  function setShadows(e: UIEvent, setState: Dispatch<SetStateAction<boolean>>) {
    if (e.currentTarget.scrollLeft > 0) {
      setState(true);
    } else if (e.currentTarget.scrollLeft < 5390) {
      setState(false);
    }
  }

  const PLACEHOlDER_URL = 'https://via.placeholder.com/326x183/000?Text=';
  const API_URL = 'https://www.themoviedb.org/t/p/original';

  return (
    <HomeBlock className="main-content flex jc-center ai-center flex-dir-col">
      {trendingContent && (
        <div id="recommendation">
          <HeaderImage
            src={`${API_URL}/${trendingContent?.backdrop_path}`}
            alt=""
          />
          <h1></h1>
        </div>
      )}
      <StyledSection>
        <div id="popular">
          <ContentsHeader>What's Popular!</ContentsHeader>
          <ContentsWrapper>
            <ContentsList
              id="popular_list"
              className={`flex ai-center ${
                popularScrolling ? 'off-top' : 'off-bottom'
              }`}
              onScroll={e => setShadows(e, setPopularScrolling)}
            >
              <div className="shadow shadow-top" aria-hidden="true"></div>
              {popular?.map(p => (
                <ContentsItem key={p?.id}>
                  <img
                    src={
                      p?.backdrop_path
                        ? `${API_URL}/${p?.backdrop_path}`
                        : encodeURIComponent(PLACEHOlDER_URL + `${p?.name}`)
                    }
                    alt=""
                    width="326"
                    title={p?.name || p?.title}
                    loading="lazy"
                  />
                </ContentsItem>
              ))}
              <div className="shadow shadow-bottom" aria-hidden="true"></div>
            </ContentsList>
          </ContentsWrapper>
        </div>
        <div id="topRated">
          <ContentsHeader>Top Rated</ContentsHeader>
          <ContentsWrapper>
            <ContentsList
              id="top_rated_list"
              className={`flex ai-center ${
                topRatedScrolling ? 'off-top' : 'off-bottom'
              }`}
              onScroll={e => setShadows(e, setTopRatedScrolling)}
            >
              <div className="shadow shadow-top" aria-hidden="true"></div>
              {topRated?.map(tr => (
                <ContentsItem key={tr?.id}>
                  <img
                    src={
                      tr?.backdrop_path
                        ? `${API_URL}/${tr?.backdrop_path}`
                        : encodeURIComponent(PLACEHOlDER_URL + `${tr?.name}`)
                    }
                    alt=""
                    width="326"
                    title={tr?.name || tr?.title}
                    loading="lazy"
                  />
                </ContentsItem>
              ))}
              <div className="shadow shadow-bottom" aria-hidden="true"></div>
            </ContentsList>
          </ContentsWrapper>
        </div>
        <div id="trending">
          <ContentsHeader>Trending</ContentsHeader>
          <ContentsWrapper>
            <ContentsList
              id="trending_list"
              className={`flex ai-center ${
                trendingScrolling ? 'off-top' : 'off-bottom'
              }`}
              onScroll={e => setShadows(e, setTrendingScrolling)}
            >
              <div className="shadow shadow-top" aria-hidden="true"></div>
              {trending?.map(t => (
                <ContentsItem key={t?.id}>
                  <img
                    src={
                      t?.backdrop_path
                        ? `${API_URL}/${t?.backdrop_path}`
                        : encodeURIComponent(PLACEHOlDER_URL + `${t?.name}`)
                    }
                    alt=""
                    width="326"
                    title={t?.name || t?.title}
                    loading="lazy"
                  />
                </ContentsItem>
              ))}
              <div className="shadow shadow-bottom" aria-hidden="true"></div>
            </ContentsList>
          </ContentsWrapper>
        </div>
      </StyledSection>
    </HomeBlock>
  );
};

export default Home;

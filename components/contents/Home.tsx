import styled from 'styled-components';

const HomeBlock = styled.div``;

const Home = (popular, topRated, trending) => {
  return (
    <HomeBlock className="main-content flex jc-center ai-center flex-dir-col">
      <div id="popular">
        <h2>What's Popular!</h2>
        <ul id="popular_list">
          {/* {popular?.map(p => (
            <li>{p?.id}</li>
          ))} */}
          {(() => {
            console.log(popular, topRated, trending);
            return typeof popular;
          })()}
        </ul>
      </div>
    </HomeBlock>
  );
};

export default Home;

import React from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';
import ContinueWatching from '../components/Home/ContinueWatching';
import GenreSec from '../components/Home/GenreSec';
import Header from '../components/Home/Header';
import Picks from '../components/Home/Picks';
import MoviesColl from '../components/MoviesColl';
import { useGlobal } from '../context/GlobalContext';

const genres = {
  movie: [
    { genre: 'kids', id: 16, page: 7 },
    { genre: 'action', id: 28, page: 2 },
    { genre: 'thriller', id: 53, page: 2 },
    { genre: 'drama', id: 18, page: 2 },
    { genre: 'famiily', id: 10751, page: 2 },
    { genre: 'adventure', id: 12, page: 3 },
    { genre: 'fiction', id: 878, page: 4 },
    { genre: 'war', id: 10752, page: 1 },
    { genre: 'history', id: 36, page: 8 },
  ],
  tv: [
    { genre: 'kids', id: 10762, page: 7 },
    { genre: 'action', id: 10759, page: 3 },
    { genre: 'family', id: 10751, page: 2 },
    { genre: 'Drama', id: 18, page: 3 },
    { genre: 'thriller', id: 9648, page: 2 },
    { genre: 'comedy', id: 35, page: 4 },
    { genre: 'fiction', id: 10765, page: 2 },
    { genre: 'war', id: 10768, page: 1 },
    { genre: 'reality', id: 10764, page: 1 },
    { genre: 'reality', id: 10766, page: 1 },
  ],
};
const API_KEY = `13b3bc960e46a55e92a188b702121bfb`;
function Home() {
  const { siz } = useGlobal();
  const { UserSelected } = useGlobal();
  let { id } = useParams();
  if (id === 'in') {
    id = null;
  }
  let movtvinf = [
    {
      type: 'movie',
      url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&append_to_response=release_dates`,
      genre: `Latest & Trending`,
    },
    {
      type: 'tv',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759`,
      genre: `Trending Series`,
    },
    {
      type: 'movie',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=4`,
      genre: `Popular Movies`,
    },
    {
      type: 'tv',
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=80&page=1`,
      genre: `Popular Series`,
    },
  ];

  return (
    <div className='container'>
      <ContinueWatching user={UserSelected}></ContinueWatching>
      <div className='header-main' style={{ width: `${siz[0]}px` }}>
        <div className='header-main__parent'>
          <Header
            user={UserSelected}
            type={id}
            movieIds={
              id
                ? id === 'movie'
                  ? [
                      480530, 482373, 315635, 649409, 281957, 552269, 348350,
                      157336,
                    ]
                  : [1396, 19885, 615, 62560, 87108, 88396, 71712, 60574, 80752]
                : undefined
            }
          ></Header>
        </div>
      </div>
      {movtvinf.map((el, idx) => {
        return id === el.type ? (
          <MoviesColl
            key={`${idx}${el.type}`}
            first={idx === 0 || (el.genre === `Trending Series` && true)}
            type={el.type}
            size={el.type === 'tv' && 'heightsmall'}
            url={el.url}
          >
            {el.genre}
          </MoviesColl>
        ) : !id ? (
          <MoviesColl
            key={`${idx}${el.type}`}
            type={el.type}
            first={idx === 0 && true}
            size={el.type === 'tv' && 'heightsmall'}
            url={el.url}
          >
            {el.genre}
          </MoviesColl>
        ) : null;
      })}
      {!id && <Picks></Picks>}
      {genres[id || 'movie'].map((el, idx) => {
        return (
          <MoviesColl
            key={idx}
            type={id}
            poster={id === 'tv' && true}
            url={`https://api.themoviedb.org/3/discover/${
              id || 'movie'
            }?api_key=${API_KEY}&with_genres=${el.id}&page=${el.page}`}
          >
            {el.genre === 'kids' ? `For Kids` : `Best in ${el.genre}`}
          </MoviesColl>
        );
      })}
      {!id && (
        <MoviesColl
          url={`https://api.themoviedb.org/3/keyword/210024/movies?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US&page=5`}
        >
          Best in Animes
        </MoviesColl>
      )}
      <GenreSec></GenreSec>
      <Footer></Footer>
    </div>
  );
}

export default Home;

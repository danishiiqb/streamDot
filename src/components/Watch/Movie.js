import React, { useState } from 'react';
import useAPIMovie from '../../hooks/useAPI';
import Info from './Info';

const API_KEY = `13b3bc960e46a55e92a188b702121bfb`;

function Movie({ children, siz, val, nLoad }) {
  const [load, setLoad] = useState(false);
  const [click, setClick] = useState(false);
  const [data] = useAPIMovie(
    click,
    `https://api.themoviedb.org/3/movie/${children.id}?api_key=${API_KEY}&append_to_response=release_dates`
  );

  return (
    <div
      className={`movie ${click ? 'expand' : ''} ${!load ? 'sd' : ''}`}
      style={{
        width: `calc(${val})`,
      }}
      onMouseEnter={(e) => {
        setClick(true);
      }}
      onMouseLeave={() => {
        setClick(false);
      }}
    >
      {nLoad && (
        <img
          onLoad={() => {
            setLoad(true);
          }}
          style={{ width: `calc(${val})` }}
          src={`http://image.tmdb.org/t/p/w500${children.poster_path}`}
          className='movie__img'
          alt=''
        />
      )}

      {click && data && load && (
        <div className='movie__info'>
          <Info data={data} movie={true}></Info>
        </div>
      )}
    </div>
  );
}

export default Movie;

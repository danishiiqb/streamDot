import React from 'react';
import { useState } from 'react';
import Info from './Info';

function TV({ children, id, nLoad, size, poster, val }) {
  const [click, setClick] = useState(false);
  const [load, setLoad] = useState(false);
  return (
    <div
      style={{ width: `calc(${val})` }}
      className={`movie ${size === 'heightsmall' ? 'movie--1' : ''} ${
        !load ? 'sd' : ''
      } ${click ? 'expand' : ''}`}
      onMouseEnter={(e) => {
        setClick(true);
      }}
      onMouseLeave={() => {
        setClick(false);
      }}
    >
      {nLoad && (
        <img
          src={`http://image.tmdb.org/t/p/w500${
            poster ? children.poster_path : children.backdrop_path
          }`}
          onLoad={() => {
            setLoad(true);
          }}
          style={{ width: `calc(${val})` }}
          className='movie__img'
          alt=''
        />
      )}
      {click && <Info data={children} type={id}></Info>}
    </div>
  );
}

export default TV;

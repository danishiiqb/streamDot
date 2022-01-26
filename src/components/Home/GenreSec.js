import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

import Genre from './Genre';

const arrGenre = [
  { name: 'Action', src: '../imgs/Home/1.webp' },
  { name: 'Drama', src: '../imgs/Home/2.webp' },
  { name: 'Thriller', src: '../imgs/Home/3.webp' },
  { name: 'Comedy', src: '../imgs/Home/4.webp' },
];

function GenreSec() {
  const { siz } = useGlobal();
  return (
    <div
      className='genresec'
      style={{
        width: `calc(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'})`,
      }}
    >
      <h3 className='heading__second'>Popular Genres</h3>
      <div className='genresec__bx'>
        {arrGenre.map((el, idx) => {
          return (
            <Genre key={idx} src={el.src}>
              {el.name}
            </Genre>
          );
        })}
      </div>
    </div>
  );
}

export default GenreSec;

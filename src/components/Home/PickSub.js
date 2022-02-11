import React from 'react';
import useAPIMovie from '../../hooks/useAPI';
import Info from '../Watch/Info';
const API_KEY = `13b3bc960e46a55e92a188b702121bfb`;

function PickSub({ id, dataid, setClick, display }) {
  const [data] = useAPIMovie(
    false,
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=release_dates`
  );
  return (
    <div
      className='picksub'
      onMouseEnter={() => {
        setClick(dataid);
      }}
      onMouseLeave={() => {
        setClick('1e');
      }}
    >
      {data && (
        <>
          <div className={`picksub__box ${display ? 'expand-full' : ''}`}>
            <div className='picksub__img-bx'>
              <img
                src={`http://image.tmdb.org/t/p/original${data.poster_path}`}
                alt=''
              />
            </div>

            <div className={`movie__info `}>
              <Info data={data} picks={true}></Info>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PickSub;

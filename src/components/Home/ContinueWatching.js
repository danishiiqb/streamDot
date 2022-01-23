import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

import { ReactComponent as Left } from '../../images/left.svg';

function ContinueWatching({ user }) {
  const history = useHistory();
  const list = useRef('');
  const bx = useRef('');
  const idx = useRef(0);
  const [shNxt, setShNxt] = useState(true);
  const [shprev, setShprev] = useState(false);
  const { siz } = useGlobal();
  let val = `(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'}) / ${
    siz[0] < 1100 ? 3 : 4
  } - 1.5rem`;
  return (
    <div className='continue'>
      {user.currWatchedMov.length > 0 && (
        <>
          <h3 className='heading__second'>Continue Watching</h3>
          <div
            className='continue__bx-1'
            style={{
              width: `calc(${siz[0]}px - 2 * ${
                siz[0] < 454 ? '2rem' : '4.5rem'
              })`,
            }}
            ref={list}
          >
            <div
              className='continue__btns'
              style={{
                width: `${siz[0]}px`,
                left: `calc(-${siz[0] < 454 ? '2rem' : '4.5rem'})`,
              }}
            >
              <div
                className={`continue__prev 
                  ${!shprev ? 'show4' : ''}`}
                style={{
                  width: `calc(${siz[0] < 454 ? '2rem' : '4.5rem'})`,
                  right: `calc(${siz[0]}px - 2 * ${
                    siz[0] < 454 ? '2rem' : '4.5rem'
                  })`,
                }}
                onClick={() => {
                  if (!shNxt) setShNxt(true);
                  const listw = list.current.offsetWidth;
                  idx.current--;
                  if (idx.current === 0) {
                    setShprev(false);
                  }
                  bx.current.style.transform = `translate(-${
                    listw * idx.current
                  }px)`;
                }}
              >
                <Left fill='white'></Left>
              </div>
              <div
                className={`continue__nxt ${!shNxt ? 'nxt-hide' : ''}`}
                style={{
                  width: `calc(${siz[0] < 454 ? '2rem' : '4.5rem'})`,
                  left: `calc(${siz[0]}px - 2 * ${
                    siz[0] < 454 ? '2rem' : '4.5rem'
                  })`,
                }}
                onClick={() => {
                  if (!shprev) setShprev(true);
                  const listw = list.current.offsetWidth;
                  const bxW = bx.current.offsetWidth;
                  console.log(bxW - listw * idx.current, listw);
                  idx.current++;
                  bx.current.style.transform = `translate(-${
                    listw * idx.current
                  }px)`;

                  if (bxW - listw * idx.current < listw) {
                    setShNxt(false);
                  }
                }}
              >
                <Left fill='white'></Left>
              </div>
            </div>
            <div className='continue__bxs' ref={bx}>
              {user.currWatchedMov.map((mov, key) => {
                return (
                  <div
                    key={key}
                    style={{
                      width: `calc(${val})`,
                    }}
                    className='continue__bx'
                    onClick={() => {
                      const title = mov.title.split(' ').join('-');
                      history.push(`/${mov.paramSub}/${title}/${mov.id}`);
                    }}
                  >
                    <img
                      src={`http://image.tmdb.org/t/p/original${mov.path}`}
                      alt=''
                      className='continue__img'
                    />
                    <div className='continue__head-bx'>
                      <span className='continue__title'>
                        {mov.title?.length > 21
                          ? `${mov.title.substr(0, 21)}..`
                          : mov.title}
                      </span>
                      <span
                        className='continue__timeline'
                        style={{
                          width: `${
                            (mov.minWatched / mov.totalDuration) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContinueWatching;

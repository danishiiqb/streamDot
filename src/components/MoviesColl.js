import React, { useEffect, useRef, useState } from 'react';
import Movie from './Watch/Movie';
import { ReactComponent as Left } from '../images/left.svg';
import TV from './Watch/TV';
import useAPIMovie from '../hooks/useAPI';

import { useGlobal } from '../context/GlobalContext';

function MoviesColl({ children, type, poster, url, recomm, first, size }) {
  const [shNxt, setShNxt] = useState(true);
  const [shprev, setShprev] = useState(false);
  const [data] = useAPIMovie(false, url);
  const list = useRef('');
  const bx = useRef('');
  const idx = useRef(0);
  const [Load, LoadNow] = useState(false);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          LoadNow(true);
        }
      },
      { root: null, threshold: 0.36 }
    )
  );
  const elem = useRef();

  const { siz } = useGlobal();
  let val = `(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'}) / ${
    size === 'heightsmall'
      ? siz[0] < 1100
        ? 3
        : 4
      : siz[0] > 2000
      ? 7
      : siz[0] > 1120
      ? 6
      : siz[0] < 800
      ? 4
      : 5
  } - 1.5rem`;

  useEffect(() => {
    if (!Load) observer.current.observe(elem.current);
    let ele = elem.current;
    return () => {
      observer.current.unobserve(ele);
    };
  }, [Load]);
  // useEffect(() => {
  //   const listw = list.current.offsetWidth;
  //   const bxW = bx.current.offsetWidth;
  //   console.log(listw, bxW - listw * idx.current);

  //   if (bxW - listw * idx.current <= listw) {
  //     setShNxt(false);
  //   }
  // }, []);

  return (
    <div
      ref={elem}
      className={`moviescoll ${recomm ? `moviescoll--1` : ''}  ${
        first ? `top` : ``
      }`}
    >
      <h3 className='heading__second'>{children}</h3>
      <div
        className='moviescoll__list'
        ref={list}
        style={{
          height: `${
            size === 'heightsmall' ? '15vw' : siz[0] < 1000 ? `33vw` : `22.7vw`
          }`,
        }}
      >
        <div className='moviescoll__btns'>
          <div
            className={`moviescoll__prev ${!shprev ? 'show4' : ''}`}
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
            className={`moviescoll__nxt ${!shNxt ? 'nxt-hide' : ''}`}
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
              idx.current++;
              bx.current.style.transform = `translate(-${
                listw * idx.current
              }px)`;
              if (bxW - listw * idx.current <= listw) {
                setShNxt(false);
              }
            }}
          >
            <Left fill='white'></Left>
          </div>
        </div>

        <div className={`moviescoll__bx`} ref={bx}>
          {/* for recommendations */}
          {recomm &&
            Load &&
            recomm.map((el, idx) => {
              return type === 'tv' ? (
                <TV id='tv' siz={siz} nLoad={Load} val={val} key={el.id}>
                  {el}
                </TV>
              ) : (
                <Movie nLoad={Load} siz={siz} val={val} key={el.id}>
                  {el}
                </Movie>
              );
            })}
          {/* for home page */}
          {data &&
            data.results.map((mov, idx) => {
              return type === 'tv' ? (
                <TV
                  siz={siz}
                  nLoad={Load}
                  val={val}
                  poster={poster}
                  size={size}
                  id='tv'
                  key={mov.id}
                >
                  {mov}
                </TV>
              ) : (
                <Movie nLoad={Load} key={mov.id} siz={siz} val={val}>
                  {mov}
                </Movie>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MoviesColl;

import React, { useEffect, useRef, useState } from 'react';
import GenerateImg from './GenerateImg';
import { ReactComponent as Netflixlogo } from '../../images/netflixlogo.svg';
import { ReactComponent as Disnep } from '../../images/disnep.svg';
import { ReactComponent as PrimeVid } from '../../images/primevid.svg';
import { ReactComponent as HboMax } from '../../images/hbomax.svg';
import gsap from 'gsap/gsap-core';

const serviceProviders = [
  {
    name: 'Netflixlogo',
    logo: <Netflixlogo />,
    imgs: [
      '/imgs/Home/posters/netflix/1.webp',
      '/imgs/Home/posters/netflix/2.webp',
      '/imgs/Home/posters/netflix/3.webp',
      '/imgs/Home/posters/netflix/4.webp',
      '/imgs/Home/posters/netflix/5.webp',
      '/imgs/Home/posters/netflix/6.webp',
      '/imgs/Home/posters/netflix/7.webp',
      '/imgs/Home/posters/netflix/8.webp',
    ],
  },
  {
    name: 'HboMax',
    logo: <HboMax />,
    imgs: [
      '/imgs/Home/posters/hbomax/1.webp',
      '/imgs/Home/posters/hbomax/2.webp',
      '/imgs/Home/posters/hbomax/3.webp',
      '/imgs/Home/posters/hbomax/4.webp',
      '/imgs/Home/posters/hbomax/5.webp',
      '/imgs/Home/posters/hbomax/6.webp',
      '/imgs/Home/posters/hbomax/7.webp',
      '/imgs/Home/posters/hbomax/8.webp',
    ],
  },

  {
    name: 'Disnep',
    logo: <Disnep />,
    imgs: [
      '/imgs/Home/posters/disney/1.webp',
      '/imgs/Home/posters/disney/2.webp',
      '/imgs/Home/posters/disney/3.webp',
      '/imgs/Home/posters/disney/4.webp',
      '/imgs/Home/posters/disney/5.webp',
      '/imgs/Home/posters/disney/6.webp',
      '/imgs/Home/posters/disney/7.webp',
      '/imgs/Home/posters/disney/8.webp',
    ],
  },

  {
    name: 'PrimeVid',
    logo: <PrimeVid />,
    imgs: [
      '/imgs/Home/posters/primevid/1.webp',
      '/imgs/Home/posters/primevid/2.webp',
      '/imgs/Home/posters/primevid/3.webp',
      '/imgs/Home/posters/primevid/4.webp',
      '/imgs/Home/posters/primevid/5.webp',
      '/imgs/Home/posters/primevid/6.webp',
      '/imgs/Home/posters/primevid/7.webp',
      '/imgs/Home/posters/primevid/8.webp',
    ],
  },
];
function TvOriginals({ elemref, startTm }) {
  const [curr, setCurr] = useState(0);
  const [load, setLoad] = useState(false);
  const counter = useRef(0);
  useEffect(() => {
    let timer;
    if (load && startTm) {
      timer = setTimeout(() => {
        setCurr((prev) => {
          return prev < serviceProviders.length - 1 ? prev + 1 : 0;
        });
        setLoad(false);
      }, 5400);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [load, startTm]);
  return (
    <section ref={elemref} className='originals mt-6'>
      {' '}
      <h2 className='homepage__header'>All your originals in one place</h2>
      <div className='line'></div>
      <div className='originals__box'>
        <div className='originals__provider'>
          {
            <div className='originals__bx'>
              {serviceProviders.map((el, ind) => {
                return (
                  <div
                    key={ind}
                    className='originals__jk'
                    style={{
                      transform: `translateY(${(ind - curr) * 100}%)`,
                    }}
                  >
                    {el.logo}
                  </div>
                );
              })}
            </div>
          }
        </div>

        <div className={`originals__series `}>
          {serviceProviders[curr].imgs.map((poster, ind) => {
            return (
              <GenerateImg
                key={ind}
                className2={`
                originals__series-poster originals__series-poster--${ind} ${
                  load ? `loaded` : ``
                }`}
                className={`
                originals__series-box originals__series-box--${ind}
                ${load ? 'show' : 'hide'}
                `}
                load={(e) => {
                  if (counter.current === serviceProviders.length - 1) {
                    setLoad(true);
                    counter.current = 0;
                  }
                  counter.current = counter.current + 1;
                }}
              >
                {poster}
              </GenerateImg>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TvOriginals;

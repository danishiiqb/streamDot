import React, { useEffect, useRef, useState } from 'react';
const collection = {
  d: [
    '/imgs/Home/movieCollection/d1.webp',
    '/imgs/Home/movieCollection/d2.webp',
    '/imgs/Home/movieCollection/d3.webp',
    '/imgs/Home/movieCollection/d4.webp',
    '/imgs/Home/movieCollection/d5.webp',
    '/imgs/Home/movieCollection/d6.webp',
    '/imgs/Home/movieCollection/d7.webp',
    '/imgs/Home/movieCollection/d8.webp',
    '/imgs/Home/movieCollection/d9.webp',
    '/imgs/Home/movieCollection/d10.webp',
    '/imgs/Home/movieCollection/d12.webp',
    '/imgs/Home/movieCollection/d13.webp',
    '/imgs/Home/movieCollection/d14.webp',
    '/imgs/Home/movieCollection/d15.webp',
    '/imgs/Home/movieCollection/d16.webp',
  ],
  u: [
    '/imgs/Home/movieCollection/u1.webp',
    '/imgs/Home/movieCollection/u2.webp',
    '/imgs/Home/movieCollection/u3.webp',
    '/imgs/Home/movieCollection/u4.webp',
    '/imgs/Home/movieCollection/u5.webp',
    '/imgs/Home/movieCollection/u6.webp',
    '/imgs/Home/movieCollection/u7.webp',
    '/imgs/Home/movieCollection/u8.webp',
    '/imgs/Home/movieCollection/u9.webp',
    '/imgs/Home/movieCollection/u10.webp',
    '/imgs/Home/movieCollection/u11.webp',
    '/imgs/Home/movieCollection/u12.webp',
    '/imgs/Home/movieCollection/u13.webp',
    '/imgs/Home/movieCollection/u14.webp',
    '/imgs/Home/movieCollection/u15.webp',
    '/imgs/Home/movieCollection/u16.webp',
  ],
};
function MovieCollection() {
  function getArr(value) {
    let [key, val] = Object.entries(collection).find(([key, val], ind) => {
      return key === value;
    });
    return val;
  }
  return (
    <section className='movcollection mt-6'>
      <h2 className='homepage__header'>
        Biggest Collection of blockbuster movies
      </h2>
      <div className='line'></div>
      <div className='movcollection__bx'>
        <div className='movcollection__upper'>
          {getArr('u').map((img, idx) => {
            return (
              <div key={idx} className='movcollection__img-bx'>
                <img src={img} alt='' className='movcollection__img' />
              </div>
            );
          })}
        </div>
        <div className='movcollection__down'>
          {getArr('d').map((img, idx) => {
            return (
              <div key={idx} className='movcollection__img-bx'>
                <img src={img} alt='' className='movcollection__img' />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MovieCollection;

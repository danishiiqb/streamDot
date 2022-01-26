import React from 'react';

function Content({ elemref }) {
  return (
    <section ref={elemref} className='content mt-6'>
      <h2 className='homepage__header'>CONTENT FOR EVERYONE</h2>
      <div className='line line--2'></div>
      <div className='content__bx'>
        <div className='content__img-bx'>
          <img
            src='/imgs/Home/content/1.webp'
            className='content__img'
            alt=''
          />
          <h2 className='content__title'>LATE NIGHT SHOWS</h2>
        </div>
        <div className='content__img-bx'>
          <img
            src='/imgs/Home/content/2.webp'
            className='content__img'
            alt=''
          />
          <h2 className='content__title'>FOR KIDS</h2>
        </div>
        <div className='content__img-bx'>
          <img
            src='/imgs/Home/content/3.webp'
            className='content__img'
            alt=''
          />
          <h2 className='content__title'>LATEST ANIMES</h2>
        </div>
      </div>
    </section>
  );
}

export default Content;

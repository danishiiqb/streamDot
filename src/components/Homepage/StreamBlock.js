import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Laptop } from '../../images/laptop.svg';
import { ReactComponent as Tab } from '../../images/tab.svg';

function StreamBlock({ elemref }) {
  return (
    <section ref={elemref} className='streamAny mt-6'>
      <h2 className='homepage__header'>STREAM ANYWHERE ANYTIME</h2>
      <div className='line line--1'></div>
      <div className='streamAny__box'>
        <div className='streamAny__boxImg'>
          <div className='streamAny__bx streamAny__bx--0'>
            <img
              src='/imgs/Home/stream/img1.png'
              className='streamAny__img'
              alt=''
            />
          </div>
          <div className='streamAny__bx streamAny__bx--1'>
            <img
              src='/imgs/Home/stream/img2.png'
              className='streamAny__img'
              alt=''
            />
          </div>
        </div>
        <div className='streamAny__svgbx'>
          <div className='streamAny__sec-bx'>
            <Laptop className='streamAny__svg'></Laptop>
            <ul className='streamAny__list'>
              <li>Mac OS</li>
              <li>Chrome OS</li> <li>Windows PC</li>
            </ul>
          </div>
          <div className='streamAny__sec-bx streamAny__sec-bx--1'>
            <Tab className='streamAny__svg streamAny__svg--1'></Tab>
            <ul className='streamAny__list'>
              <li>Android Phone & Tablet</li>
              <li>iPhone & iPad</li>
            </ul>
          </div>
        </div>
        <button className='header__cta  header__cta--1'>
          <Link to='/signup' className='header__link'>
            Sign up Now
          </Link>
        </button>
      </div>
    </section>
  );
}

export default StreamBlock;

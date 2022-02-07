import React, { useRef, useState } from 'react';
import Block from './Block';
import { ReactComponent as Left } from '../../images/left.svg';

import { useGlobal } from '../../context/GlobalContext';

function Trailers({ data, setVid, setConRev }) {
  const [showNext, setShNxt] = useState(true);
  const [showPrev, setShPr] = useState(false);
  const list = useRef('');
  const box = useRef('');
  const idx = useRef(0);
  const { siz } = useGlobal();

  let val = `(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'}) / ${
    siz[0] < 900 ? 4 : 5
  } - 1.5rem`;
  return (
    <div className='trailer'>
      <h3 className='heading__second'>Extras</h3>

      <div className='trailer__list' ref={list}>
        <div className='trailer__btns'>
          <div
            className={`trailer__btn trailer__btn--prev ${
              showPrev ? `tr-show` : ''
            }`}
            style={{
              width: `calc(${siz[0] < 454 ? '2rem' : '4.5rem'})`,
              right: `calc(${siz[0]}px - 2 * ${
                siz[0] < 454 ? '2rem' : '4.5rem'
              })`,
            }}
            onClick={(e) => {
              if (!showNext) setShNxt(true);
              let width = list.current.offsetWidth;
              idx.current--;
              if (idx.current === 0) {
                setShPr(false);
              }
              box.current.style.transform = `translate(-${
                idx.current * width
              }px)`;
            }}
          >
            <Left fill='white'></Left>
          </div>
          <div
            className={`trailer__btn trailer__btn--nxt ${
              showNext ? '' : 'hide'
            }`}
            style={{
              width: `calc(${siz[0] < 454 ? '2rem' : '4.5rem'})`,
              left: `calc(${siz[0]}px - 2 * ${
                siz[0] < 454 ? '2rem' : '4.5rem'
              })`,
            }}
            onClick={(e) => {
              if (!showPrev) setShPr(true);
              let width = list.current.offsetWidth;
              idx.current++;
              box.current.style.transform = `translate(-${
                idx.current * width
              }px)`;
              if (box.current.offsetWidth - idx.current * width < 1350) {
                setShNxt(false);
              }
            }}
          >
            <Left fill='white'></Left>
          </div>
        </div>
        <div className='trailer__bx' ref={box}>
          {data.map((el, id) => {
            return (
              <Block
                val={val}
                key={id}
                setVid={setVid}
                setConRev={setConRev}
                id={el.key}
              ></Block>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Trailers;

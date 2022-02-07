import React from 'react';
import { useState } from 'react';
import { ReactComponent as Left } from '../../images/left.svg';
function Reviews({ data }) {
  const [count, setCurrId] = useState(0);
  function getPara(para, lngth) {
    if (para.length > lngth) {
      let start = para.substr(0, lngth + 1);
      return `${start}...`;
    } else {
      return para;
    }
  }

  return (
    <div className='reviews'>
      <h3 className='heading__second'>Reviews</h3>

      <div className='reviews__list'>
        <button
          className='reviews__btn reviews__btn--1'
          onClick={() => {
            setCurrId((prev) => {
              return prev === 0 ? data.length - 1 : prev - 1;
            });
          }}
        >
          <Left></Left>
        </button>
        <button
          className='reviews__btn reviews__btn--2'
          onClick={() => {
            setCurrId((prev) => {
              return prev < data.length - 1 ? prev + 1 : 0;
            });
          }}
        >
          <Left className='right'></Left>
        </button>
        <div className='reviews__bx'>
          {data.map((el, idx) => {
            return (
              <div
                key={idx}
                className={`reviews__box`}
                style={{
                  transform: `translate(${(idx - count) * 100}%)`,
                }}
              >
                <div className='reviews__user-bx'>
                  <div className='reviews__rating-bx'>
                    <div>{el.author}</div>
                    <div className='reviews__rating'>
                      {el.author_details?.rating || 5}/10
                    </div>
                  </div>
                </div>
                <div className='reviews__para'>{getPara(el.content, 600)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Reviews;

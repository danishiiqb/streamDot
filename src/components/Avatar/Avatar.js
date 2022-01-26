import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import imgsJson from '../Avimg.json';

function Avatar({ accSetter }) {
  const [clicked, setClicked] = useState(null);
  const [sec, setsecLoad] = useState(1);
  const imgsArr = useRef(imgsJson);
  const [btns, setbtnsSel] = useState({ gif: false, pic: false, all: true });
  const getArrSec = (num) => {
    return imgsArr.current.slice(0, sec * num);
  };
  const refer = useRef();
  const observer = useRef();
  const lastElemref = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setsecLoad((prev) => {
              return prev + 1;
            });
          }
        },
        { root: refer.current, threshold: 0.8 }
      );
      if (node && imgsArr.current.length - sec * 8 > 0) {
        observer.current.observe(node);
      }
    },
    [sec]
  );
  useEffect(() => {
    gsap.to('.avatar__img-sec-bx', {
      opacity: 1,
      scale: 1,
      stagger: 0.005,
      duration: 0.4777,
      ease: 'bounce.out',
    });
  }, [sec]);

  function selectedElem(e) {
    setbtnsSel((prev) => {
      for (const key in prev) {
        prev[key] = false;
      }
      return { ...prev, [e.target.dataset.type]: true };
    });
    setsecLoad(1);
    setClicked(null);
    accSetter((prev) => {
      return { ...prev, imgAv: null };
    });
    if (e.target.dataset.type === 'all') {
      imgsArr.current = imgsJson;
      return;
    }
    imgsArr.current = imgsJson.filter((el) => {
      return el.img.includes(`${e.target.dataset.type}`);
    });
  }
  return (
    <div className='avatar'>
      <div className='avatar__header'>
        <h4>Choose Avatar</h4>
        <div className='avatar__selector'>
          {Object.entries(btns).map(([btn, val]) => {
            return (
              <button
                data-type={btn}
                className={`avatar__btn avatar__btn--${btn} ${
                  val ? 'select' : ''
                }`}
                onClick={selectedElem}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>

      <div className='avatar__imgs-bx' ref={refer}>
        {getArrSec(8).map((el, idx) => {
          return getArrSec(8).length === idx + 1 ? (
            <div
              key={el.id}
              className={`avatar__img-sec-bx  ${
                clicked === el.id ? `clicked` : ''
              }`}
            >
              <img
                ref={lastElemref}
                src={el.img}
                className='avatar__img bxxx'
                onClick={(e) => {
                  setClicked(el.id);
                  accSetter((prev) => {
                    return { ...prev, imgAv: el.img };
                  });
                }}
                alt=''
              />
            </div>
          ) : (
            <div
              key={el.id}
              className={`avatar__img-sec-bx ${
                clicked === el.id ? `clicked` : ''
              }`}
            >
              <img
                src={el.img}
                className='avatar__img'
                onClick={(e) => {
                  setClicked(el.id);
                  accSetter((prev) => {
                    return { ...prev, imgAv: el.img };
                  });
                }}
                alt=''
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Avatar;

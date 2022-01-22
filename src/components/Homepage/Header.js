import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Nav from './Nav';
import GenerateImg from './GenerateImg';
import { Link } from 'react-router-dom';
const blocks = [
  '/imgs/Home/slides/slide1.webp',
  '/imgs/Home/slides/slide2.webp',
  '/imgs/Home/slides/slide3.webp',
  '/imgs/Home/slides/slide4.webp',
  '/imgs/Home/slides/slide5.webp',
  '/imgs/Home/slides/slide6.webp',
];

function Header() {
  const timeline = useRef(gsap.timeline());
  const imgCount = useRef(0);
  const [imgLoaded, setImgLoader] = useState(false);
  useEffect(() => {
    if (imgLoaded) {
      timeline.current
        .to(`.header__poster-box`, {
          width: '100%',
          stagger: 0.08,
          duration: 0.2,
        })
        .to(`.header__poster-box`, {
          y: 0,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        })
        .to('.header__poster', {
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        })
        .to(
          `.header__poster-box`,
          {
            boxShadow: '0 0 0.7rem #411fd1',
          },
          '<.2'
        )
        .to('.header__heading-parts', {
          y: 0,
          stagger: 0.3,
          duration: 0.466,
          opacity: 1,
          ease: 'power4.out',
        })
        .to('.header__para', { opacity: 1, y: 0, duration: 0.466 })
        .to('.header__cta--2', {
          visibility: 'initial',
          y: 0,
          opacity: 1,
          duration: 0.466,
        });
    }
  }, [imgLoaded]);
  return (
    <header className='header'>
      <Nav include={true}></Nav>
      <div className='header__poster-block'>
        {blocks.map((block, i) => {
          return (
            <GenerateImg
              key={i}
              className={`header__poster-box header__poster-box--${i}`}
              className2={`header__poster header__poster--${i}`}
              load={() => {
                imgCount.current = imgCount.current + 1;
                if (imgCount.current === 6) {
                  setImgLoader(true);
                }
              }}
            >
              {block}
            </GenerateImg>
          );
        })}
      </div>
      <div className='header__title-box'>
        <div className='header__cover'>
          <h1 className='header__heading'>
            <span className='header__heading-parts header__heading-parts--1'>
              WELCOME
            </span>{' '}
            <span className='header__heading-parts header__heading-parts--2'>
              TO
            </span>{' '}
            <span className='header__heading-parts header__heading-parts--3'>
              STREAMDOT
            </span>{' '}
          </h1>
        </div>
        <p className='header__para'>
          Join StreamDot to watch the latest movies, TV shows and Originals from
          different <br /> streaming platforms all in one place
        </p>
        <button className='header__cta header__cta--2'>
          <Link to='/signup' className='header__link'>
            Sign up Now
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;

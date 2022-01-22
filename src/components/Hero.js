import gsap from 'gsap/gsap-core';
import React, { useEffect, useRef } from 'react';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

function Hero() {
  const timeline = useRef(gsap.timeline());
  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);
    let rule = CSSRulePlugin.getRule('.hero::after');
    timeline.current
      .to('.hero__bx', {
        width: '100%',
        scale: 1,
        duration: 0.7,
        stagger: 0.6,
        delay: 0.13,
        ease: 'Bounce.easeOut',
      })
      .to('.hero', { boxShadow: '0 0 1.3rem #411fd1' })
      .to(rule, {
        duration: 0.7,
        cssRule: { backgroundColor: '#08003b', opacity: '.36' },
        ease: 'power2.in',
      });
  }, []);
  return (
    <div className='hero'>
      <div className='hero__bx hero__bx--1'>
        <img
          src='/imgs/signlog/img1.webp'
          alt=''
          className='hero__img hero__img--1'
        />
      </div>
      <div className='hero__bx hero__bx--1'>
        <img
          src='/imgs/signlog/img2.webp'
          alt=''
          className='hero__img hero__img--2'
        />
      </div>
      <div className='hero__bx hero__bx--1'>
        <img
          src='/imgs/signlog/img3.webp'
          alt=''
          className='hero__img hero__img--3'
        />
      </div>
    </div>
  );
}

export default Hero;

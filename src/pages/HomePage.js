import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Accordian from '../components/homepage/Accordian';
import Content from '../components/homepage/Content';
import Email from '../components/homepage/Email';
import Header from '../components/homepage/Header';
import MovieCollection from '../components/homepage/MovieCollection';
import StreamBlock from '../components/homepage/StreamBlock';
import TvOriginals from '../components/homepage/TvOriginals';

function HomePage() {
  const [timer, setTimer] = useState(false);
  const [obs, setUnobserve] = useState(false);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showh');
          if (entry.target.classList.contains('originals')) {
            setTimer(true);
          }
          if (entry.target.classList.contains('content')) {
            setUnobserve(true);
          }
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    )
  );
  const itemRefs = useRef([]);
  useEffect(() => {
    const { current: observeElem } = observer;
    const { current: itemsArr } = itemRefs;
    const newArr = itemsArr.map((el) => {
      return el;
    });
    if (!obs) {
      newArr.forEach((el) => {
        observeElem.observe(el);
      });
    }
    // for unloding
    const unObHandler = () => {
      console.log('unload');
      newArr.forEach((el) => {
        observeElem.unobserve(el);
      });
    };
    window.addEventListener('unload', unObHandler);
    return () => {
      if (!obs) {
        newArr.forEach((el) => {
          observeElem.unobserve(el);
        });
      }
      window.removeEventListener('unload', unObHandler);
    };
  }, [obs]);
  useEffect(() => {
    // for scroll position
    // Browsers tend to jump back to their last scroll position on a reload, which makes sense in many cases. It seems that this automatic jump gets triggered right after the onload event (but we don't know the exact moment when this happens), so it makes sense to either use some delay, or have the browser scroll to the top before the page reloads ;)
    window.history.scrollRestoration = 'manual';
  }, []);
  return (
    <div className='container'>
      <Header></Header>
      <TvOriginals
        elemref={(elem) => {
          itemRefs.current[0] = elem;
        }}
        startTm={timer}
      ></TvOriginals>
      <StreamBlock
        elemref={(elem) => {
          itemRefs.current[1] = elem;
        }}
      ></StreamBlock>
      <Content
        elemref={(elem) => {
          itemRefs.current[2] = elem;
        }}
      ></Content>
      <MovieCollection></MovieCollection>
      <Accordian></Accordian>
      <Email></Email>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;

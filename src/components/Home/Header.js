import React, { useEffect, useRef, useState } from 'react';
import useAPIMovie from '../../hooks/useAPI';
import Nav from '../homepage/Nav';
import { gsap } from 'gsap';
import { ReactComponent as PlayIcon } from '../../images/playbtn.svg';
import { ReactComponent as Add } from '../../images/addsvg.svg';
import { ReactComponent as Left } from '../../images/left.svg';

import { useHistory } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useDb } from '../../context/dbContext';

const API_KEY = `13b3bc960e46a55e92a188b702121bfb`;
function Header({
  user,
  type,
  movieIds = [
    458156, 529485, 530915, 293167, 429617, 581600, 619297, 414906, 580489,
    454626,
  ],
}) {
  const [curridx, setCurridx] = useState(0);
  const [data, setData] = useAPIMovie(
    false,
    `https://api.themoviedb.org/3/${type || `movie`}/${
      movieIds[curridx]
    }?api_key=${API_KEY}&append_to_response=release_dates`
  );

  const { UserSelected, setUserSelected } = useGlobal();
  const { getUserfromdb, updateUidDocs } = useDb();
  const [rest, showRest] = useState(false);
  const [ld, setImgLd] = useState(false);
  const [show, setshow] = useState(false);
  const timeline = useRef();
  const refer = useRef([]);
  const history = useHistory();
  function findRating() {
    const indivRating = data.release_dates.results.find(({ iso_3166_1 }) => {
      return iso_3166_1 === 'US';
    });
    let [rating] = indivRating.release_dates;
    return rating.certification ? rating.certification : '12+';
  }
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if (update) {
      getUserfromdb(UserSelected.connUid).then(([res]) => {
        let connAcc = res.connectedAcc.map((el) => {
          return el.cnid === UserSelected.cnid ? UserSelected : el;
        });
        updateUidDocs(UserSelected.mainDocId, connAcc);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  function getPara(para) {
    if (para.length > 200) {
      let start = para.substr(0, 200);
      return rest ? para : start;
    } else {
      return para;
    }
  }
  function getRuntime(time) {
    let hr = Math.floor(time / 60);
    let min = time % 60;
    return `${hr}h ${min}m`;
  }

  function anime() {
    timeline.current = gsap.timeline({});
    timeline.current
      .to('.header-main__img', {
        scale: 1,
        ease: 'Power3.easeOut',
        duration: 0.6,
        opacity: 1,
      })
      .to('.header-main__overlay-img', { x: 0, opacity: 1 })
      .to(refer.current, {
        y: 0,
        stagger: 0.25,
        opacity: 1,
      })
      .to('.move_up', { y: 0, opacity: 1 })
      .to('.header-main__para', { y: 0, opacity: 1 })
      .to('.header-main__cta', { y: 0, opacity: 1 })
      .to('.header-main__icon', { y: 0, opacity: 1 })
      .to('.header-main__nxttimer', {
        x: 0,
        opacity: 1,
      })
      .to('.header-main__slide-btns', {
        right: '4.5rem',
      })
      .to('.header-main__nxttimer--1', {
        opacity: 1,
        width: '100%',
        duration: 10.9,
      });
    return timeline;
  }
  useEffect(() => {
    if (ld) {
      anime();
    }
    return () => {
      if (ld) {
        timeline.current.seek(0).kill(true);
      }
    };
  }, [ld]);

  useEffect(() => {
    let timeout;
    if (ld) {
      timeout = setTimeout(() => {
        setImgLd(false);
        setCurridx((prev) => {
          return prev < movieIds.length - 1 ? prev + 1 : 0;
        });
      }, 17000);
    }
    return () => {
      if (ld) {
        clearTimeout(timeout);
      }
    };
  }, [ld]);

  function chngeSlide(fn) {
    setCurridx(fn);
  }

  return (
    data && (
      <>
        <div className='header-main__overlay-img'></div>
        <img
          src={`http://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt=''
          className='header-main__img'
          onLoad={() => {
            setImgLd(true);
          }}
        />

        <div className='header-main__bx'>
          <Nav include={false} mainNav={true} user={user}></Nav>
          <div className='header-main__slide-btns'>
            <div
              className='header-main__slide-left'
              onClick={() => {
                setImgLd(false);
                chngeSlide((prev) => {
                  return prev === 0 ? movieIds.length - 1 : prev - 1;
                });
              }}
            >
              <Left fill='white'></Left>
            </div>
            <div
              className='header-main__slide-right'
              onClick={() => {
                setImgLd(false);
                chngeSlide((prev) => {
                  return prev < movieIds.length - 1 ? prev + 1 : 0;
                });
              }}
            >
              <Left fill='white'></Left>
            </div>
          </div>
          <div className='header-main__info'>
            <div className='header-main__categ '>
              <span className='header-main__c move_up'>Movie</span>
              <div className='header-main__bx2 move_up'>
                {type !== 'tv' ? (
                  <span className='header-main__run'>
                    {new Date(data.release_date).getFullYear()} |
                  </span>
                ) : (
                  <span className='header-main__run'>
                    {new Date(data.first_air_date).getFullYear()} |
                  </span>
                )}
                {type !== 'tv' ? (
                  <span className='header-main__run'>
                    {getRuntime(data.runtime)}
                  </span>
                ) : (
                  <span className='header-main__run'>
                    Episodes : {data.number_of_episodes}
                  </span>
                )}
              </div>
            </div>
            <div className='header-main__title-bx'>
              <h1 className='header-main__head '>
                {data[type !== 'tv' ? `title` : `name`]
                  .split(' ')
                  .map((el, key) => {
                    return (
                      <div
                        key={key}
                        className='header-main__ind'
                        ref={(el) => (refer.current[key] = el)}
                      >
                        {el}
                      </div>
                    );
                  })}
              </h1>
            </div>
            <div className='header-main__timebx'>
              <div className='header-main__nxttimer'></div>
              <div className='header-main__nxttimer header-main__nxttimer--1'></div>
            </div>

            <div className='header-main__genres'>
              <div className='move_up'>
                {data.genres.map((el, ind) => {
                  return (
                    <span key={ind} className='header-main__genre'>
                      {el.name} |
                    </span>
                  );
                })}
                {type !== 'tv' ? (
                  <span className='header-main__rating'>{findRating()}</span>
                ) : (
                  <span className='header-main__rating'>
                    {data.origin_country[0] || 'NF'}
                  </span>
                )}
              </div>
            </div>
            <div className='header-main__para-bx'>
              <p className='header-main__para'>
                {getPara(data.overview)}
                <span
                  className='read'
                  onClick={() => {
                    showRest(!rest);
                  }}
                >
                  {!rest ? '...Read More' : ' Read Less'}
                </span>
              </p>
            </div>
            <div className='header-main__btns-bx'>
              <button
                className='header-main__cta'
                onClick={() => {
                  const title = data[type !== 'tv' ? `title` : `name`]
                    .split(' ')
                    .join('-');
                  history.push(
                    `/${!type ? 'movie' : type}/${title}/${movieIds[curridx]}`
                  );
                }}
              >
                Watch Now
                <PlayIcon></PlayIcon>
              </button>
              <div
                className='header-main__icon'
                onClick={() => {
                  let fnd = UserSelected.watchlisthistory.find((el) => {
                    return el.id === data.id;
                  });
                  if (fnd) return;
                  setUserSelected((prev) => {
                    return {
                      ...UserSelected,
                      watchlisthistory: [
                        ...prev.watchlisthistory,
                        {
                          name: data.title || data.name,
                          id: data.id,
                          type: type !== 'tv' ? 'movie' : type,
                          img: data.backdrop_path,
                          vote: data.vote_average,
                        },
                      ],
                    };
                  });
                  setUpdate((prev) => {
                    return prev + 1;
                  });
                }}
              >
                <Add></Add>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Header;

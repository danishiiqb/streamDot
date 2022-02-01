import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as Fav } from '../../images/fav.svg';
import { ReactComponent as ReactLogo } from '../../images/logo.svg';

import { useAuth } from '../../context/AuthContext';

import { ReactComponent as Cross } from '../../images/cross.svg';
import moment from 'moment';

function Nav({ include, mainNav, incBorder = false, user }) {
  const { user: loggedIn } = useAuth();
  const history = useHistory();
  const [inp, setInpData] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modal, openModal] = useState(false);

  const [show, setShow] = useState({ avatar: false, watchlist: false });
  const { signOut } = useAuth();
  const { UserSelected, setUserSelected, setUpdate } = useGlobal();
  const [all, setAll] = useState(null);
  function para(data, count) {
    data = data.split('');
    let sent = '';
    let j = 0;
    for (let i = 0; i < data.length; i++) {
      sent += data[i];
      if (data[i] === '.') {
        if (j === count) {
          break;
        }
        j++;
      }
    }
    return sent;
  }
  useEffect(() => {
    async function getresults(search) {
      try {
        let res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US&page=1&include_adult=false&query=${search}`
        );
        if (!res.ok) throw new Error();
        let data = await res.json();
        setSearchData(
          data.results.length > 0
            ? data.results
                .filter((el) => {
                  return el.media_type === 'movie' || el.media_type === 'tv';
                })
                .slice(0, data.results.length > 6 ? 6 : data.results.length)
            : 'Not Found'
        );
      } catch (err) {
        console.log(err);
      }
    }
    let timer;
    if (inp) {
      timer = setTimeout(() => {
        getresults(inp);
      }, 600);
    } else {
      setSearchData(null);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [inp]);

  let maxLim =
    UserSelected?.watchlisthistory.length < 6
      ? UserSelected.watchlisthistory.length
      : 6;

  function getDays(time) {
    var startDate = time;
    var endDate = moment(new Date().toLocaleDateString(), 'DD.MM.YYYY');
    var passed = endDate.diff(startDate, 'days');

    if (passed === 0) {
      return `Today`;
    }
    if (passed === 30 || passed === 31) {
      return `1 month ago`;
    }
    return `${passed} days ago`;
  }

  return (
    <nav className={`nav ${incBorder ? 'br' : ''}`}>
      {UserSelected?.movHistry?.length > 0 && modal ? (
        <div className={`modal--3 `}>
          <h3 className='heading__second'>Watch History</h3>
          <Cross
            className='close'
            fill='white'
            onClick={() => {
              openModal(false);
            }}
          ></Cross>
          <div className='modal--3__bx'>
            {UserSelected.movHistry.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={`bx ${el.completed ? `Watched` : `Uncomplete`}`}
                >
                  <Cross
                    className='close'
                    onClick={() => {
                      setUserSelected((prev) => {
                        let newDet = prev.movHistry.filter((mov) => {
                          return mov.id !== el.id;
                        });
                        let newWatchHstry = prev.currWatchedMov.filter(
                          (mov) => {
                            return mov.id !== el.id;
                          }
                        );
                        return {
                          ...prev,
                          movHistry: [...newDet],
                          currWatchedMov: [...newWatchHstry],
                        };
                      });
                      setUpdate((prev) => {
                        return prev + 1;
                      });
                    }}
                  ></Cross>
                  <div className='modal--3__img'>
                    <img
                      src={`http://image.tmdb.org/t/p/original${el.path}`}
                      alt=''
                    />
                    <div
                      className='timeline'
                      style={{
                        width: `${(el.minWatched / el.totalDuration) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div
                    className='title-bx'
                    onClick={() => {
                      let title = el.title.split(' ').join('-');
                      history.push(`/${el.paramSub}/${title}/${el.id}`);
                    }}
                  >
                    <div className='title'>
                      <div className='title-1'>{el.title}</div>{' '}
                      <div className='categ'>
                        {el.paramSub === 'movies' ? 'Movie' : el.paramSub}
                      </div>{' '}
                    </div>
                    <div className='para'>{para(el.para, 1)}</div>

                    <div className='time'>Watched {getDays(el.time)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <Link to='/' className='nav__logo--link'>
        <ReactLogo className={`nav__logo`}></ReactLogo>
      </Link>
      {include && (
        <ul className={`nav__nav-links`}>
          <li
            className='nav__nav-link'
            onClick={() => {
              history.push('/login');
            }}
          >
            Sign In
          </li>
          {!loggedIn && (
            <li
              className='nav__nav-link nav__nav-link--btn'
              onClick={() => {
                history.push('/signup');
              }}
            >
              Sign Up
            </li>
          )}
        </ul>
      )}
      {mainNav && (
        <div className={`nav__bx`}>
          <ul className={`nav__nav-links `}>
            <li className='nav__nav-link nav__nav-link--1 nav__nav-link--hov'>
              <Link className='nav__nav-customlink' to='/home/in'>
                HOME
              </Link>
            </li>
            <li className='nav__nav-link nav__nav-link--1 nav__nav-link--hov'>
              <Link className='nav__nav-customlink' to='/home/movie'>
                MOVIES
              </Link>
            </li>
            <li className='nav__nav-link nav__nav-link--1 nav__nav-link--hov'>
              <Link className='nav__nav-customlink' to='/home/tv'>
                SERIES
              </Link>
            </li>{' '}
            {/* <li className='nav__nav-link nav__nav-link--1 nav__nav-link--hov'>
              ANIME
            </li> */}
          </ul>
          <ul className={`nav__nav-links `}>
            <div className='nav__list-bx nav__list-bx--6'>
              <li className='nav__nav-link nav__nav-link--1 nav__nav-link--srch'>
                <div className='nav__inpbx'>
                  <input
                    type='text'
                    placeholder='Search'
                    value={inp}
                    onChange={(e) => {
                      setInpData(e.target.value);
                    }}
                    className={`${open ? 'nav__open' : ''} nav__search-inp`}
                  />
                  <SearchIcon
                    onClick={() => {
                      if (open) {
                        setInpData('');
                      }
                      setOpen(!open);
                    }}
                  ></SearchIcon>
                </div>
              </li>
              {searchData && open && (
                <div className='list list--3'>
                  {searchData !== 'Not Found' ? (
                    searchData.map((el, idx) => {
                      return (
                        <div
                          className='list__bx'
                          key={idx}
                          onClick={() => {
                            let title = el[el.title ? 'title' : 'original_name']
                              .split(' ')
                              .join('-');
                            history.push(`/${el.media_type}/${title}/${el.id}`);
                          }}
                        >
                          <div className='img-2'>
                            <img
                              src={`http://image.tmdb.org/t/p/original${
                                el.backdrop_path || el.poster_path
                              }`}
                              alt=''
                            />
                          </div>
                          <div className='list__names'>
                            <div className='list__name'>
                              {el.title || el.original_name}
                            </div>
                            <div className='list__vt'>
                              <Fav className='svg'></Fav> {el.vote_average}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='list__bx'>Not Found</div>
                  )}
                </div>
              )}
            </div>
            {UserSelected && (
              <>
                {' '}
                <div
                  className='nav__list-bx'
                  onMouseEnter={() => {
                    setShow((prev) => {
                      return { ...prev, watchlist: true };
                    });
                  }}
                  onMouseLeave={() => {
                    setShow((prev) => {
                      return { ...prev, watchlist: false };
                    });
                  }}
                >
                  <li
                    className={`nav__nav-link nav__nav-link--1 nav__nav-link--watch  nav__nav-link--hov `}
                  >
                    WATCHLIST
                  </li>
                  {show.watchlist && (
                    <div className={`list ${maxLim === 6 ? `list--1` : ''}`}>
                      {UserSelected.watchlisthistory
                        .slice(
                          0,
                          all ? UserSelected.watchlisthistory.length : maxLim
                        )
                        .map((el, idx) => {
                          return (
                            <div
                              className='list__bx'
                              key={idx}
                              onClick={() => {
                                let title = el.name.split(' ').join('-');
                                history.push(`/${el.type}/${title}/${el.id}`);
                              }}
                            >
                              <Cross
                                className='close close--1'
                                onClick={() => {
                                  setUserSelected((prev) => {
                                    let newDet = prev.watchlisthistory.filter(
                                      (mov) => {
                                        return mov.id !== el.id;
                                      }
                                    );
                                    return {
                                      ...prev,
                                      watchlisthistory: [...newDet],
                                    };
                                  });
                                  setUpdate((prev) => {
                                    return prev + 1;
                                  });
                                }}
                              ></Cross>
                              <div className='img-2'>
                                <img
                                  src={`http://image.tmdb.org/t/p/original${el.img}`}
                                  alt=''
                                />
                              </div>
                              <div className='list__names'>
                                <div className='list__name'>{el.name}</div>
                                <div className='list__vt'>
                                  <Fav className='svg'></Fav> {el.vote}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {UserSelected.watchlisthistory.length > 6 && (
                        <div
                          className={`list__bx list__bx--2 `}
                          onClick={() => {
                            setAll(!all);
                          }}
                        >
                          {!all ? `Show All` : `Show Less`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className='nav__bx-3'
                  onMouseEnter={() => {
                    setShow((prev) => {
                      return { ...prev, avatar: true };
                    });
                  }}
                  onMouseLeave={() => {
                    setShow((prev) => {
                      return { ...prev, avatar: false };
                    });
                  }}
                >
                  <li className='nav__nav-link nav__nav-link--1 nav__nav-link--b'>
                    {user && (
                      <div className='nav__user'>
                        <img src={user.imgAv} className='nav__img' alt='' />
                      </div>
                    )}
                  </li>
                  {show.avatar && (
                    <div className={`list__bx-3 `}>
                      <div
                        className='list__names'
                        onClick={() => {
                          history.push('/watchDash');
                        }}
                      >
                        Switch Account
                      </div>
                      <div
                        className='list__names'
                        onClick={() => {
                          openModal(!modal);
                        }}
                      >
                        Watch History
                      </div>
                      <div
                        className='list__names'
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Sign Out
                      </div>
                    </div>
                  )}
                </div>{' '}
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
Nav.defaultProps = {
  mainNav: false,
  user: null,
};
export default Nav;

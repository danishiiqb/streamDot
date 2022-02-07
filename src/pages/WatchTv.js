import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Cast from '../components/Watch/Cast';
import Footer from '../components/Footer';
import Nav from '../components/homepage/Nav';
import Info from '../components/Watch/Info';
import MoreInfoBx from '../components/Watch/MoreInfoBx';
import MoviesColl from '../components/MoviesColl';
import Reviews from '../components/Watch/Reviews';
import moment from 'moment';
import Trailers from '../components/Watch/Trailers';
import { useGlobal } from '../context/GlobalContext';
import PlayVid from '../components/Watch/PlayVid';

function WatchTv() {
  const { UserSelected, setUserSelected, setUpdate } = useGlobal();
  const [err, setErr] = useState(false);
  const [conrev, setConrev] = useState(0);
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [pause, setPause] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);

  const [key, setVid] = useState(null);

  useEffect(() => {
    if (pause && !key) {
      setUserSelected((prev) => {
        let watchData = UserSelected.currWatchedMov.map((el) => {
          if (el.id === data.id) {
            el.minWatched = pause;
          }
          return el;
        });
        let movhstry = UserSelected.movHistry.map((el) => {
          if (el.id === data.id) {
            el.minWatched = pause;
          }
          return el;
        });
        return {
          ...prev,
          currWatchedMov: [...watchData],
          movHistry: [...movhstry],
        };
      });
      setUpdate((prev) => {
        return prev + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause]);

  useEffect(() => {
    const [revisit] = UserSelected.currWatchedMov.filter((el) => {
      return el.id === Number(id);
    });
    if (revisit) {
      setConrev(revisit.minWatched);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ended && !key) {
      setUserSelected((prev) => {
        let mvWatch = prev.currWatchedMov.filter((el) => {
          return el.id !== data.id;
        });
        let movHistry = prev.movHistry.map((el) => {
          if (el.id === data.id) {
            el.completed = true;
            el.minWatched = el.totalDuration;
          }
          return el;
        });
        return {
          ...prev,
          currWatchedMov: [...mvWatch],
          movHistry: [...movHistry],
        };
      });
      setUpdate((prev) => {
        return prev + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  useEffect(() => {
    if (duration && !key) {
      let paramSub = window.location.pathname.split('/')[1];
      const currWatchedfnd = UserSelected.currWatchedMov.find((el) => {
        return data.id === el.id;
      });

      const movWatchedfnd = UserSelected.movHistry.find((el) => {
        return data.id === el.id;
      });
      let arr1 = [];
      let arr2 = [];
      if (!currWatchedfnd) {
        arr1 = [
          ...UserSelected.currWatchedMov,
          {
            path: data.backdrop_path,
            title: data.title || data.name,
            id: data.id,
            paramSub,
            minWatched: 6,
            totalDuration: duration,
          },
        ];
      } else {
        arr1 = UserSelected.currWatchedMov;
      }
      if (!movWatchedfnd) {
        arr2 = [
          ...UserSelected.movHistry,
          {
            path: data.backdrop_path,
            title: data.title || data.name,
            id: data.id,
            para: data.overview,
            vote: data.vote_average,
            totalDuration: duration,
            minWatched: 6,
            time: moment().format('L'),
            paramSub,
            completed: false,
          },
        ];
      } else {
        arr2 = UserSelected.movHistry.map((el) => {
          if (el.id === data.id) {
            el.completed = false;
          }
          return el;
        });
      }
      setUserSelected((prev) => {
        return { ...prev, currWatchedMov: arr1, movHistry: arr2 };
      });
      setUpdate((prev) => {
        return prev + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    async function getInfo() {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US&append_to_response=videos,recommendations`
        );
        const credits = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US`
        );
        const rev = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US&page=1`
        );

        if (!data.ok || !credits.ok || !rev.ok) {
          throw new Error();
        }
        const revInf = await rev.json();
        const credInf = await credits.json();
        const dataInf = await data.json();
        const [mainVidKey] = dataInf.videos.results.filter((el) => {
          return el.type === 'Trailer';
        });
        const trailers = dataInf.videos.results.filter((el) => {
          return el.key !== mainVidKey?.key;
        });

        setData({
          ...dataInf,
          mainVidKey: mainVidKey || null,
          trailers,
          ...credInf,
          reviews: revInf.results,
        });
      } catch (err) {
        setErr('Network Err');
      }
    }
    getInfo();
  }, [id]);

  return (
    <div className='container'>
      {data && (
        <>
          <div className='watchtv'>
            <Nav
              include={false}
              incBorder={true}
              mainNav={true}
              user={UserSelected}
            ></Nav>
            <PlayVid
              id={key || data?.mainVidKey?.key || `SMKPKGW083c`}
              setPause={setPause}
              setEnded={setEnded}
              setDuration={setDuration}
              setErr={setErr}
              conrev={conrev}
            ></PlayVid>
          </div>
          <Info data={data} type='tv' show='bg-txt'></Info>
          {data.trailers.length > 0 && (
            <Trailers
              setVid={setVid}
              setConRev={setConrev}
              data={data.trailers}
            ></Trailers>
          )}
          <MoreInfoBx data={data}></MoreInfoBx>
          {data.cast.length > 0 && <Cast data={data.cast.slice(3, 9)}></Cast>}
          {data.reviews.length > 0 && <Reviews data={data.reviews}></Reviews>}
          {data.recommendations.results.length > 0 && (
            <MoviesColl
              type='tv'
              url={false}
              recomm={data.recommendations.results}
            >
              Recommendations
            </MoviesColl>
          )}
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export default WatchTv;

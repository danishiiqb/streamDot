import React from 'react';
import { useHistory } from 'react-router';
import { useGlobal } from '../../context/GlobalContext';
import { ReactComponent as Add } from '../../images/addsvg.svg';
import { ReactComponent as PlayImg } from '../../images/playimg.svg';

function Info({ data, type, show, picks }) {
  const history = useHistory();
  const { UserSelected, setUserSelected, setUpdate } = useGlobal();

  function findRating() {
    const indivRating = data.release_dates.results.find(({ iso_3166_1 }) => {
      return iso_3166_1 === 'US';
    });
    if (indivRating) {
      let [rating] = indivRating.release_dates;
      return rating.certification ? rating.certification : '12+';
    }
    let [rating] = data.release_dates?.results;
    let cert;
    if (rating?.release_dates) {
      cert = rating.release_dates[0];
    }
    return cert ? cert.certification : 'PG';
  }
  function getSub(title, lngth) {
    if (title.length > lngth) {
      return `${title.substr(0, lngth + 1)}..`;
    } else {
      return title;
    }
  }

  function getPara(para, lngth) {
    if (para.length > lngth) {
      let start = para.substr(0, lngth + 1);
      return start;
    } else {
      return para;
    }
  }
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

  function getRuntime(time) {
    let hr = Math.floor(time / 60);
    let min = time % 60;
    return hr === 0 ? `${min}m` : `${hr}h ${min}m`;
  }
  function txt(text) {
    if (show === 'bg-txt') {
      return para(text, 2);
    }
    if (type !== 'tv') {
      return `${picks ? getPara(text, 160) : getPara(text, 100)}...`;
    } else {
      return `${picks ? getPara(text, 160) : getPara(text, 70)}...`;
    }
  }
  return (
    <div className={`info ${show === 'bg-txt' ? `info--1` : ``}`}>
      <div className='info__datetime-bx'>
        <div className='info__date'>
          {type !== 'tv'
            ? new Date(data.release_date).getFullYear()
            : `First Air Date : ${new Date(data.first_air_date).getFullYear()}`}
        </div>
        {type !== 'tv' && (
          <>
            <span> | </span>
            <div className='info__runtime'> {getRuntime(data.runtime)}</div>
          </>
        )}
      </div>
      <h2 className='info__heading'>
        {type !== 'tv' ? getSub(data.title, 50) : getSub(data.name, 15)}
      </h2>
      <div className='info__genre-bx'>
        {type !== 'tv' ? (
          <>
            {data.genres.map((el) => {
              return (
                <span key={el.id} className='info__gen'>
                  {el.name}
                  <span> | </span>
                </span>
              );
            })}
            <span className='info__rating'>{findRating()}</span>
          </>
        ) : (
          <span className='info__rating'>{data.origin_country[0] || 'NF'}</span>
        )}
      </div>
      <p className='info__para'>{txt(data.overview)}</p>
      <div className={`info__btns ${picks ? `info__btns--1` : ``}`}>
        {show !== 'bg-txt' && (
          <div
            className='info__play'
            onClick={() => {
              if (type !== 'tv') {
                let title = data.title.split(' ').join('-');
                history.push(`/movie/${title}/${data.id}`);
                return;
              }
              let title = data.name.split(' ').join('-');
              history.push(`/tv/${title}/${data.id}`);
            }}
          >
            <PlayImg />
          </div>
        )}
        <div
          onClick={() => {
            let fnd = UserSelected?.watchlisthistory.find((el) => {
              return el.id === data.id;
            });
            if (fnd) return;

            setUserSelected((prev) => {
              return {
                ...UserSelected,
                watchlisthistory: [
                  ...prev.watchlisthistory,
                  {
                    name: data.name || data.title,
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
          className={`info__list ${show === 'bg-txt' ? `info__list--1` : ''}`}
        >
          <Add />
        </div>
      </div>
    </div>
  );
}

export default Info;

import React from 'react';
import { useEffect, useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

import { ReactComponent as Dropdown } from '../../images/dropdown.svg';
import Episodes from './Episodes';

function MoreInfoBx({ data, setVid }) {
  const [clicked, setClicked] = useState(false);
  const [currClick, setCurrClick] = useState('Season 1');
  const [inf, setInfoEp] = useState(null);
  const { siz } = useGlobal();
  useEffect(() => {
    async function getSeasons() {
      try {
        const datafetch = await fetch(
          `https://api.themoviedb.org/3/tv/${data.id}/season/${
            currClick.split(' ')[1]
          }?api_key=13b3bc960e46a55e92a188b702121bfb&language=en-US&append_to_response=videos`
        );

        if (!datafetch.ok) {
          throw new Error();
        }
        const dataInf = await datafetch.json();
        setInfoEp({ ...dataInf });
      } catch (err) {
        console.log(err);
      }
    }
    getSeasons();
  }, [currClick]);

  return (
    <div className='moreInfo'>
      <div className={`moreInfo__seasons-bx ${clicked ? `max` : ``}`}>
        <div className={`moreInfo__bx-2 `}>
          <div
            className='moreInfo__txt moreInfo__selected'
            onClick={(e) => {
              setClicked(!clicked);
              setCurrClick(e.target.textContent);
            }}
          >
            {currClick}
          </div>
          <Dropdown></Dropdown>
        </div>

        {data.seasons.length > 1 && (
          <div className='moreInfo__drop'>
            {data.seasons.map((_, key) => {
              if (+currClick.split(' ')[1] === key + 1) {
                return null;
              }
              if (key + 1 === data.seasons.length) {
                return null;
              }
              return (
                <div
                  className='moreInfo__txt'
                  key={key}
                  onClick={(e) => {
                    setClicked(!clicked);
                    setCurrClick(e.target.textContent);
                  }}
                >
                  Season {key + 1}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className='moreInfo__epbx'
        style={{
          width: `calc(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'})`,
        }}
      >
        {inf &&
          inf.episodes.map((ep, id) => {
            return (
              <Episodes
                data={ep}
                vidKey={
                  inf.videos.results.length > 0 && inf.videos.results[0].key
                }
                key={id}
                setVid={setVid}
              ></Episodes>
            );
          })}
      </div>
    </div>
  );
}

export default MoreInfoBx;

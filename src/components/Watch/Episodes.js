import React from 'react';
import { ReactComponent as PlayIcon } from '../../images/play.svg';

function Episodes({ data }) {
  function getDate(data) {
    let date = new Date(data);
    let mnth = date.toLocaleString('default', {
      month: 'short',
    });
    let day = date.getDate();
    let yr = `${date.getFullYear()}`;
    return `${day} ${mnth} ${yr.slice(-2)}`;
  }

  return (
    <div>
      <div className='ep__bx'>
        <img src={`https://image.tmdb.org/t/p/w500${data.still_path}`} alt='' />
        <PlayIcon className='ep__svg'></PlayIcon>
        <div className='ep__inf-bx'>
          <div className='ep__title-bx'>
            <div>E0{data.episode_number}</div>
            <span>:</span>
            <div>{data.name}</div>
          </div>
          <div className='ep__date'>{getDate(data.air_date)}</div>
        </div>
      </div>
    </div>
  );
}

export default Episodes;

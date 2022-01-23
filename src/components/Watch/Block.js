import React, { useState } from 'react';
import { ReactComponent as PlayIcon } from '../../images/play.svg';
import { ReactComponent as Add } from '../../images/addsvg.svg';

function Block({ id, setVid, val, setConRev }) {
  const [hv, setHv] = useState(false);
  return (
    <div
      style={{
        width: `calc(${val})`,
      }}
      onClick={() => {
        setVid(id);
        setConRev(0);
      }}
      className={`block `}
      onMouseEnter={(e) => {
        setHv(true);
      }}
      onMouseLeave={() => {
        setHv(false);
      }}
    >
      {hv && (
        <div className={`overlay-bl `}>
          <div className='add-to'>
            <Add></Add>
            <span>Add to WatchList</span>
          </div>
          <PlayIcon className='sv'></PlayIcon>
        </div>
      )}
      <img src={`http://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt='' />
    </div>
  );
}

export default Block;

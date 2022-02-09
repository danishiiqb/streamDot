import React, { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

function PlayVid({ id, setPause, setEnded, setDuration, conrev, setErr }) {
  const elem = useRef(null);
  return (
    <ReactPlayer
      ref={elem}
      onStart={() => {
        if (conrev) {
          elem.current.seekTo(conrev, 'seconds');
        }
        setDuration(elem.current.getDuration() || 2);
      }}
      playing={true}
      onPause={() => {
        setPause(elem.current.getCurrentTime());
      }}
      onEnded={() => {
        setEnded(true);
      }}
      onError={() => {
        setErr(true);
      }}
      light={true}
      className='vid'
      width='100%'
      height='80%'
      url={`https://www.youtube.com/watch?v=${id}`}
      controls={true}
    />
  );
}

export default PlayVid;

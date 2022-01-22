import React from 'react';

function GenerateImg({ children, className, className2, load, refer }) {
  return (
    <div className={className} ref={refer}>
      <img onLoad={load} src={children} className={className2} alt='' />
    </div>
  );
}

export default GenerateImg;

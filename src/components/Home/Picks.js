import React, { useRef } from 'react';
import { useState } from 'react';
import useWindow from '../../hooks/useWindow';
import PickSub from './PickSub';

function Picks() {
  const [siz] = useWindow();
  const arrMov = useRef([
    { id: '1e', elid: 379686 },
    { id: '2e', elid: 11324 },
    { id: '3e', elid: 374720 },
  ]);
  const [currClick, setCurrClick] = useState(arrMov.current[0].id);
  return (
    <div
      className='picks'
      style={{
        width: `calc(${siz[0]}px - 2 * ${siz[0] < 454 ? '2rem' : '4.5rem'})`,
      }}
    >
      <h3 className='heading__second'>Top Picks of the day</h3>
      <div className='picks__bx'>
        {arrMov.current.map((el, ind) => {
          return (
            <PickSub
              key={ind}
              id={el.elid}
              dataid={el.id}
              setClick={setCurrClick}
              display={el.id === currClick ? true : false}
            ></PickSub>
          );
        })}
      </div>
    </div>
  );
}

export default Picks;

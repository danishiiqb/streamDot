import React, { useState } from 'react';
import { ReactComponent as OpenBtn } from '../../images/openBtn.svg';
import { ReactComponent as CloseBtn } from '../../images/close.svg';

function AccBox({ children, heading }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`box`}>
      <div className='box__inner'>
        <span className='box__text'>{heading}</span>
        <span
          className='box__btn'
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? <OpenBtn></OpenBtn> : <CloseBtn></CloseBtn>}
        </span>
      </div>
      {open && <p className={`box__para ${open ? 'add' : ''}`}>{children}</p>}
    </div>
  );
}

export default AccBox;

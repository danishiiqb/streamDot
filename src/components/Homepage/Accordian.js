import React from 'react';
import AccBox from './AccBox';

function Accordian() {
  return (
    <section className='accordian mt-6'>
      <h2 className='homepage__header'>Frequently Asked Questions</h2>
      <div className='line'></div>
      {/* <img src="/imgs/Home/side@2x.png" alt="" className="img" /> */}
      <div className='accordian__bx'>
        <AccBox heading={'What is STREAMDOT?'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          amet sit ad. Excepturi hic optio quasi et placeat illo sed ullam,
          aspernatur obcaecati quas! Corporis eaque magni rem aut laudantium.
        </AccBox>
        <AccBox heading={'How many ads are on STREAMDOT?'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          amet sit ad. Excepturi hic optio quasi et placeat illo sed ullam,
          aspernatur obcaecati quas! Corporis eaque magni rem aut laudantium.
        </AccBox>{' '}
        <AccBox heading={'Where can i watch?'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          amet sit ad. Excepturi hic optio quasi et placeat illo sed ullam,
          aspernatur obcaecati quas! Corporis eaque magni rem aut laudantium.
        </AccBox>{' '}
        <AccBox heading={'How do I get STREAMDOT?'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          amet sit ad. Excepturi hic optio quasi et placeat illo sed ullam,
          aspernatur obcaecati quas! Corporis eaque magni rem aut laudantium.
        </AccBox>{' '}
        <AccBox heading={'Is STREAMDOT good for Kids?'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          amet sit ad. Excepturi hic optio quasi et placeat illo sed ullam,
          aspernatur obcaecati quas! Corporis eaque magni rem aut laudantium.
        </AccBox>
      </div>
    </section>
  );
}

export default Accordian;

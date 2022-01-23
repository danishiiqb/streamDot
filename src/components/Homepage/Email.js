import React from 'react';

function Email() {
  return (
    <div className='email mt-4'>
      <h3 className='email__heading'>Enter your email to get started</h3>
      <form className='email__frm'>
        <input
          type='email'
          className='email__inp'
          placeholder='Email Address'
        />
        <button type='submit'>Sign Up Now</button>
      </form>
    </div>
  );
}

export default Email;

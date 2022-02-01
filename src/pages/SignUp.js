import React from 'react';
import Hero from '../components/Hero';
import SignUpMain from '../components/SignUp/SignUpMain';

function SignUp() {
  return (
    <div className='container'>
      <SignUpMain></SignUpMain>
      <Hero></Hero>
    </div>
  );
}

export default SignUp;

import React from 'react';
import Hero from '../components/Hero';
import Loginmain from '../components/Login/Loginmain';

function Login() {
  return (
    <div className='container'>
      <Loginmain></Loginmain>
      <Hero></Hero>
    </div>
  );
}

export default Login;

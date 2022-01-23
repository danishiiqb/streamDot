import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as PopcornSv } from '../../images/popcorn.svg';
import Nav from '../homepage/Nav';
import { ReactComponent as GoogleLogo } from '../../images/google.svg';
import { authProvider } from '../../lib/firebase';
import { useDb } from '../../context/dbContext';
import { v4 as uuidv4 } from 'uuid';
import { useGlobal } from '../../context/GlobalContext';
import ProgressBar from '@badrap/bar-of-progress';

function Loginmain() {
  const progress = useRef(new ProgressBar());
  const { login, loginWGoogle } = useAuth();
  const { updateUerInfo, doesUserAlreadyExist } = useDb();
  const { setRoutingNormal, routingNormal, loader } = useGlobal();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState({ st: false, mssg: '' });
  function handleChnge(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setErr({ st: false, mssg: '' });
  }
  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      try {
        await login(email, password);
      } catch (err) {
        setErr({ st: true, mssg: 'The email or password is incorrect' });
      }
    } else {
      setErr({ st: true, mssg: 'Enter All fields' });
    }
  }
  const handleGLogin = async (e) => {
    try {
      loader.current = true;
      const result = await loginWGoogle(authProvider);
      progress.current.start();
      const {
        user: { displayName, email, uid, photoURL },
      } = result;

      if (result) {
        const docs = await doesUserAlreadyExist(uid);
        if (!docs) {
          await updateUerInfo(
            uid,
            email,
            displayName,
            undefined,
            displayName.slice(0, 3).concat(`User${uuidv4().slice(-6)}`),
            photoURL
          );
          progress.current.finish();
          history.push('/watchDash');
        } else {
          progress.current.finish();
          history.push('/watchDash');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return () => {
      loader.current = false;
      setRoutingNormal(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='login'>
      <Nav include={false}></Nav>
      {routingNormal && (
        <>
          <div className='overlay'></div>
        </>
      )}
      <div className='login__box'>
        <div className='login__head login__head--1'>
          <h2 className='homepage__header homepage__header--1'>LOG IN</h2>
          <PopcornSv className='login__icon'></PopcornSv>
        </div>
        <div className='login__google'>
          <button className='btn-gen btn-gen--1' onClick={handleGLogin}>
            <GoogleLogo></GoogleLogo>Log in with Google
          </button>
        </div>
        <div className='login__or'>
          <span className='login__dash'></span>
          <span className='login__sp'>or Login with Email</span>
          <span className='login__dash'></span>
        </div>
        {err.st && <span className='err'>{err.mssg}</span>}
        <form action='#' className='login__form' onSubmit={handleLogin}>
          <div className='login__inp-bx'>
            <input
              type='email'
              placeholder='Email Address'
              className='login__inp'
              name='email'
              onChange={handleChnge}
            />
          </div>
          <div className={`login__inp-bx `}>
            <input
              type='password'
              placeholder='Password'
              className='login__inp'
              name='password'
              onChange={handleChnge}
            />
          </div>
          <button type='submit' className='btn-gen'>
            Log in
          </button>
        </form>
        <span className='redirect'>
          Don't have an account? <Link to='/signup'>Sign up </Link>
        </span>
      </div>
    </div>
  );
}

export default Loginmain;

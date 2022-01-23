import React, { useState, useEffect, useRef } from 'react';
import Nav from '../homepage/Nav';
import { ReactComponent as PopcornSv } from '../../images/popcorn.svg';
import { useAuth } from '../../context/AuthContext';
import { useDb } from '../../context/dbContext';
import { Link, useHistory } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import ProgressBar from '@badrap/bar-of-progress';

function SignUpMain() {
  const progress = useRef(new ProgressBar());
  const { signUp } = useAuth();
  const history = useHistory();
  const { setRoutingNormal, routingNormal, loader } = useGlobal();
  const { updateUerInfo, doesUsernameExists } = useDb();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    date: '',
    userName: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState({ st: false, mssg: '' });
  const [passErr, setPassErr] = useState({
    pass: false,
    confirmPass: false,
    mssg: '',
  });
  function handleChnge(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setDisabled(false);
    setErr(false);
    if (passErr.pass || passErr.confirmPass) {
      setPassErr({ pass: false, confirmPass: false, mssg: '' });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, confirmPass, date, userName } = formData;
    if (!name || !email || !password || !date || !confirmPass || !userName) {
      setErr({ st: true, mssg: 'Enter All the feilds' });
      return;
    }
    setDisabled(true);
    if (
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
    ) {
      setPassErr({
        pass: true,
        confirmPass: false,
        mssg: 'Password must contain at least 8 characters, 1 number,1 lowercase character (a-z),contain at least 1 uppercase character (A-Z)',
      });
      return;
    }
    if (password !== confirmPass) {
      setPassErr({
        pass: false,
        confirmPass: true,
        mssg: 'Password do not match',
      });
      return;
    }

    let UserExistence = await doesUsernameExists(userName);
    loader.current = true;
    if (!UserExistence) {
      try {
        const user = await signUp(email, password);
        progress.current.start();
        await user.user.updateProfile({
          displayName: name,
          photoURL: '/imgs/Avatars/av1.png',
        });
        await updateUerInfo(
          user.user.uid,
          email,
          name,
          date,
          userName,
          user.user.photoURL
        );
        progress.current.finish();
        history.push('/watchDash');
      } catch (err) {
        setErr({ st: true, mssg: err.message });
      }
    } else {
      setErr({ st: true, mssg: 'UserName Exists!! Try Another' });
    }
  }
  useEffect(() => {
    return () => {
      loader.current = false;
      setRoutingNormal(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`signup`}>
      <Nav include={false}></Nav>
      {routingNormal && (
        <>
          <div className='overlay'></div>
        </>
      )}
      <div className='signup__box'>
        <div className='signup__head'>
          <h2 className='homepage__header homepage__header--1'>SIGN UP</h2>
          <PopcornSv className='signup__icon'></PopcornSv>
        </div>
        {err.st && <span className='err'>{err.mssg}</span>}
        <form action='#' className='signup__form' onSubmit={handleSubmit}>
          <div className='signup__inp-bx'>
            <input
              type='text'
              placeholder='First Name'
              className='signup__inp'
              name='name'
              value={formData.name}
              onChange={handleChnge}
            />
          </div>
          <div className='signup__inp-bx'>
            <input
              type='text'
              placeholder='UserName'
              className='signup__inp'
              value={formData.userName}
              name='userName'
              onChange={handleChnge}
            />
          </div>
          <div className='signup__inp-bx'>
            <input
              type='email'
              placeholder='Email Address'
              className='signup__inp'
              value={formData.email}
              name='email'
              onChange={handleChnge}
            />
          </div>
          <div className={`signup__inp-bx ${passErr.pass ? 'show' : ''}`}>
            <input
              type='password'
              placeholder='Password'
              className='signup__inp'
              name='password'
              value={formData.password}
              onChange={handleChnge}
            />
            {passErr.pass && <span className='err'>{passErr.mssg}</span>}
          </div>
          <div
            className={`signup__inp-bx ${passErr.confirmPass ? 'show' : ''}`}
          >
            <input
              type='password'
              placeholder='Confirm Password'
              className='signup__inp'
              name='confirmPass'
              value={formData.confirmPass}
              onChange={handleChnge}
            />
            {passErr.confirmPass && <span className='err'>{passErr.mssg}</span>}
          </div>
          <div className='signup__inp-bx'>
            <input
              type='date'
              className='signup__date'
              name='date'
              value={formData.date}
              onChange={handleChnge}
            />
          </div>
          <button
            type='submit'
            disabled={disabled}
            className={`btn-gen ${disabled ? 'fadecol' : ''}`}
          >
            Sign Up
          </button>
        </form>
        <span className='redirect'>
          Already have an account? <Link to='/login'>Log In </Link>
        </span>
      </div>
    </div>
  );
}

export default SignUpMain;

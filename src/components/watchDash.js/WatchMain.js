import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDb } from '../../context/dbContext';
import { auth } from '../../lib/firebase';
import Nav from '../homepage/Nav';
import { ReactComponent as ModClose } from '../../images/modClose.svg';
import { gsap } from 'gsap';
import Avatar from '../Avatar/Avatar';
import { v4 as uuidv4 } from 'uuid';
import WatchDashBx from './WatchDashBx';

function WatchMain() {
  const { getUserfromdb, updateDocs } = useDb();
  const [err, setErr] = useState({ err: false, mssg: '' });
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [elemRef, setElemRef] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currclick, setcurrClick] = useState(null);
  const [type, setType] = useState(null);
  const [newAccData, setAccData] = useState({
    email: '',
    userName: '',
    imgAv: '',
  });
  const [disableBtn, setdisableBtn] = useState(false);

  useEffect(() => {
    async function currUserData() {
      try {
        const [data] = await getUserfromdb(user.uid);
        setUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    }
    currUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (elemRef) {
      gsap.to(elemRef, { scale: 1, ease: 'back.out(1.7)', duration: 0.4 });
    }
  }, [elemRef]);
  function openHndler(typ) {
    setType(typ);
    setClicked(true);
  }
  function closeHandler() {
    setClicked(false);
    setErr({ err: false, mssg: '' });
    setType(null);
    setdisableBtn(false);
    setAccData({
      email: '',
      userName: '',
      imgAv: '',
    });
  }

  function chngeHndler(e) {
    setErr({ err: false, mssg: '' });
    setAccData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function sbmitHndler() {
    const { userName, email, imgAv } = newAccData;
    if (!userName || !email || !imgAv) {
      setErr({ err: true, mssg: 'Enter All fields' });
      return;
    }
    if (email !== userInfo.email) {
      setErr({ err: true, mssg: 'Email doesnt match' });
      return;
    }
    let info = userInfo.connectedAcc.filter((el) => {
      return el.userName === userName;
    });
    if (info.length > 0) {
      setErr({ err: true, mssg: 'UserName Exists' });
      return;
    }
    setdisableBtn(true);
    updateDocs(userInfo.docId, {
      ...newAccData,
      type,
      cnid: uuidv4(),
      connUid: userInfo.uid,
      currWatchedMov: [],
      movHistry: [],
      mainDocId: userInfo.docId,
      watchlisthistory: [],
    })
      .then(() => {
        return getUserfromdb(user.uid);
      })
      .then(([res]) => {
        setUserInfo(res);
        closeHandler();
      })
      .catch((err) => {
        setErr({ err: true, mssg: err.mssg });
      });
  }

  return (
    <div className='watchDash'>
      {clicked && (
        <>
          <div className='overlay'></div>
          <div className='mdl' ref={setElemRef}>
            <h3>Add User</h3>
            <button className='mdl__btn' onClick={closeHandler}>
              <ModClose fill='white' />
            </button>
            <div className='mdl__box'>
              {err.err && <span className='error'>{err.mssg}</span>}
              <input
                type='text'
                className={`mdl__inp`}
                placeholder='UserName'
                name='userName'
                onChange={chngeHndler}
              />
              <input
                type='email'
                className={`mdl__inp`}
                placeholder='Your Email'
                name='email'
                onChange={chngeHndler}
              />
              <Avatar accSetter={setAccData}></Avatar>
              <button
                className={`btn-gen btn-gen--4 ${disableBtn ? 'btn-dis' : ''}`}
                disabled={disableBtn}
                onClick={sbmitHndler}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      <Nav include={false}></Nav>
      <div className='watchDash__box'>
        {userInfo ? (
          <>
            <h2 className='homepage__header homepage__header--1'>
              Who is Watching?
            </h2>
            <div className='watchDash__box-1'>
              {userInfo.connectedAcc.length > 0 &&
                userInfo.connectedAcc.map((el, idx) => {
                  return (
                    <WatchDashBx
                      key={idx}
                      userInfo={el}
                      id={el.cnid}
                      connAcc={true}
                      cl={currclick}
                      stcl={setcurrClick}
                      type={el.type}
                    ></WatchDashBx>
                  );
                })}
            </div>

            <div className='watchDash__btns'>
              <button
                onClick={() => {
                  openHndler('adult');
                }}
                className={`btn-gen btn-gen--3`}
              >
                Add Adult
              </button>
              <button
                onClick={() => {
                  openHndler('kid');
                }}
                className={`btn-gen btn-gen--3`}
              >
                Add Kid
              </button>
            </div>
            <span className='watchDash__manage'>Manage Profiles</span>
          </>
        ) : (
          <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchMain;

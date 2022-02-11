import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useWindow from '../hooks/useWindow';
import { useDb } from './dbContext';

const GlobalCntxt = createContext(null);
const useGlobal = () => {
  return useContext(GlobalCntxt);
};

const GlobalCntxtProvider = ({ children }) => {
  const loader = useRef(false);
  const { getUserfromdb, updateUidDocs } = useDb();
  const [update, setUpdate] = useState(0);
  const [UserSelected, setUserSelected] = useState(
    JSON.parse(localStorage.getItem('currMainUser'))
  );
  const [routingNormal, setRoutingNormal] = useState(false);
  const [siz] = useWindow();
  useEffect(() => {
    if (UserSelected) {
      localStorage.setItem('currMainUser', JSON.stringify(UserSelected));
    }
  }, [UserSelected]);

  useEffect(() => {
    if (update) {
      getUserfromdb(UserSelected.connUid).then(([res]) => {
        let connAcc = res.connectedAcc.map((el) => {
          return el.cnid === UserSelected.cnid ? UserSelected : el;
        });
        updateUidDocs(UserSelected.mainDocId, connAcc);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const gb = {
    loader,
    routingNormal,
    setRoutingNormal,
    UserSelected,
    setUserSelected,
    setUpdate,
    siz,
  };
  return <GlobalCntxt.Provider value={gb}>{children}</GlobalCntxt.Provider>;
};

export { GlobalCntxtProvider, useGlobal };

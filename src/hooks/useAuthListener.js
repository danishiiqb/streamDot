import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalContext';

function useAuthListener(auth) {
  const { loader, setRoutingNormal } = useGlobal();
  const [user, setCurrUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (loader.current) {
          setRoutingNormal(true);
        }
        localStorage.setItem('user', JSON.stringify(authUser));
        setCurrUser(authUser);
      } else {
        localStorage.removeItem('user', authUser);
        setCurrUser(null);
      }
    });
    return listener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return [user];
}

export default useAuthListener;

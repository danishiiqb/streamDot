import { useCallback, useEffect, useState } from 'react';

function useWindow() {
  const [siz, setSize] = useState([0, 0]);
  let debounce = useCallback((fn, time) => {
    let timer;
    return (e) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(e);
      }, time);
    };
  }, []);
  function update(e) {
    setSize([window.innerWidth, window.innerHeight]);
  }
  useEffect(() => {
    setSize([document.documentElement.clientWidth, 0]);
    window.addEventListener('resize', debounce(update, 800));
    return () => {
      window.removeEventListener('scroll', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [siz];
}
export default useWindow;

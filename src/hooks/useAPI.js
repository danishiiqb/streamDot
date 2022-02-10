import { useEffect, useState } from 'react';

const useAPIMovie = (click, url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error();
        }
        const jsonData = await result.json();
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    }
    if (url && !click) {
      getData();
    }
  }, [url, click]);
  return [data, setData];
};
export default useAPIMovie;

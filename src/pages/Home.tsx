import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [ data, setData ] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/getTopic');
      setData(data);
    })();
  }, [])
  return (
    <div>
      HOME
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}

export default Home;

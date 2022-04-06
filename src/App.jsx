import { useEffect, useState } from 'react';
import Controls from './components/Controls';
import Spectator from './components/Spectator';

function App() {
  const [spectate, setSpectate] = useState('');

  useEffect(() => {
    const {
      location: { search },
    } = window;

    const url = new URLSearchParams(search);

    const spec = url.get('spectate');
    if (spec !== '') {
      setSpectate(spec);
    }
  }, []);

  let comp;
  if (spectate !== '') {
    comp = <Spectator url={spectate} />;
  } else {
    comp = <Controls />;
  }

  return comp;
}

export default App;

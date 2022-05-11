import Controls from './components/Controls';
import Spectator from './components/Spectator';

function App() {
  const {
    location: { search },
  } = window;

  const url = new URLSearchParams(search);
  const screen = url.get('screen');
  let comp;

  if (screen === 'spectator') {
    comp = <Spectator url="" />;
  } else {
    comp = <Controls />;
  }

  return comp;
}

export default App;

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMatch, removeMatchById, updateMatchById } from '../../redux/features/matches';
import { Button, FlexCenter } from '../ui-kit';
import Game from './Game';
import Options from './Options';

function Controls() {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.matches.urls);

  const handleAdd = useCallback(
    (url) => {
      dispatch(addMatch({ url }));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeMatchById({ id }));
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    (id, url) => {
      dispatch(updateMatchById({ id, url }));
    },
    [dispatch],
  );

  const handleSpectate = useCallback((url) => {
    window.spectate.setSpectatorUrl(url);
  }, []);

  const reopenSpectator = useCallback(() => {
    window.spectate.openSpectatorWindow();
  }, []);

  return (
    <FlexCenter>
      {urls.map((game) => (
        <Game
          key={game.id}
          id={game.id}
          url={game.url}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          onSpectate={handleSpectate}
        />
      ))}
      <Game onAdd={handleAdd} />
      <Options />
      <Button className="w-60" onClick={reopenSpectator}>
        Open spectator
      </Button>
    </FlexCenter>
  );
}

export default Controls;

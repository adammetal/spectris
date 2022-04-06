import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexCenter } from '../ui-kit';
import Game from './Game';
import { addMatch, removeMatchById, updateMatchById } from '../../redux/features/matches';

function Controls() {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.matches.urls);

  const handleAdd = useCallback(
    (url) => {
      dispatch(addMatch({ url }));
    },
    [dispatch, addMatch],
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeMatchById({ id }));
    },
    [dispatch, removeMatchById],
  );

  const handleUpdate = useCallback(
    (id, url) => {
      dispatch(updateMatchById({ id, url }));
    },
    [dispatch, updateMatchById],
  );

  const handleSpectate = useCallback((url) => {
    window.controls.createWindow(url);
  });

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
    </FlexCenter>
  );
}

export default Controls;

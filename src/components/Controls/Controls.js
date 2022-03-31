import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, FlexCenter } from "../ui-kit";
import Game from "./Game";
import {
  addMatch,
  removeMatchById,
  updateMatchById,
} from "../../redux/features/matches";

const Controls = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.matches.urls);

  const handleAdd = useCallback(
    (url) => {
      dispatch(addMatch({ url }));
    },
    [dispatch, addMatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeMatchById({ id }));
    },
    [dispatch, removeMatchById]
  );

  const handleUpdate = useCallback(
    (id, url) => {
      dispatch(updateMatchById({ id, url }));
    },
    [dispatch, updateMatchById]
  );

  return (
    <FlexCenter>
      {urls.map((game) => {
        return (
          <Game
            key={game.id}
            id={game.id}
            url={game.url}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        );
      })}
      <Game onAdd={handleAdd} />
      <FlexCenter row>
        <Button>Clear All</Button>
      </FlexCenter>
    </FlexCenter>
  );
};

export default Controls;

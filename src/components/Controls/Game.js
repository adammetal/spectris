import { Button, FlexCenter, Input } from "../ui-kit";
import { useEffect, useState } from "react";

const Game = ({ id, url, onRemove, onAdd, onUpdate, onSpectate }) => {
  const [value, setValue] = useState(url);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (value !== url) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [value, url]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handleSpectate = () => {
    onSpectate(id);
  };

  const handleAdd = () => {
    onAdd(value);
    setValue("");
  };

  const handleUpdate = () => {
    onUpdate(id, value);
  };

  const hasId = id !== null;

  return (
    <FlexCenter row>
      <Input
        id="source"
        placeholder="Game url"
        value={value}
        onChange={handleChange}
      />
      <Button disabled={!changed} onClick={hasId ? handleUpdate : handleAdd}>
        {hasId ? "Update" : "Add"}
      </Button>
      <Button onClick={handleSpectate} disabled={!hasId}>
        Spectate
      </Button>
      <Button onClick={handleRemove} disabled={!hasId}>
        Remove
      </Button>
    </FlexCenter>
  );
};

Game.defaultProps = {
  id: null,
  url: "",
  onRemove: () => {},
  onAdd: () => {},
  onUpdate: () => {},
  onSpectate: () => {},
};

export default Game;
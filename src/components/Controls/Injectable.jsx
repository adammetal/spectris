import PropTypes from 'prop-types';
import { Button } from '../ui-kit';

function Injectable({ file, onRemove }) {
  const name = file?.split('/')?.at(-1);

  return (
    <div className="bg-blue-600 text-yellow-50 p-2 flex justify-between items-baseline gap-2">
      <div className="text-[1rem]">{name}</div>
      <Button w="w-12" p="p-auto" onClick={() => onRemove(file)}>
        ✖
      </Button>
    </div>
  );
}

Injectable.propTypes = {
  file: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Injectable;

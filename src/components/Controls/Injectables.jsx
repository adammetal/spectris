import PropTypes from 'prop-types';
import { Panel, Button } from '../ui-kit';
import Injectable from './Injectable';

function Injectables({ files, title, hint, onSelectNew }) {
  return (
    <Panel title={title}>
      <p className="mb-2 p-2 bg-blue-400">{hint}</p>
      {files.map((f) => (
        <Injectable file={f} key={f} />
      ))}
      <div className="mt-4">
        <Button onClick={onSelectNew} w="w-auto">
          Add new css file
        </Button>
      </div>
    </Panel>
  );
}

Injectables.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  onSelectNew: PropTypes.func.isRequired,
};

export default Injectables;

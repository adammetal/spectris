import PropTypes from 'prop-types';

function FlexCenter({ children, row }) {
  return (
    <div className={`flex ${row ? 'flex-row' : 'flex-col'} justify-center items-center gap-2 p-2`}>
      {children}
    </div>
  );
}

FlexCenter.propTypes = {
  children: PropTypes.node.isRequired,
  row: PropTypes.bool,
};

FlexCenter.defaultProps = {
  row: false,
};

export default FlexCenter;

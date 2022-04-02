/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

function Button({ children, ...rest }) {
  return (
    <button
      type="button"
      className={`border-2 w-24 p-2 border-cyan-600 ${rest.disabled ? 'opacity-50' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;

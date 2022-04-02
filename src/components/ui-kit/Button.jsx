/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

function Button({ children, ...rest }) {
  return (
    <button
      type="button"
      className={`border-6 border-ridge w-24 p-2 underline bg-indigo-100 border-gray-400 ${
        rest.disabled ? 'opacity-50' : ''
      }`}
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

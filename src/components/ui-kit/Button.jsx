/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={`${className} text-lg border-2 rounded-md border-green-400 w-32 p-4 bg-black text-white ${
        rest.disabled ? 'opacity-50' : 'hover:bg-blue-800'
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;

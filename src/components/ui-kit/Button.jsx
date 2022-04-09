/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

function Button({ children, w, p, className, ...rest }) {
  return (
    <button
      type="button"
      className={`${className} text-lg border-2 rounded-md border-green-400 ${w} ${p} bg-black text-white ${
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
  w: PropTypes.string,
  p: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  w: 'w-32',
  p: 'p-4',
};

export default Button;

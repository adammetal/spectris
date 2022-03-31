const Button = ({ children, ...rest }) => (
  <button
    className={`border-2 w-24 p-2 border-cyan-600 ${
      rest.disabled ? "opacity-50" : ""
    }`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;

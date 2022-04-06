/* eslint-disable react/jsx-props-no-spreading */

function Input(props) {
  return (
    <input
      {...props}
      className="outline-none p-4 text-lg border-2 bg-gray-900 text-gray-50 border-green-400 w-80"
    />
  );
}

export default Input;

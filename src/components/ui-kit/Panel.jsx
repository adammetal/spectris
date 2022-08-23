import PropTypes from 'prop-types';

function Panel({ children, title }) {
  return (
    <div className="bg-blue-200 shadow-xl text-black border-4 border-pink-500 rounded-lg w-6/12">
      <div className="pl-2 bg-pink-400 text-white text-[1.5rem]">{title}</div>
      <div className="p-2">{children}</div>
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Panel;

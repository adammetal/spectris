const FlexCenter = ({ children, row = false }) => (
  <div
    className={`flex ${
      row ? "flex-row" : "flex-col"
    } justify-center items-center gap-2 p-2`}
  >
    {children}
  </div>
);

export default FlexCenter;

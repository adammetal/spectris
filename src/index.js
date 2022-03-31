import { render } from "react-dom";
import { StrictMode } from "react";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.querySelector("#root")
);

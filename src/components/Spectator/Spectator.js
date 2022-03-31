import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Spectator = ({ url }) => {
  const webv = useRef();

  useEffect(() => {
    const { current } = webv;

    const onReady = async () => {
      const [js, css] = await Promise.all([
        window.spectate.loadSpectateScript(),
        window.spectate.loadSpectateCss(),
      ]);

      current.insertCSS(css);
      current.executeJavaScript(js);
    };

    current?.addEventListener("dom-ready", onReady);

    return () => {
      current?.removeEventListener("dom-ready", onReady);
    };
  }, [url]);

  return <webview className="inline-flex w-full h-full" ref={webv} src={url} />;
};

Spectator.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Spectator;

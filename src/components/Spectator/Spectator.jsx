import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Spectator({ url }) {
  const { css, js } = useSelector((state) => state.injector);
  const loading = useRef(true);
  const webv = useRef();

  useEffect(() => {
    const { current } = webv;

    if (!loading.current) {
      return () => {};
    }

    const onReady = async () => {
      const loadJsFiles = Promise.all(js.map((file) => window.spectate.loadSpectateScript(file)));
      const loadCssFiles = Promise.all(css.map((file) => window.spectate.loadSpectateCss(file)));

      const [jsCodes, cssCodes] = await Promise.all([loadJsFiles, loadCssFiles]);

      cssCodes.map((code) => current.insertCSS(code));
      jsCodes.map((code) => current.executeJavaScript(code));

      loading.current = false;
    };

    current?.addEventListener('dom-ready', onReady);

    return () => {
      current?.removeEventListener('dom-ready', onReady);
    };
  }, [css, js, url, loading]);

  return <webview className="inline-flex w-full h-full" ref={webv} src={url} />;
}

Spectator.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Spectator;

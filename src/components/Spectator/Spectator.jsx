import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Spectator() {
  const [url, setUrl] = useState('');
  const { css, js } = useSelector((state) => state.injector);
  const webv = useRef();

  useEffect(() => {
    const onSetUrl = (e, newUrl) => {
      setUrl(newUrl);
    };

    const off = window.spectate.onSetSpectatorUrl(onSetUrl);

    return off;
  }, []);

  useEffect(() => {
    if (url.length) {
      webv.current.loadURL(url);
    }
  }, [url]);

  useEffect(() => {
    const { current } = webv;

    const onReady = async () => {
      const loadJsFiles = Promise.all(js.map((file) => window.spectate.loadSpectateScript(file)));
      const loadCssFiles = Promise.all(css.map((file) => window.spectate.loadSpectateCss(file)));

      const [jsCodes, cssCodes] = await Promise.all([loadJsFiles, loadCssFiles]);

      cssCodes.map((code) => current.insertCSS(code));
      jsCodes.map((code) => current.executeJavaScript(code));
    };

    current?.addEventListener('dom-ready', onReady);

    return () => {
      current?.removeEventListener('dom-ready', onReady);
    };
  }, [css, js]);

  return (
    <>
      {!url && (
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-black text-white">
          <h1>Wait for url...</h1>
        </div>
      )}
      <webview
        className="inline-flex w-full h-full"
        ref={webv}
        src="https://jstris.jezevec10.com/"
      />
    </>
  );
}

export default Spectator;

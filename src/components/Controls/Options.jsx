import { useDispatch, useSelector } from 'react-redux';
import Injectables from './Injectables';
import { addCss, addJs } from '../../redux/features/injector';

function Options() {
  const { css, js } = useSelector((state) => state.injector);
  const dispatch = useDispatch();

  const handleSelectCssFile = async () => {
    const { filePaths } = await window.spectate.selectInjectableCss();
    if (filePaths && filePaths.length) {
      dispatch(addCss({ file: filePaths[0] }));
    }
  };

  const handleSelectJsFile = async () => {
    const { filePaths } = await window.spectate.selectInjectableJs();
    if (filePaths && filePaths.length) {
      dispatch(addJs({ file: filePaths[0] }));
    }
  };

  return (
    <div className="flex gap-4 w-8/12">
      <Injectables
        files={css}
        title="Extra Css styles"
        onSelectNew={handleSelectCssFile}
        hint="When the inspector opens, you can inject extra css files. They will applied to the inspected game."
      />
      <Injectables
        files={js}
        title="Extra JavaScript codes"
        onSelectNew={handleSelectJsFile}
        hint="When the inspector opens, you can inject extra javascript files. The scripts will start runnig shortly after the inspector loads the game."
      />
    </div>
  );
}

export default Options;

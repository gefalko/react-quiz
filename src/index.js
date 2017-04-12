import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { overrideComponentTypeChecker } from 'react-toolbox';
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import App from './components/App'

const rootEl = document.getElementById('app');

const render = () => {
  ReactDOM.render(
        <App/>
    ,rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  overrideComponentTypeChecker((classType, reactElement) => (
    reactElement && (
      reactElement.type === classType
      || reactElement.type.name === classType.displayName
    )
  ));
  if (module.hot) {
    module.hot.accept('./components/App', render);
  }
}

render();


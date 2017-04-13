import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { overrideComponentTypeChecker } from 'react-toolbox';
import { Button } from 'react-toolbox/lib/button';
import App from './components/App'

const rootEl = document.getElementById('app');

const render = () => {
  ReactDOM.render(
        <App/>
    ,rootEl
  );
};

render();


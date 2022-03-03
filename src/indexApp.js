import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './routes/App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import ScormProvider from './lib/index';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ScormProvider  version="2004" debug={process.env.NODE_ENV !== 'production'}>
        <App />
      </ScormProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

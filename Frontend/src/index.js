import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from '../src/App1';
// import App from '../src/props/App2';
// import App from '../src/Counter/App3';
// import App from '../src/Todo/App4';
// import App from '../src/ComponentComposition/App5';
import App from '../src/Form/App6';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TweetsComponent } from './tweets/components';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
}

const tweetsEl = document.getElementById('Dysen');
if (tweetsEl) {
  console.log(tweetsEl.dataset);
  ReactDOM.render(<TweetsComponent />, tweetsEl);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

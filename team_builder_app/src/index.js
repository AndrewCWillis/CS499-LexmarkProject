import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* https://github.com/remix-run/react-router/blob/9e386f50bc6830ca5aa06e2fd475221ec3211875/examples/basic/src/main.tsx#L10 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
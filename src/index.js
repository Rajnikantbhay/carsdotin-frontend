import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from 'bootstrap';
import { Provider } from './ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
        <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();

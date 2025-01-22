import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import  bootstrap from 'bootstrap';
import { CookiesProvider } from 'react-cookie';  
import { Provider } from 'react-redux';
import videoStore from './components/store/videoStore';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={videoStore}>
  <React.StrictMode>
    <CookiesProvider>
    <App />
    </CookiesProvider>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

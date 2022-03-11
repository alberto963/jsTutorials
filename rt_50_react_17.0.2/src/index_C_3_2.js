import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './C_AdvancedGuide_3_Context/2_BeforeYouUseContext/App';
import AppFC from './C_AdvancedGuide_3_Context/2_BeforeYouUseContext/AppFC';
import AppIOC from './C_AdvancedGuide_3_Context/2_BeforeYouUseContext/AppIOC';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppIOC user='logo512.png' size={75} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

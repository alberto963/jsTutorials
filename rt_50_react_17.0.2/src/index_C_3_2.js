import React from 'react';
import { render, StrictMode } from 'react-dom';
import 'index.css';
import AppCC from 'C_AdvancedGuide_3_Context/2_BeforeYouUseContext/1_AppCC';
import AppFC from 'C_AdvancedGuide_3_Context/2_BeforeYouUseContext/2_AppFC';
import AppIOC from 'C_AdvancedGuide_3_Context/2_BeforeYouUseContext/3_AppIOC';
import reportWebVitals from 'reportWebVitals';

render(
  <StrictMode>
    <AppCC user='logo512.png' size={75} />
  </StrictMode>,
  document.getElementById('root2')
);

render(
  <StrictMode>
    <AppFC user='logo512.png' size={75} />
  </StrictMode>,
  document.getElementById('root1')
);

render(
  <StrictMode>
    <AppIOC user='logo512.png' size={75} />
  </StrictMode>,
  document.getElementById('root0')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

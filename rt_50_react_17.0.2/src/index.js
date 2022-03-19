import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import AppNoContext from './C_AdvancedGuide_3_Context/1_WhenToUseContext/1_AppNoContext';
import AppWithContext from './C_AdvancedGuide_3_Context/1_WhenToUseContext/2_AppWithContext';

import reportWebVitals from './reportWebVitals';
import Story from './C_AdvancedGuide_3_Context/1_WhenToUseContext/0_Story';

render(
  <StrictMode>
    <Story>
      <AppNoContext />
      <AppWithContext />
    </Story>
  </StrictMode>,
  document.getElementById('root0')
);

render(
  <StrictMode>
    <AppNoContext />
  </StrictMode>,
  document.getElementById('root1')
);

render(
  <StrictMode>
    <AppWithContext />
  </StrictMode>,
  document.getElementById('root2')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

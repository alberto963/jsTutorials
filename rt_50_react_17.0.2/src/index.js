import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContext } from './C_AdvancedGuide_3_Context/3_API/AppContext';
import App from './C_AdvancedGuide_3_Context/3_API/App';

import reportWebVitals from './reportWebVitals';

/* FROM REACT DOC:
    The defaultValue argument in createContext is only used when a component does not have a matching Provider above it in the tree.
    This default value can be helpful for testing components in isolation without wrapping them.
    
    NOTE: passing undefined as a Provider value does not cause consuming components to use defaultValue.

    If value attribute in AppContext.provider is omitted, a warning is displayed in console and no context is available in components below
    (resulting in error accessing it).

    That is, the following is wrong:

    <AppContext.Provider>
      <App />
    </AppContext.Provider>

    On the other way, not wrapping <app /> with AppContext.Provider will result in default values to be used (see comment below)
*/
ReactDOM.render(
  <StrictMode>
    <AppContext.Provider value={{ user: 'logo512.png', size: 50 }} >
      <App />
    </AppContext.Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
  The following one will result in default values to be used (for testing purposes, for instance):

  <StrictMode>
    <App />
  </StrictMode>,
*/
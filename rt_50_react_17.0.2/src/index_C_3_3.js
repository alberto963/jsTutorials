import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import 'index.css';
import { AppContext, AppUserContext, AppSizeContext } from 'C_AdvancedGuide_3_Context/3_API/0_AppContext';
import AppCC from 'C_AdvancedGuide_3_Context/3_API/1_AppCC';
import AppFC from 'C_AdvancedGuide_3_Context/3_API/2_AppFC';
import AppFCUpdatingFromNested from 'C_AdvancedGuide_3_Context/3_API/3_AppFCUpdatingFromNested';
import AppFCMultipleContext from 'C_AdvancedGuide_3_Context/3_API/4_AppFCMultipleContext';
import AppFCCaveatsGotches from 'C_AdvancedGuide_3_Context/3_API/5_AppFCCaveatsGotchesUnintentionalRenders';
import AppFCCaveatGotchesElementaryContext from 'C_AdvancedGuide_3_Context/3_API/7_AppFCCaveatGotchesElementaryContext';
import reportWebVitals from 'reportWebVitals';

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

    On the other way, not wrapping <App /> with AppContext.Provider will result in default values to be used (see comment below)
*/

render(
  <StrictMode>
    <AppFCCaveatGotchesElementaryContext />
  </StrictMode>,
  document.getElementById('root6')
);

render(
  <StrictMode>
    <AppFCCaveatsGotches />
  </StrictMode>,
  document.getElementById('root5')
);

// For AppFCMultipleContext
render(
  <StrictMode>
    <AppUserContext.Provider value={'logo512.png'} >
      <AppSizeContext.Provider value={50} >
        <AppFCMultipleContext />
      </AppSizeContext.Provider>
    </AppUserContext.Provider>
  </StrictMode>,
  document.getElementById('root4')
);

// For AppFCUpdatingFromNested
render(
  <StrictMode>
    <AppFCUpdatingFromNested />
  </StrictMode>,
  document.getElementById('root3')
);

// For AppFC
render(
  <StrictMode>
    <AppContext.Provider value={{ user: 'logo512.png', size: 50 }} >
      <AppFC />
    </AppContext.Provider>
  </StrictMode>,
  document.getElementById('root2')
);

render(
  <StrictMode>
    <AppContext.Provider value={{ user: 'logo512.png', size: 50 }} >
      <AppCC />
    </AppContext.Provider>
  </StrictMode>,
  document.getElementById('root1')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
  The following one will result in default values to be used (for testing purposes, for instance):

  <StrictMode>
    <AppCC />
  </StrictMode>,
*/
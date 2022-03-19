import { StrictMode } from 'react';

import AppFCMultipleContext from 'C_AdvancedGuide_3_Context/3_API/4_AppFCMultipleContext';
import { AppUserContext, AppSizeContext } from 'C_AdvancedGuide_3_Context/3_API/0_AppContext';

const Component = (props) => (
  <StrictMode>
    <AppUserContext.Provider value={'logo512.png'} >
      <AppSizeContext.Provider value={50} >
        <AppFCMultipleContext {...props} />
      </AppSizeContext.Provider>
    </AppUserContext.Provider>
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_3_4 = Template.bind({});
App_C_3_3_4.storyName = '3.3 API - 2. Function Component Multiple Context';
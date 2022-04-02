import { StrictMode } from 'react';

import { AppContext } from 'C_AdvancedGuide_3_Context/3_API/0_AppContext';
import App from 'C_AdvancedGuide_3_Context/3_API/8_AppFCRepeatSameContext';

const Component = (props) => (
  <StrictMode>
    <AppContext.Provider value={{ user: 'logo512.png', size: 50 }} >
      <App {...props} />
    </AppContext.Provider>
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_9_8 = Template.bind({});
App_C_3_9_8.storyName = '9.8 OUT OF DOC - Same context provider used twice on FC';
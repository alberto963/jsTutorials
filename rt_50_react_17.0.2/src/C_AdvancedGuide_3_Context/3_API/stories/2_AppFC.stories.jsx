import { StrictMode } from 'react';

import { AppContext } from 'C_AdvancedGuide_3_Context/3_API/0_AppContext';
import App from 'C_AdvancedGuide_3_Context/3_API/2_AppFC';

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

export const App_C_3_3_2 = Template.bind({});
App_C_3_3_2.storyName = '3.2 API - Context With App Function Component';
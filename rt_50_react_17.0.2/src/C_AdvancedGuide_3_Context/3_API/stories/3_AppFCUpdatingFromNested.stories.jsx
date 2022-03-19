import { StrictMode } from 'react';

import App from 'C_AdvancedGuide_3_Context/3_API/3_AppFCUpdatingFromNested';

const Component = (props) => (
  <StrictMode>
      <App {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_3_3 = Template.bind({});
App_C_3_3_3.storyName = '3.3 API - 1. Function Component Updating From Nested';
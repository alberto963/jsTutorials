import { StrictMode } from 'react';

import App from '../1_AppCC';

const Component = (props) => (
  <StrictMode>
    <App user='logo512.png' size={75} {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_2_1 = Template.bind({});
App_C_3_2_1.storyName = '2.1 Before You Use Context - App Class Component';
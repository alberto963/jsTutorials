import { StrictMode } from 'react';

import AppIOC from '../3_AppIOC';

const Component = (props) => (
  <StrictMode>
    <AppIOC user='logo512.png' size={75} {...props} />
  </StrictMode>
)
export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_2_3 = Template.bind({});
App_C_3_2_3.storyName = '2.3 Before You Use Context - App Inversion Of Control';
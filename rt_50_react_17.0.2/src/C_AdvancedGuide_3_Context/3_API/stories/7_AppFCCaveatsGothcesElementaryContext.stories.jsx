import { StrictMode } from 'react';

import AppFCCaveatGotchesElementaryContext from 'C_AdvancedGuide_3_Context/3_API/7_AppFCCaveatGotchesElementaryContext';

const Component = (props) => (
  <StrictMode>
    <AppFCCaveatGotchesElementaryContext {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_3_7 = Template.bind({});
App_C_3_3_7.storyName = '3.3 API - Function Component Caveats Gotches Elementatry Context';
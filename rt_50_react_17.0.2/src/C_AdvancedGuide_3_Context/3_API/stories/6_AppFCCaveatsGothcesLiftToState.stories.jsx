import { StrictMode } from 'react';

import AppFCCaveatGotchesLiftToState from 'C_AdvancedGuide_3_Context/3_API/6_AppFCCaveatGotchesLiftToState';

const Component = (props) => (
  <StrictMode>
    <AppFCCaveatGotchesLiftToState {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_3_6 = Template.bind({});
App_C_3_3_6.storyName = '3.3 API - 4. Function Component Caveats Gotches Lift To State';
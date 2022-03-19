import { StrictMode } from 'react';

import AppFCCaveatsGotches from 'C_AdvancedGuide_3_Context/3_API/5_AppFCCaveatsGotchesUnintentionalRenders';

const Component = (props) => (
  <StrictMode>
    <AppFCCaveatsGotches {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/3 Context',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_3_3_5 = Template.bind({});
App_C_3_3_5.storyName = '3.3 API - Function Component Caveats Gotches Unintentional Renders';
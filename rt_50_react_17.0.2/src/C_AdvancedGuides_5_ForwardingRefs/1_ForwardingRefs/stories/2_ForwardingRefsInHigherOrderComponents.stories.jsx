import { StrictMode } from 'react'

import App from '../2_ForwardingRefsInHigherOrderComponents'

const Component = (props) => (
  <StrictMode>
    <App {...props} />
  </StrictMode>
)

export default {
  title: 'AdvancedGuide/5 ForwardingRefs',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const App_C_5_1_2 = Template.bind({});
App_C_5_1_2.storyName = '1.2 Forwarding Refs - Forwarding Refs in HOCs'
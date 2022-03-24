import { StrictMode } from 'react'

import App from '../1_RefForwarding'

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

export const App_C_5_1_1 = Template.bind({});
App_C_5_1_1.storyName = '1.1 Forwarding Refs To DOM Components - Ref Forwarding'
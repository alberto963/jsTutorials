import React from 'react';

import App from '../1_AppNoContext';

export default {
  title: 'AdvancedGuide/3 Context',
  component: App,
};

const Template = (args) => <App {...args} />;

export const AppNoContext = Template.bind({});
AppNoContext.storyName = 'WhenToUseContext - AppNoContext';
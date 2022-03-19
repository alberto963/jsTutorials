import React from 'react';

import App from '../2_AppWithContext';

export default {
  title: 'AdvancedGuide/3 Context',
  component: App,
};

const Template = (args) => <App {...args} />;

export const AppWithContext = Template.bind({});
AppWithContext.storyName = 'WhenToUseContext - AppWithContext';
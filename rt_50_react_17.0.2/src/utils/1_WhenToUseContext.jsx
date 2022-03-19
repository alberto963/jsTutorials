// To be investigated, not used now
import Story from 'utils/Story'

import AppNoContext from '../1_AppNoContext';
import AppWithContext from '../2_AppWithContext';

// export default {
//   title: 'AdvancedGuide/3 Context',
//   component: Story,
//   subcomponents: { AppNoContext, AppWithContext },
//   parameters: {
//   },
// };

export const WhenToUseContext = (props) => <Story>
  <AppNoContext />
  <AppWithContext />
</Story>;

import { memo } from 'react'
import './App.css';
import _isEqual from 'lodash/isEqual'

const App = (props) => {
  return (
    <div className="App">
      <div>{props.v1}</div>
      <div>{props.v2.i0.i1}</div>
    </div>
  );
}

export default App;
// export default memo(App);
// export default memo(App,  _isEqual);
// export default memo(App, (a1, a2) => {
//   console.info(a1, a2)
//   return false
// });

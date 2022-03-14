import { useState } from 'react'

import './App.css';
import App from './App'

const mutable = { i0: { i1: 'B' }, i2: 'C' }

const AppParent = () => {

  const [v1, setV1] = useState('A')
  const [v2, setV2] = useState(mutable)

  console.info('v1=', v1)
  console.info('v2=', v2)

  return <div>
    <button onClick={() => {
      console.info('v1 onClick=', v1)

      setV1('A1')}
    }>Click v1</button>
    <button onClick={() => {
      console.info('v2 onClick=', v2)

      mutable.i0.i1 = 'B1'
      setV2(mutable)

    }}>Click v2</button>
    <App v1={v1} v2={v2} />
  </div>
}

export default AppParent;

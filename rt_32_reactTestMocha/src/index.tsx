import React from 'react'
import ComponentUnderTest from './ComponentUnderTest'
import * as ReactDOM from 'react-dom'

const D = 1000
ReactDOM.render(<ComponentUnderTest max={D} init={D - 1}/>, document.getElementById('root'))

import React from 'react'
import { render } from 'react-dom'
import ComponentUnderTest from './ComponentUnderTest'

const D = 1000
render(<ComponentUnderTest max={D} init={D - 1}/>, document.getElementById('root'))

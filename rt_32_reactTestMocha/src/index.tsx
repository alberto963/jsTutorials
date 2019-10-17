import React from 'react'
import { render } from 'react-dom'
import ComponentUnderTest from './ComponentUnderTest'

render(<ComponentUnderTest dimensions={['0', '1', '2', '3', '4']}/>, document.getElementById('root'))

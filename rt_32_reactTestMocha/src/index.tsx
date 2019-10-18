import React from 'react'
import { render } from 'react-dom'
import ComponentUnderTest from './ComponentUnderTest'

const D = 1000
const dimensions = [...new Array<string>(D)].map((r, x) => '' + x)
render(<ComponentUnderTest dimensions={dimensions} init={D - 1}/>, document.getElementById('root'))

import * as React from 'react'
import { expect } from 'chai'
import * as enzyme from 'enzyme'

import ComponentUnderTest from '../src/ComponentUnderTest'

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<ComponentUnderTest dimensions={5} />)
  expect(hello.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!')
})

it('renders the correct text with an explicit enthusiasm of 1', () => {
  const hello = enzyme.shallow(<ComponentUnderTest dimensions={5} enthusiasmLevel={1}/>)
  expect(hello.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!')
})

it('renders the correct text with an explicit enthusiasm level of 5', () => {
  const hello = enzyme.shallow(<ComponentUnderTest dimensions={5} enthusiasmLevel={5} />)
  expect(hello.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!!!!!')
})

it('throws when the enthusiasm level is 0', () => {
  expect(() => {
    enzyme.shallow(<ComponentUnderTest dimensions={5} enthusiasmLevel={0} />)
  }).toThrow()
})

it('throws when the enthusiasm level is negative', () => {
  expect(() => {
    enzyme.shallow(<ComponentUnderTest dimensions={5} enthusiasmLevel={-1} />)
  }).toThrow()
})
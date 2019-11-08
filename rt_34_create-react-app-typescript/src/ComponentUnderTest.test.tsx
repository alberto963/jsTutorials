import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'
import * as Sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import ComponentUnderTest from './ComponentUnderTest'

Enzyme.configure({ adapter: new Adapter() })

describe('Testing component <ComponentUnderTest max={3} />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ComponentUnderTest max={3} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has div', function () {
    const wrapper = Enzyme.shallow(<ComponentUnderTest max={3} />)
    expect(wrapper.find('div')).to.have.length(4)
  })

  it('has div with "Loading..." text content', function () {
    const wrapper = Enzyme.shallow(<ComponentUnderTest max={3} />)
    expect(wrapper.text()).to.equal(' ARRAY DIMENSION: undefined Loading...')
  })

  // it ('renders without crashing using spy', function () {

  //   console.info(ComponentUnderTest.prototype)
  //   const wrapper = Enzyme.mount(<ComponentUnderTest max={3} />)
  //   const instance = wrapper.instance()

  //   const spy = Sinon.spy(ComponentUnderTest.prototype, 'ComponentUnderTest')
  //   expect(spy.calledOnce).to.be.true
  // })
})

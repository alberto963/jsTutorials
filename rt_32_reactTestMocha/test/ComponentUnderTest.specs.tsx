/* tslint:disable */

import 'jsdom-global/register'
import * as React from 'react'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'
import * as Sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'

import 'mocha'
import jsdom from 'mocha-jsdom'

import ComponentUnderTest from '../src/ComponentUnderTest'
import NotFound from '../src/NotFound'

Enzyme.configure({ adapter: new Adapter() })

describe('Testing component <NotFound />', () => {

  it('have h1', function () {
    const wrapper = Enzyme.shallow(<NotFound />)
    expect(wrapper.find('h1')).to.have.length(1)
  })

  it('have div with "NOT FOUND" text content', function () {
    const wrapper = Enzyme.shallow(<NotFound />)
    expect(wrapper.text()).to.equal('NOT FOUND')
  })

  it ('calls render', function () {
    const spy = Sinon.spy(NotFound.prototype, 'render')
    const wrapper = Enzyme.mount(<NotFound />)
    const instance = wrapper.instance() as NotFound
    expect(spy.calledOnce).to.be.true
  })
})

describe('Testing component <ComponentUnderTest />', () => {

  jsdom()
  it("renders", () => {
    Enzyme.mount(<ComponentUnderTest max={5} />)
  })

  it("initially displays 3 buttons", () => {
    const wrapper = Enzyme.mount(<ComponentUnderTest max={5} />)
    console.info('FIND: ', wrapper.find('Button'))

    // expect(wrapper.find("Button")).toHaveLength(3)
    // expect(
    //   wrapper.find("input[type='checkbox']").map(el => el.getDOMNode().checked)
    // ).toEqual([true, false, false])
  })

  // it('renders the correct text when no init level is given', () => {
   
  //   // const spy = Sinon.spy(ComponentUnderTest.prototype, 'ComponentUnderTest')

  //   // const wrapper = Enzyme.shallow(<ComponentUnderTest max={5} />)

  //   // console.info('FIND: ', wrapper.find('.MuiButton-label'))
  //   // expect(cut.find('.MuiButton-label').text()).equal('ComponentUnderTest Daniel!')
  // })

// it('renders the correct text with an explicit enthusiasm of 1', () => {
//   const cut = Enzyme.shallow(<ComponentUnderTest max={5} init={1} />)
//   expect(cut.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!')
// })

// it('renders the correct text with an explicit enthusiasm level of 5', () => {
//   const cut = Enzyme.shallow(<ComponentUnderTest max={5} init={4} />)
//   expect(cut.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!!!!!')
// })

// it('throws when the enthusiasm level is 0', () => {
//   expect(() => {
//     Enzyme.shallow(<ComponentUnderTest max={5} init={0} />)
//   }).toThrow()
// })

// it('throws when the enthusiasm level is negative', () => {
//   expect(() => {
//     Enzyme.shallow(<ComponentUnderTest max={5} init={-1} />)
//   }).toThrow()
// })
})

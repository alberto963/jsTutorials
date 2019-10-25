/* tslint:disable */

import 'jsdom-global/register'
import { expect } from 'chai'
import * as Enzyme from 'enzyme'
import * as Sinon from 'sinon'
import 'mocha'

import * as Adapter from 'enzyme-adapter-react-16'

import ComponentUnderTest from '../src/ComponentUnderTest'
import { NotFound } from '../src/NotFound'

describe('<ComponentUnderTest />', () => {

  Enzyme.configure({ adapter: new Adapter() })

  it('renders the correct text when no init level is given', () => {
    const spy = Sinon.spy(NotFound.prototype, 'render')

    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const cut = Enzyme.shallow( <NotFound />)

    // expect(cut.find('.greeting').text()).toEqual('ComponentUnderTest Daniel!')
  })

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

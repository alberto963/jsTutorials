/* tslint:disable */

const { register } = require('jsdom-global')
const { React } = require('react')
const { expect } = require('chai')
const { Enzyme } = require('enzyme')
const { Sinon } = require('sinon')
const { Adapter } = require('enzyme-adapter-react-16')

require ('mocha')

const { TodoList} = require('../src/ExampleCUT')

// var jsdom = require('mocha-jsdom')

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

Enzyme.configure({ adapter: new Adapter() })

describe('Testing component <TodoList />', () => {

  before(async () => {  
    await (() => window !== null)()
    // console.info('BEFORE window: ', window)
  })

  it("renders", () => {
    Enzyme.mount(<TodoList />)
  })

  it("initially displays 3 buttons", () => {

    const wrapper = Enzyme.mount(<TodoList />)
    const shallow = Enzyme.shallow(<TodoList />)
    // expect(wrapper.find('li')).toHaveLength(3))

    console.info('MOUNT wrapper: ', wrapper)
    console.info('MOUNT instance: ', wrapper.instance())
    console.info('MOUNT find: ', wrapper.find('div'))

    console.info('SHALLOW shallow: ', shallow)
    console.info('SHALLOW instance: ', shallow.instance())
    console.info('SHALLOW find: ', shallow.find('div'))

    // expect(wrapper.find("Button")).toHaveLength(3)
    // expect(
    //   wrapper.find("input[type='checkbox']").map(el => el.getDOMNode().checked)
    // ).toEqual([true, false, false])
  })
})

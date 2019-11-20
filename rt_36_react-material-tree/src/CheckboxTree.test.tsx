import React from 'react'
import ReactDOM from 'react-dom'
import CheckboxTree from './CheckboxTree'

describe('CheckboxTree', () => {
  it('renders an empty tree without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders an one item only tree with no attributes (only id) without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{id: "0"}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders an one item only tree with labelText only without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0"}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders a two items tree with labelText only without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0"}, {labelText: 'T1', id: "1"}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders an one item tree with one subitem without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0", items: [{labelText: 'T0', id: "0"}]}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders an one item tree with two expanded subitems without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0", defaultExpanded: true, items: [{labelText: 'T0', id: "1"}, {labelText: 'T0', id: "2"}]}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders an one item tree with one expanded subitem with 2 more subitems levels without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0", defaultExpanded: true,
      items: [{labelText: 'T1', id: "1", defaultExpanded: true, 
        items: [{labelText: 'T2', id: "2", defaultExpanded: true, 
          items: [{labelText: 'T3', id: "3"}]}]}]}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should crash because of duplicated id', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxTree struct={[{labelText: 'T0', id: "0", defaultExpanded: true,
      items: [{labelText: 'T1', id: "0"}]}]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

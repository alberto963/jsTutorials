/* setup.js */

const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const newProps = Object.assign({}, src)
  const newProps2 = Object.assign(newProps, target)
  Object.defineProperties(target, newProps2)

// TODO: not ok, should go on from this

  // Object.defineProperties(target, {
  //     ...Object.getOwnPropertyDescriptors(src),
  //     ...Object.getOwnPropertyDescriptors(target),
  //   })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function (id) {
  clearTimeout(id)
}
copyProps(window, global)

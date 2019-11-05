/* setup.js */

const { JSDOM } = require('jsdom')

const jsdom = new JSDOM(`<!doctype html><html><body></body></html>`, {
  url: "http://localhost"
})
// const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(target, src) {
 
  const targetd = Object.getOwnPropertyDescriptors(target)
  const srcd = Object.getOwnPropertyDescriptors(src)

  // console.info (targetd)
  // console.info (srcd)

  const mixinProps = Object.assign({}, srcd, targetd)
  // console.info('mixinProps', mixinProps)

  const p0 = Object.defineProperties(target, mixinProps)
  // console.info (p0)

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
// global.requestAnimationFrame = function (callback) {
//   return setTimeout(callback, 0)
// }
// global.cancelAnimationFrame = function (id) {
//   clearTimeout(id)
// }
copyProps(global, window)

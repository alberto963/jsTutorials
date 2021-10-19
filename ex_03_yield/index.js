// 1) ----------------------------------------------------------------------------------------------------------
console.log('\ng1 simple generator function with value passed to yield =======================================')

function* g1() {
  const r0 = yield 2
  console.log('r0=', r0)

  const r1 = yield 3
  console.log('r1=', r1)
}

const iterator1 = g1()

console.log(iterator1.next(9)) 
console.log(iterator1.next(8))
console.log(iterator1.next(7))

// 2) ----------------------------------------------------------------------------------------------------------
console.log('\ng2 generator function yielding result form another generator function =========================')

function* g2() {
  const r2 = yield* g1()
  console.log('r2=', r2)
}
const iterator2 = g2()
console.log(iterator2.next(9)) 
console.log(iterator2.next(8)) 
console.log(iterator2.next(7)) 

// 3) ----------------------------------------------------------------------------------------------------------
console.log('From iterative to generator function ============================================================')

// l2 is head recursive
function loop2(l) {
  console.log('l=', l)

  if (l >= 0) {
    console.log(loop2(l - 1))
    return 'Hello World!'
  }
  return 'No Way!'
}

const l2 = loop2(4)

// l3 is iterative
function loop3(l) {
  while (l > 0) {
    console.log('l=', l)
    console.log('Hello World!')
    l = l - 1
  }
  console.log('No Way!')
}

const l3 = loop3(4)

// iteration with generator function 
function *loop1(l) {
  console.log('l=', l)

  if (l === 0) {
    yield 'No Way!'
    return
  }
  
  yield 'Hello World!'
  yield *loop1(l - 1)
}

const l = loop1(4)
let next = l.next()
while (next.done === false) {
  console.log(next.value)
  next = l.next()
}

// 4) ----------------------------------------------------------------------------------------------------------
console.log('\nsleep generator function yielding asynch result (using Promise) ===============================')

function* sleep() {
  yield new Promise(resolve => setTimeout(() => resolve('sleep generator : Hello World!'), 500))
}

// sync
sleep().next().value.then(n => console.log(n)).catch(e => console.error(e))

// 5) ----------------------------------------------------------------------------------------------------------
console.log('\nMixing loop and asynch results ================================================================')

const getAsynch = p => new Promise(resolve => setTimeout(() => resolve(p), 2500))

function *loop4(l) {

  console.log('l=', l)

  if (l <= 0) {
    yield getAsynch('l4: No Way!')

    return
  }
  
  yield getAsynch('l4: Hello World!')

  yield *loop4(l - 1)
}

const l4 = loop4(4)
let next4 = l4.next()
while (next4.done === false) {
   next4.value.then(n => console.log(n)).catch(e => console.error(e))
   next4 = l4.next()
}

// 6) ----------------------------------------------------------------------------------------------------------
console.log('\nExercise: make asynch sequence sequencial =====================================================')

const asynchFunction = () => {
  let r = false
  setTimeout(function() {
    r = true
  }, 500)

  if (r) {
    return 'Hello World!'
  }

//   Obviously it doesn't return 'Hello World!' as the timeout is asynchronous
//   With generators, make the asynchronous call sequential
}

// Solution

const sequentialFunction = () => {
  const setAsynch = () => new Promise(resolve => setTimeout(() => resolve(true), 2500))

  // The next() method also accepts a value, which can be used to modify the internal state of the generator.
  // A value passed to next() will be received by yield.
  const run = (generator, executorResult) => {
    const g = !executorResult ? generator() : generator
    const generatorResult = g.next(executorResult)
    !generatorResult.done && generatorResult.value.then(result => run(g, result))
  }

  function* callSequence() {
    const r0 = yield setAsynch()
    r0 && console.log('sequentialFunction: Hello World!')

    const r1 = yield setAsynch()
    r1 && console.log('sequentialFunction: Hello World Again!')
  }
  run(callSequence)
}



console.log('Solution: sequentialFunction with generators and Promise ========================================')
sequentialFunction()

// 7) ----------------------------------------------------------------------------------------------------------
console.log('\nExercise: using async and await ===============================================================')

const asynchSequence = async () => {
  const setAsynch = () => new Promise(resolve => setTimeout(() => resolve(true), 2500))

  try {
    const r0 = await setAsynch()
    r0 && console.log('asynchFunction: Hello World!')

    const r1 = await setAsynch()
    r1 && console.log('asynchFunction: Hello World Again!')
  }
  catch(e) {
    console.error(e)
  }
}
asynchSequence()

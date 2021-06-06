import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import { render } from 'react-dom'

const t = () => Math.floor(performance.now() / 1000)
const dt = t0 => (t() - t0) + ' :: '
const t0 = t()

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

// https://dmitripavlutin.com/dont-overuse-react-usecallback/

const MyParent = ({ term }) => {
  const [count, setCount] = useState(0)
  
  console.log(`${dt(t0)} MyParent with term=${term} called`)

  const onItemClick = event => console.log('You clicked ', event.currentTarget)
  const onItemClickCallback = useCallback(onItemClick, [term])

// <MyBigListMemoized term={term} id={'no React.callback and React.memo'} onItemClick={onItemClick} />
// <MyBigList term={term} id={'React.callback and no React.memo'} onItemClick={onItemClickCallback} />
// <MyBigListMemoized term={term} id={'React.callback and React.memo'} onItemClick={onItemClickCallback} />
// <MyBigList term={term} id={'no React.callback and no React.memo'} onItemClick={onItemClick} />

  return (
	  <div>
      <button onClick={() => setCount(count + 1) }>
          Click me
      </button>
      <br />
        <MyBigListMemoized term={term} id={'React.callback and React.memo'} onItemClick={onItemClickCallback} />
	  </div>
	  )
}

const MyBigList = ({ term, id, onItemClick }) => {
	console.log(`${dt(t0)} MyBigList with ${id} called`)
  const myList = (
    <div>
      {Array(term).fill(null).map((item, i) => <div key={i} onClick={onItemClick}>{i}</div>)}
    </div>
    )
  console.log(`${dt(t0)} MyBigList with ${id} built list`)

	return myList
}

const MyBigListMemoized = memo(MyBigList)

// https://dmitripavlutin.com/react-useref-guide/

const Stopwatch = () => {
  const timerIdRef = useRef(0)
  const [count, setCount] = useState(0)

  const startHandler = () => {
    if (timerIdRef.current) { return }
    timerIdRef.current = setInterval(() => setCount(c => c + 1), 1000)
  }

  const stopHandler = () => {
    clearInterval(timerIdRef.current)
    timerIdRef.current = 0
  }

  const resetHandler = () => setCount(0)
  
  useEffect(() => {
    return () => clearInterval(timerIdRef.current)
  }, [])

  console.log(`${dt(t0)} Stopwatch with timerIdRef ${timerIdRef.current} renders`)

  return (
    <div>
      <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  )
}

const InputFocus = () => {
  const inputRef = useRef()

  useEffect(() => {
    // Logs `HTMLInputElement` 
    console.log(`${dt(t0)} InputFocus with inputRef ${inputRef.current} useEffect`)

    inputRef.current.focus()
  }, [])

  // Logs `undefined` during initial rendering
  console.log(`${dt(t0)} InputFocus with inputRef ${inputRef.current} renders`)

  return <input ref={inputRef} type="text" />
}

render(
  <div>
    <Example />
    <Stopwatch />
    <InputFocus />
    <MyParent term={10} /> {/* To see effects, use 1000000 as term value */}
  </div>,
  document.getElementById('root')
)

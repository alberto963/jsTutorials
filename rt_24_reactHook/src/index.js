import React, { useState, useEffect, useCallback, memo,
   useRef, createRef, forwardRef, useImperativeHandle } from 'react'
import { render } from 'react-dom'
import _merge from 'lodash/merge'

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
  const timerIdRef = useRef(null)
  const [count, setCount] = useState(0)

  const startHandler = () => {
    if (timerIdRef.current) {
       return 
    }

    timerIdRef.current = setInterval(() => setCount(c => c + 1), 1000)
  }

  const stopHandler = () => {
    clearInterval(timerIdRef.current)
    timerIdRef.current = 0
  }

  const resetHandler = () => setCount(0)
  
  useEffect(() => () => clearInterval(timerIdRef.current), []) // On unmount clear timer

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

// useRef
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

// forwardRef
const Base = (props) => <div {...props} ref={props.forwardedref}>Base Component</div>
const withWrap = C => forwardRef((props, ref) => <C {...props} forwardedref={ref} />)
const WrappedBase = withWrap(Base)

const MyBase = () => {
  const ref = createRef()  // NOTE: createRef, not useRef!!!
  // createRef will return a new ref on every render while useRef will return the same ref each time.
  // useRef returns a mutable ref object whose . current property is initialized to the passed argument
  // (initialValue). The returned object will persist for the full lifetime of the component

  // console.log(`${dt(t0)} MyBase with ref current ${ref.current}`)

  useEffect(() => {
    // Logs `HTMLDivElement` 
    console.log(`${dt(t0)} MyBase with ref current ${ref.current} useEffect`)

    ref.current.style = 'color:red'
  }, [])

  return <WrappedBase ref={ref} />
}

// forwardRef2
const Base2 = forwardRef((props, ref) => <div {...props} ref={ref}>Base2 Component</div>)
Base2.displayName = 'Base2'

const MyBase2 = (props) => {
  const ref = useRef()  
  // console.log(`${dt(t0)} MyBase2 with ref current ${ref.current}`)

  useEffect(() => {
    // Logs `HTMLDivElement` 
    console.log(`${dt(t0)} MyBase2 with ref current ${ref.current} useEffect`)
    // console.log(`${dt(t0)} MyBase2 with ref current style ${ref.current.style} useEffect`)

    // ref.current.style = 'font-size:24px;color:green;'  // OK
    ref.current.style.color = 'green'
    ref.current.style.fontSize = '24px'
    // ref.current.style = {...ref.current.style, color: 'green'} DOES NOT WORK!!!
    console.log('MyBase2 current style=', ref.current.style)
  }, [])

  return <Base2 {...props} style={{height:'100px', width:'300px', border: 'solid 1px black'}} ref={ref} />
}

// forwardRef3 and useImperativehandle
const Base3 = forwardRef((props, ref) => {
  const base3Ref = createRef()
  useImperativeHandle(ref, () => _merge({}, {
    custom: () => {
      console.log('Base3 custom called useImperativeHandle ref=', ref.current)
      console.log(`${dt(t0)} Base3 with ref current ${ref.current} useImperativeHandle`)

      console.log('Base3 custom called base3Ref=', base3Ref.current)
      console.log(`${dt(t0)} Base3 with base3Ref current ${base3Ref.current} useImperativeHandle`)
    }
  }, base3Ref.current))
  return <div {...props} ref={base3Ref}>Base3 Component</div>
})
Base3.displayName = 'Base3'

const MyBase3 = (props) => {
  const ref = useRef()  

  useEffect(() => {
    ref.current.custom()
    ref.current.style.color = 'indigo'

  }, [])

  return <Base3 {...props} style={{height:'150px', width:'100px', border: 'solid 1px black'}} ref={ref} />
}

render(
  <div>
    <Example />
    <Stopwatch />
    <InputFocus />
    <MyBase />
    <MyBase2 style={{color: 'blu'}} />
    <MyBase3 />
    <MyParent term={10} /> {/* To see effects, use 1000000 as term value */}
  </div>,
  document.getElementById('root')
)

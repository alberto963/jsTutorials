import React, {
  useState, useEffect, useCallback, memo,
  useRef, createRef, forwardRef, useImperativeHandle
} from 'react'
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
      <button onClick={() => setCount(count + 1)}>
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

  return <Base2 {...props} style={{ height: '100px', width: '300px', border: 'solid 1px black' }} ref={ref} />
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

  return <Base3 {...props} style={{ height: '150px', width: '100px', border: 'solid 1px black' }} ref={ref} />
}

// forwardRef4 
const Base4 = forwardRef((props, ref) => {
  const base4Props = {
    style: { color: 'blue', height: '200px', width: '200px', padding: '50px', margin: '10px', border: 'solid 1px black' }
  }

  const base4InnerProps = {
    style: { color: 'red', height: '150px', width: '100px', border: 'solid 1px black' }
  }

  return <div {...base4Props} ref={ref} >
    Base4 Component
    <div {...base4InnerProps} {...props} ref={props.innerref}>Base4 Inner Component</div>
  </div>
})
Base4.displayName = 'Base4'

const MyBase4 = (props) => {
  const ref = createRef()
  const innerRef = createRef()

  useEffect(() => {
    ref.current.style.color = 'green'
    innerRef.current.style.color = 'yellow'
  }, [])

  return <Base4 {...props} innerref={innerRef} ref={ref} />
}

// forwardRef5 and useImperativehandle: il ref interno lo crea il componente che tramite useImperativehandle lo rende disponibile al padre
const Base5 = forwardRef((props, ref) => {
  const baseRef = createRef()
  const innerRef = createRef()

  const base5Props = {
    style: { color: 'red', height: '200px', width: '200px', padding: '50px', margin: '10px', border: 'solid 1px black' }
  }

  const base5InnerProps = {
    style: { color: 'red', height: '150px', width: '100px', border: 'solid 1px black' }
  }

  useImperativeHandle(ref, () => ({
    baseRef,
    innerRef,
  }), [])

  return <div {...base5Props} ref={baseRef} >
    Base5 Component
    <div {...base5InnerProps} {...props} ref={innerRef}>Base5 Inner Component</div>
  </div>
})
Base5.displayName = 'Base5'

const MyBase5 = (props) => {
  const ref = useRef()

  useEffect(() => {
    ref.current.baseRef.current.style.color = 'green'
    ref.current.innerRef.current.style.color = 'orange'
  })

  return <Base5 {...props} ref={ref} />
}

// usa la set di una use state per creare il ref => NON FUNZIONA, non sono riuscito a settare i current 
const Base6 = forwardRef((props, ref) => {
  const [baseRef, setBaseRef] = useState(createRef());
  const [innerRef, setInnerRef] = useState(createRef());

  const base6Props = {
    style: { color: 'red', height: '200px', width: '200px', padding: '50px', margin: '10px', border: 'solid 1px black' }
  }

  const base6InnerProps = {
    style: { color: 'red', height: '150px', width: '100px', border: 'solid 1px black' }
  }

  useImperativeHandle(ref, () => ({
    baseRef,
    innerRef,
  }), [])

  return <div {...base6Props} ref={setBaseRef} >
    Base6 Component
    <div {...base6InnerProps} {...props} ref={setInnerRef}>Base6 Inner Component</div>
  </div>
})
Base6.displayName = 'Base6'

const MyBase6 = (props) => {
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current)
    // ref.current.baseRef.current.style.color = 'green'
    // ref.current.innerRef.current.style.color = 'orange'
  }, [])

  return <Base6 {...props} ref={ref} />
}

const Base7 = forwardRef((props, ref) => {

  const base7Props = {
    style: { color: 'red', height: '200px', width: '200px', padding: '50px', margin: '10px', border: 'solid 1px black' }
  }

  const base7InnerProps = {
    style: { color: 'red', height: '150px', width: '100px', border: 'solid 1px black' }
  }

  const innerRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      custom: () => console.info('CUSTOM CALLED'),
      innerRef
    }
  })

  return <div {...base7Props} >
    Base7 Component
    <div {...base7InnerProps} {...props} ref={innerRef}>Base7 Inner Component</div>
  </div>
})
Base7.displayName = 'Base7'

const MyBase7 = (props) => {
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current)
    if (ref && ref.current) {
      ref.current.custom()
      ref.current.innerRef.current.style.color = 'green'
    }
  })

  return <Base7 {...props} ref={ref} />
}

const TypeExp = () => {

  const [chars, setChars] = useState('')

  useEffect(() => {
    window.addEventListener('keypress', setChars);

    return () => window.removeEventListener('keypress', setChars);
  }, [])

  return <div>
    <h2>Type here</h2>
    <span>{chars.key}</span>
  </div>
}

const TypeExp2 = () => {

  const [chars, setChars] = useState('x')

  const getKey = useCallback((e) => setChars(`${chars} ${e.key}`))

  useEffect(() => {
    window.addEventListener('keypress', getKey);

    return () => window.removeEventListener('keypress', getKey);
  }, [])

  return <div>
    <h2>Type here</h2>
    <span>{chars}</span>
  </div>
}

const MyParent2 = () => {
  const [count, setCount] = useState(0)
  const [activate, setActivate] = useState(0)

  console.log(`${dt(t0)} MyParent2 called`)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click me (MyParent2)
      </button>
      <button onClick={() => setActivate(activate + 1)}>
        Activate (MyParent2)
      </button>
      <br />
      {`${dt(t0)} count=${count}`}
      <br />
      {`${dt(t0)} activate=${activate}`}
      {((activate > 3 && activate < 6) || (activate > 10 && activate < 13)) && <MyWithUseState initial={count} />}
    </div>
  )
}

const MyWithUseState = ({ initial }) => {
  const [count, setCount] = useState(initial)

  console.log(`${dt(t0)} MyWithUseState with initial=${initial} called`)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click me (MyWithUseState)
      </button>
      <br />
      {`${dt(t0)} initial=${initial}`}
      <br />
      {`${dt(t0)} count=${count}`}
    </div>
  )
}

/*
 * https://app.testgorilla.com/
 */
const TestGorilla01 = () => {
  const [value, setValue] = useState(0);
  useEffect(() => { console.log("Hello!"); setValue(1) }, [])

  return (
    <div>{value}</div>
  )
}

const TestGorilla02 = () => {

  const fetchData = () => new Promise((r) => setTimeout(() => r(Date.now()), 100));

  const MyComponent = () => {
    const [result, setResult] = useState();
    const data = fetchData().then((value) => setResult(value));

    return (
      <div> {
        result === data.toString() ?
          (<div>hello</div>) :
          (<div>good bye</div>)
      }
      </div>
    )
  }

  return <MyComponent />
}

const TestGorilla03 = () => {
  return <div>TestGorilla03</div>
}

// Wrong because it just returns timeoutId
const HiderWrapper1 = (props) => {
  return setTimeout(() => { return props.children }, 4000)
}

// Correct
const HiderWrapper2 = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => setTimeout(() => setVisible(true), 4000), [])

  return visible ? props.children : null
}

const TestGorilla04 = () => {
  const [value, setValue] = useState(2);
  useEffect(() => setTimeout(() => setValue(3), 4000), [])

  return <MyParent3 value={value} />
}

const MyParent3 = ({ value }) => {
  return <div>{value !== 3 && <MyChild />}</div>
}

const MyChild = () => {
  return <div>MyChild</div>
}

/*
 * https://www.testgorilla.com/blog/advanced-react-js-interview-questions/
 */
render(
  <div>
    <Example />
    <Stopwatch />
    <InputFocus />
    <MyBase />
    <MyBase2 style={{ color: 'blu' }} />
    <MyBase3 />
    <MyBase4 />
    <MyBase5 />
    <MyBase6 />
    <MyBase7 />
    <MyParent term={10} /> {/* To see effects, use 1000000 as term value */}
    <TypeExp2 />
    <MyParent2 />
    <TestGorilla01 />
    <TestGorilla02 />
    <HiderWrapper2><TestGorilla03 /></HiderWrapper2>
    <TestGorilla04 />
  </div>,
  document.getElementById('root')
)

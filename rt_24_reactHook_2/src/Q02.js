import { useState, useEffect, useRef } from "react"
import { render } from 'react-dom'

const TestWithManualRef = (props) => {
	const [count, setCount] = useState(0);

	const prevCountRef = useRef()
	useEffect(() => {
	  prevCountRef.current = count
	})
	const prevCount = prevCountRef.current
	
	return <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
}

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  });
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const TestWithUsePrevious = (props) => {
	const [count, setCount] = useState(0);

	const prevCount = usePrevious(count)
	
	return <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
}

const Q02 = () =>
  (<div>
	<TestWithManualRef />
	<TestWithUsePrevious />
  </div>)
  
export {Q02}
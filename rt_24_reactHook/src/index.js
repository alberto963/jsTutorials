import React, { useState, useEffect, useCallback, memo } from 'react'
import ReactDOM, { render } from 'react-dom'

const t = () => Math.floor(Date.now() / 1000)
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
  
  console.info(dt(t0) + ` MyParent with term=${term} called`)

  const onItemClickNoCallback = event => console.log('You clicked ', event.currentTarget)
  const onItemClickCallback = useCallback(event => console.log('You clicked ', event.currentTarget), [term])

// <MyBigListMemoized term={term} id={'no React.callback and React.memo'} onItemClick={onItemClickNoCallback} />
// <MyBigList term={term} id={'React.callback and no React.memo'} onItemClick={onItemClickCallback} />
// <MyBigListMemoized term={term} id={'React.callback and React.memo'} onItemClick={onItemClickCallback} />

  return (
	  <div>
		<button onClick={() => setCount(count + 1) }>
        Click me
        </button>
		
		<br />
		<br />
        <MyBigListMemoized term={term} id={'React.callback and React.memo'} onItemClick={onItemClickCallback} />
	  </div>
	  )
}

const MyBigList = ({ term, id, onItemClick }) => {
	console.info(dt(t0) + ` MyBigList with ${id} called`)
	return (
		<div>
		  {Array(term).fill(null).map((item, i) => <span onClick={onItemClick}>{i}</span>)}
		</div>
	)
}

const MyBigListMemoized = memo(MyBigList)
const MyParentMemoized = memo(MyParent)

render(
  <div>
    <Example />
    <MyParentMemoized term={200000} />
  </div>,
  document.getElementById('root')
)
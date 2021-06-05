import React, { useState, useEffect, useCallback, memo } from 'react'
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
  
  console.info(dt(t0) + ` MyParent with term=${term} called`)

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
	console.info(dt(t0) + ` MyBigList with ${id} called`)
  const myList = (
    <div>
      {Array(term).fill(null).map((item, i) => <div key={i} onClick={onItemClick}>{i}</div>)}
    </div>
    )
  console.info(dt(t0) + ` MyBigList with ${id} built list`)

	return myList
}

const MyBigListMemoized = memo(MyBigList)

render(
  <div>
    <Example />
    <MyParent term={1000000} />
  </div>,
  document.getElementById('root')
)

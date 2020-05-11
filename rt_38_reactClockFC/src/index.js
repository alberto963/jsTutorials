import React, { useState, useEffect, useCallback } from "react"
import ReactDOM from 'react-dom'

const DateHeader = ({ interval }) => 
  <h2>Hello, world! My interval is {interval} milliseconds</h2>

const FormattedDate = ({ date }) => 
  <h3>It is {date.toLocaleTimeString()}.</h3>

const Clock = ({ interval = 1000 }) => {

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setInterval(() => setDate(new Date()), interval)
  }, [interval])

  return (
    <>
      <DateHeader interval={interval} />
      <FormattedDate date={date} />
    </>
  )
}

const ResetButton = ({setDate}) => {

  const reset = useCallback(() => fetch('/api/reset', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => setDate(new Date(Date.parse(data.date)))), [setDate])

  return <button onClick={reset}>Reset</button>
}

const NextButton = ({setDate}) => {
  const csrf = document.cookie.replace(/(?:(?:^|.*;\s*)_csrf\s*=\s*([^;]*).*$)|^.*$/, "$1")
  const next = useCallback(() => fetch('/api/next', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token': csrf,
    },
    body: JSON.stringify({ date: new Date(0) }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setDate(new Date(Date.parse(data.date)))
  })
  .catch((error) => {
    console.error('Error:', error);
  }), [setDate, csrf])

  return <button onClick={next}>Next</button>
}

const AppHeader = (props) => {
  const [startDate, setStartDate] = useState(new Date())

  return(
    <>
      <ResetButton setDate={setStartDate} />
      <NextButton setDate={setStartDate} />
      <FormattedDate date={startDate} />
    </>)
}

const Clocks = ({ intervals }) => intervals.map((i, idx) => <Clock interval={i} key={idx} />)

ReactDOM.render(
  <>
    <AppHeader />
    <Clock />
    <Clocks intervals={[500, 2000, 4000]} />
    {[5000, 10000].map((i, idx) => <Clock interval={i} key={idx} />)}
  </>,
  document.getElementById('root')
)

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

const GetCsrfButton = ({set_csrf}) => {

  const getCsrf = useCallback(() => fetch('/api/getCsrf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => set_csrf(data._csrf)), [set_csrf])

  return <button onClick={getCsrf}>Get Csrf</button>
}

const ResetButton = ({setDate, _csrf}) => {
  // const csrf = document.cookie.replace(/(?:(?:^|.*;\s*)_csrf\s*=\s*([^;]*).*$)|^.*$/, "$1")
  const reset = useCallback(() => fetch('/api/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token': _csrf,
    },
    body: JSON.stringify({ date: new Date() })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setDate(new Date(Date.parse(data.date)))
  })
  .catch((error) => {
    console.error('Error:', error);
  }), [setDate, _csrf])

  return <button onClick={reset}>Reset</button>
}

const Clocks = ({ intervals }) => intervals.map((i, idx) => <Clock interval={i} key={idx} />)

const App = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [_csrf, set_csrf] = useState()

  return(
    <>
      <GetCsrfButton set_csrf={set_csrf} />
      <ResetButton setDate={setStartDate} _csrf={_csrf} />
      <FormattedDate date={startDate} />
      <Clock />
      <Clocks intervals={[500, 2000, 4000]} />
      {[5000, 10000].map((i, idx) => <Clock interval={i} key={idx} />)}
    </>)
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

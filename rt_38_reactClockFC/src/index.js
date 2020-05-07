import React, { useState, useEffect } from "react"
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

const Clocks = ({ intervals }) => intervals.map((i, idx) => <Clock interval={i} key={idx} />)

ReactDOM.render(
  <>
    <Clock />
    <Clocks intervals={[500, 2000, 4000]} />
    {[5000, 10000].map((i, idx) => <Clock interval={i} key={idx} />)}
  </>,
  document.getElementById('root')
)

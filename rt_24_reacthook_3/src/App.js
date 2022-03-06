import React, { useState, useEffect } from "react"
import axios from 'axios'

import './App.css';

const HTTP_SERVICE_TODOS = "https://jsonplaceholder.typicode.com/todos"
const HTTP_SERVICE_POSTS = "https://jsonplaceholder.typicode.com/posts"

const invoke = f => (f)()

const listItem = ({ id, url, title }) =>
  <li key={id}>
    <a href={url}>{title}</a>
  </li>

const list = data =>
  <div className='list'>
    <ul>{data.map(item => listItem(item))}</ul>
  </div>

const useHttpService = service => {
  const [data, setData] = useState([])

  // Correct, but no error handling
  // useEffect(() => invoke(async () => setData((await axios(service)).data)), [service])

  // Error Handling, correct but no catch in error boundary component
  // NOTE: 17.2 react doc in Error Boundaries paragraph says: 
  // Error boundaries do not catch errors for: Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks))
  // This can be the reason as getData axios call is async
  const throwError = error => { throw new Error(error) }
  useEffect(() => invoke(async () => setData((await axios(service).catch(throwError)).data)), [service])

  // Uncomment the following to see AppError component being rendered (because of js error of wrong data returned to list)
  // useEffect(() => invoke(async () => setData((await axios(service).catch(throwError)))), [service])

  // Uncomment to simulate a wrong URL requested, I expected to catch the error in AppError, but no componentDidCatch is called
  // useEffect(() => invoke(async () => setData((await axios(service + 'WRONG').catch(throwError)).data)), [service])

  // Expanded version of above with try catch (NOTE: 'await axios(service)' is simplification of 'await axios.get(service)')
  // Even if with try/catch no componentDidCatch is called in AppError

  // useEffect(() => {
  //   const getData = async service => {
  //     try {
  //       const response = await axios.get(service);
  //       return response.data
  //     } catch (error) {
  //       throwError(error);
  //     }
  //   }
  //   invoke(async () => {
  //     const d = await getData(service)
  //     setData(d)
  //   })
  // }, [service])

  return data
}

const App = () => {
  const todos = useHttpService(HTTP_SERVICE_TODOS)
  const posts = useHttpService(HTTP_SERVICE_POSTS)

  return (
    <div className='container'>
      {list(todos)}
      {list(posts)}
    </div>)
}

export default App;

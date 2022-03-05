import React, { useState, useEffect } from "react"
import axios from 'axios'

import './App.css';

const HTTP_SERVICE_TODOS = "https://jsonplaceholder.typicode.com/todos"
const HTTP_SERVICE_POSTS = "https://jsonplaceholder.typicode.com/posts"

const invoke = f => (f)()

const listItem = ({id, url, title}) => 
  <li key={id}>
    <a href={url}>{title}</a>
  </li>

const list = data =>
  <div class='list'>
    <ul>{data.map(item => listItem(item))}</ul>
  </div>
	
const useHttpService = service => {
	const [data, setData] = useState([])
	useEffect(() => invoke(async () => setData((await axios(service)).data)), [service])

	return data
}

const App = () => {
	const todos = useHttpService(HTTP_SERVICE_TODOS)
	const posts = useHttpService(HTTP_SERVICE_POSTS)

	return (
		<div class='container'>
      {list(todos)}
      {list(posts)}
    </div>)
}

export default App;

import React, { useState, useEffect, useLayoutEffect } from "react"
import axios from 'axios'

const HTTP_SERVICE_TODOS = "https://jsonplaceholder.typicode.com/todos"
const HTTP_SERVICE_POSTS = "https://jsonplaceholder.typicode.com/posts"

const listItem = ({id, url, title}) => (
	<li key={id}>
		<a href={url}>{title}</a>
	</li>
)

const resultList = ({hits}) => <ul>{hits.map((item) => listItem(item))}</ul>

function Q07() {  // Wrong: no array of props param
	const [data, setData] = useState({hits: []})

	useEffect(async () => { // NOTE: no array of props param, it is executes every render, it is not fine
		const result = await axios(HTTP_SERVICE_TODOS)
		setData({hits: result.data})
	})

	return resultList(data)
}

function Q07_A() { // wrong: useLayoutEffect is fine, but still no array of props params, moreover it useEffect returns a function, not ok
	const [data, setData] = useState({hits: []})

	useLayoutEffect(async () => { // Note: useLayoutEffect, it is executed after DOM creation and before rendering, it should be fine also with [] as second param
		const result = await axios(HTTP_SERVICE_TODOS)
		setData({hits: result.data})
	})

	return resultList(data)
}
  
function Q07_A1() { // Same as Q07_A, but calling fetchData(), not returning it fron useEffect, no [] and it works!
	const [data, setData] = useState({hits: []})

	useLayoutEffect(() => {
		const fetchData = async () => {
			const result = await axios(HTTP_SERVICE_TODOS)
			setData({hits: result.data})
		}

		fetchData()
	})

	return resultList(data)
}

function Q07_A2() { // Same as Q07_A
	const [data, setData] = useState({hits: []})

	const fetchData = async () => {
		const result = await axios(HTTP_SERVICE_TODOS)
		setData({hits: result.data})
	}

	useLayoutEffect(() => fetchData(), [])

	return resultList(data)
}

function Q07_B() {  // Correct, only comment fetchData is a new function at every render,
	                // it is better define it in the effect body. However, as there are no props, it makes no difference
  const [data, setData] = useState([])
  
  const fetchData = async () => {
    const result = await axios(HTTP_SERVICE_TODOS)
  	setData(result.data)
  }
  
  useEffect( () => {
	fetchData()
  }, [])

	return <ul>{data.map((item) => listItem(item))}</ul>
}

const invoke = (f) => (f)()
const Q07_B_stripped = () => {
	const [data, setData] = useState([])

	// NOTARE le parentesi che raggruppano la funzione asynch e quelle che raggruppano la await
	useEffect(() => (async () => setData((await axios(HTTP_SERVICE_TODOS)).data))(), [])
	// useEffect(() => invoke(async () => setData((await axios(HTTP_SERVICE_TODOS)).data)), [])

	return <ul>{data.map((item) => listItem(item))}</ul>
}

// With a custom hook
const useHttpService = (service) => {
	const [data, setData] = useState([])
	useEffect(() => invoke(async () => setData((await axios(service)).data)), [])

	return data
}

const Q07_B_stripped2 = () => {
	const todos = useHttpService(HTTP_SERVICE_TODOS)
	const posts = useHttpService(HTTP_SERVICE_POSTS)

	const list = (data) =>
		<div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
			<ul>{data.map((item) => listItem(item))}</ul>
		</div>
	
	return (
		<div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: 10, padding: 10, backgroundColor: '#2196F3'}}>
			{list(todos)}
			{list(posts)}
		</div>)
}

function Q07_C() { // Wrong, useEffect with no props and setData set the array of results, not the hit attribute
	const [data, setData] = useState({hits: []})
  
	useEffect(async () => {
		const result = await axios(HTTP_SERVICE_TODOS)
		setData(result.data)
	})
	  
	return resultList(data)
}

function Q07_D() { // Wrong, syntax error in 'setData((hits: result.data))'
	let hits = {}
	const [data, setData] = useState()
	
	// useEffect(async () => {
	//   const result = await axios(HTTP_SERVICE_TODOS)
	//   setData((hits: result.data))
	// })
	  
	return resultList(data)
}
export {Q07, Q07_A, Q07_A1, Q07_A2, Q07_B, Q07_B_stripped, Q07_B_stripped2, Q07_C}
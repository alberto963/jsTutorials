import React, { useState, useEffect, useLayoutEffect } from "react"
import axios from 'axios'

const HTTP_SERVICE = "https://jsonplaceholder.typicode.com/todos"

const listItem = ({id, url, title}) => (
	<li key={id}>
		<a href={url}>{title}</a>
	</li>
)

const resultList = ({hits}) => <ul>{hits.map((item) => listItem(item))}</ul>

function Q07() {  // Wrong: no array of props param
	const [data, setData] = useState({hits: []})

	useEffect(async () => { // NOTE: no array of props param, it is executes every render, it is not fine
		const result = await axios(HTTP_SERVICE)
		setData({hits: result.data})
	})

	return resultList(data)
}

function Q07_A() { // Correct: useLayoutEffect
	const [data, setData] = useState({hits: []})

	useLayoutEffect(async () => { // Note: useLayoutEffect, it is executed after DOM creation and before rendering, it should be fine
		const result = await axios(HTTP_SERVICE)
		setData({hits: result.data})
	})

	return resultList(data)
}
  
function Q07_A1() { // Same as Q07_A
	const [data, setData] = useState({hits: []})

	useLayoutEffect(() => {
		const fetchData = async () => {
			const result = await axios(HTTP_SERVICE)
			setData({hits: result.data})
		}

		fetchData()
	})

	return resultList(data)
}

function Q07_B() {  // Correct, only comment fetchData is a new function at every render,
	                // it is better define it in the effect body. However, as there are no props, it makes no difference
	const [data, setData] = useState([])
  
  const fetchData = async () => {
    const result = await axios(HTTP_SERVICE)
  	setData(result.data)
  }
  
  useEffect( () => {
	fetchData()
  }, [])

	return <ul>{data.map((item) => listItem(item))}</ul>
}

function Q07_C() { // Wrong, useEffect with no props and setData set the array of results, not the hit attribute
	const [data, setData] = useState({hits: []})
  
	useEffect(async () => {
		const result = await axios(HTTP_SERVICE)
		setData(result.data)
	})
	  
	return resultList(data)
}

function Q07_D() { // Wrong, syntax error in 'setData((hits: result.data))'
	let hits = {}
	const [data, setData] = useState()
	
	// useEffect(async () => {
	//   const result = await axios(HTTP_SERVICE)
	//   setData((hits: result.data))
	// })
	  
	return resultList(data)
}
export {Q07, Q07_A, Q07_A1, Q07_B, Q07_C}
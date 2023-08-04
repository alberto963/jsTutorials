import React, { useEffect, useRef, useState } from 'react'
import { select, csv } from 'd3'
import { chart } from './Chart'

const D3Hello = () => {
  const ref = useRef()
  const [segments, setSegments] = useState([])
  const [nodes, setNodes] = useState([])

  useEffect(() => {
    csv("/segments.csv").then(setSegments)
    csv("/nodes.csv").then(setNodes)
  }, [])

  useEffect(() => {
    const div = select(ref.current)

    div.selectAll("*").remove() // Needed because the effect is run twice, even if [] is second param
    div.append('p').text('Hello from D3')

    // if (div._groups[0][0].childElementCount === 0) div.append('p').text('Hello from D3')

    // const c = chart([], nodes)
    // div.append(c)

  }, [segments, nodes])

  return <div ref={ref} />
}

export default D3Hello

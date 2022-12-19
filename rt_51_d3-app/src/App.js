import React, { useEffect, useRef } from 'react'
import { select } from 'd3'

const D3Hello = () => {
  const ref = useRef()

  useEffect(() => {
    const div = select(ref.current)

    div.selectAll("*").remove() // Needed because the effect is run twice, even if [] is second param
    div.append('p').text('Hello from D3')

    // if (div._groups[0][0].childElementCount === 0) div.append('p').text('Hello from D3')
  }, [])

  return <div ref={ref} />
}

export default D3Hello

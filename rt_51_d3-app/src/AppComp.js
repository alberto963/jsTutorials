
import React, { useEffect, useRef, useState } from 'react'
import { select } from 'd3'

// NOTA: queste classi non sono corrette, la vesione corretta e' quella funzionale
// dove viene usata remove per rimuovere il doppio append

class NetworkGraph extends React.Component {
    constructor(props) {
        super(props);
        this.netGraph = React.createRef();
    }

    componentDidMount() {
        const div = select(this.netGraph.current)
        div.append('p').text('Hello from D3')
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return <div ref={this.netGraph} />;
    }

}

const NetGraphContainer = ({ data }) => {
    const netGraphRef = useRef(null)
    const [graph, setGraph] = useState(null)

    useEffect(() => {
        if (!graph) {
            setGraph(new NetGraph(netGraphRef.current))
        } else {
            graph.update(data)
        }
    }, [graph, data])

    return (
        <div ref={netGraphRef}> </div>
    )
}

class NetGraph {
    constructor(element) {
        // initialize graph
        let vis = this
        vis.g = select(element)
        vis.update()
    }

    // update the graph when props change
    update() {
        let vis = this
        vis.g.append('p').text('Hello from D3')
    }
}

export { NetGraph, NetworkGraph }
export default NetGraphContainer
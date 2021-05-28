import React from "react"
import List from "./List.jsx"
import Form from "./Form.jsx"

const lists = n => Array(n).fill(null).map((_, i) => (<List id={i} key={i} />))

const App = props =>
  <div className="row mt-5">
    <h2>React redux reselect</h2>
    <div className="col-md-4 offset-md-1">
      <Form accept={true} />
      {lists(props.lists)}
    </div>
  </div>

export default App;


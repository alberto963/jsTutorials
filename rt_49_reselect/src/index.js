import React from 'react'
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import store from "./js/store/index"
import App from "./js/components/App"

import "./main.css"

ReactDOM.render(
  <div>
    <Provider store={store}><App lists={2}/></Provider>
  </div>,
   document.getElementById('app')
  )

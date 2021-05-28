import React from "react"
import { connect } from "react-redux"

import { setAdd, setRem, } from "../actions"
import { getListDataSelector } from '../selectors'
import { makeGetListDataSelector } from '../selectors'

const mapStateToProps = (state, ownProps) => {
  return { 
    data: getListDataSelector(state, ownProps),
  }
}

const makeMapStateToProps = () => {
  const getListDataSelector = makeGetListDataSelector()
  const mapStateToProps = (state, ownProps) => {
    return {
      data: getListDataSelector(state, ownProps)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  setAdd,
  setRem,
}

const List = props => {
  return (
    <ol>
      {props.data.map((elem, i) => (
        <li key={elem.id}>
          {elem.id}
          <button className="set-button" title="Add" onClick={() => props.setAdd(props.id, i)}>+</button>
          <button className="set-button" title="Rem" onClick={() => props.setRem(props.id, i)}>-</button>
        </li>
      ))}
    </ol>
  )
}

// export default connect(mapStateToProps, mapDispatchToProps)(List)
export default connect(makeMapStateToProps, mapDispatchToProps)(List)

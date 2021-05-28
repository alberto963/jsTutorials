import React from "react"
import { connect } from "react-redux"
import { v1 as uuidv1 } from "uuid"
import { addElem, remElem } from "../actions"
import { getNumAddSelector, getNumRemSelector } from '../selectors'

const mapStateToProps = (state, ownProps) => {
    return { 
      numAdd: getNumAddSelector(state),
      numRem: getNumRemSelector(state),
      listIdAdd: state.numbers.listIdAdd,
      listIdRem: state.numbers.listIdRem
  }
}

const mapDispatchToProps = {
  addElem,
  remElem,
}

const Form = props => 
  <div>
    <button className="new-button" title="lad" >
    {props.listIdAdd}
    </button>
    <button className="new-button" title="lre" >
      {props.listIdRem}
    </button>
    <button className="new-button" title="add"
          onClick={() => props.accept && props.addElem(props.listIdAdd, props.numAdd, {title: 'new ', id: uuidv1()})}>
      {props.accept ? props.numAdd : 'X'}
    </button>
    <button className="new-button" title="rem"
          onClick={() => props.accept && props.remElem(props.listIdRem, props.numRem)}>
      {props.accept ? props.numRem : 'X'}
    </button>
  </div>


export default connect(mapStateToProps, mapDispatchToProps)(Form)

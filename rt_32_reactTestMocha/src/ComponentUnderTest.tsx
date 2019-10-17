import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from './Button'
import Box from '@material-ui/core/Box'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries } from 'react-vis'
import {t, dt, generateData, Data} from './Utils'

const DELAY = 1000

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
  },
  box: {
    width: '310px',
    height: '310px',
    borderColor: 'grey',
  }
}))

// tslint:disable-next-line: interface-over-type-literal
type E = {
  x: number,
  y: number
}

// tslint:disable-next-line: interface-over-type-literal
type State<T> = {
  data: Data<T>,
  loading: boolean,
  dimension: number
}

interface IOwnProps {
  dimensions: string[]
}

const ComponentUnderTest = (props: IOwnProps) => {

  const t0 = t()

  const [state, setState] = useState({
    data: [],
    loading: true,
    dimension: 2
  })

  console.info(dt(t0) + 'Entering ComponentUnderTest state=', state)

  useEffect(() => {
    console.info(dt(t0) + 'useEffect IN state=', state)

    if (state.loading) {
      console.info(dt(t0) + 'useEffect setting timeout state=', state)

      setTimeout(() => {
        console.info(dt(t0) + 'timeout expired state=', state)
        const newState = {...state, loading: false, data: generateData(t0, state.dimension, {x: v => v, y: x => x})}
        console.info(dt(t0) + 'setting state with new data newState=', newState)
        setState(newState)
        console.info(dt(t0) + 'after set state with new data state is stil previous state: state=', state)
      }, DELAY)
    }

    console.info(dt(t0) + 'useEffect OUT state=', state)

  }, [state.loading])

  const updateDimension = useCallback(increment => () => {
    const newDimension = state.dimension + increment
    const newState = {...state,
      dimension: newDimension < 0 ? props.dimensions.length - 1 : newDimension % props.dimensions.length}
    console.info(dt(t0) + 'updateDimension newState=', newState)
    setState(newState)
    console.info(dt(t0) + 'updateDimension state=', state)
  }, [state.dimension])

  const updatedata = useCallback(() => {
    setState({...state, loading: true})
    console.info(dt(t0) + 'updatedata state=', state)
  }, [state.dimension])

  const classes = useStyles(props)

  console.info(dt(t0) + 'ComponentUnderTest OUT state=', state)

  return (
  <div className='centered-and-flexed'>
    <div className='centered-and-flexed-controls'>
      <Button
        className={classes.button}
        onClick={updateDimension(-1)}
        buttonContent={'PREV'}
      />
      <div> {`ARRAY DIMENSION: ${props.dimensions[state.dimension]}`} </div>
      <Button
          className={classes.button}
          onClick={updateDimension(+1)}
          buttonContent={'NEXT'}
      />
    </div>
    <Box className={classes.box} border={1} bgcolor='primary.main'>
        {state.loading && <div className={classes.button}>Loading...</div>}
        {!state.loading && <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries data={state.data} />
        </XYPlot>}
    </Box>
    <Button
        className={classes.button}
        onClick={updatedata}
        buttonContent={'UPDATE DATA'}
    />
  </div>)
}

export default ComponentUnderTest

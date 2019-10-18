import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from './Button'
import Box from '@material-ui/core/Box'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries } from 'react-vis'
import {t, dt, generateData, IFunc, Data} from './Utils'

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
type E0 = number
interface IE1<T> {
  v0: T
  v1: T
}
type E1 = IE1<boolean>

type E = E0

const f: IFunc<E> = {x: v => v, y: x => x}

const f1: IFunc<E1> = {x: v => ({v0: !v, v1: !!v}), y: v => ({v0: !!v, v1: !v})}

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

  const [state, setState] = useState<State<E>>({
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
        const newState: State<E> = {...state, loading: false, data: generateData<E>(t0, state.dimension, f)}
        console.info(dt(t0) + 'setting state with new data newState=', newState)
        setState(newState)
        console.info(dt(t0) + 'after set state with new data state is stil previous state: state=', state)
        const justForTest: Data<E1> = generateData<E1>(t0, state.dimension, f1)
        console.info(dt(t0) + 'Just to see a bit more complex type in ts justForTest=', justForTest)
      }, DELAY)
    }

    console.info(dt(t0) + 'useEffect OUT state=', state)

  })

  const updateDimension = useCallback(increment => () => {
    const newDimension = state.dimension + increment
    const newState: State<E> = {...state, loading: true, data: [...state.data],
      dimension: newDimension < 0 ? props.dimensions.length - 1 : newDimension % props.dimensions.length}
    console.info(dt(t0) + 'updateDimension newState=', newState)
    setState(newState)
    console.info(dt(t0) + 'updateDimension state=', state)
  }, [state.loading, state.dimension])

  const updatedata = useCallback(() => {
    setState({...state, loading: true, data: [...state.data] })
    console.info(dt(t0) + 'updatedata state=', state)
  }, [state.dimension])

  const classes = useStyles(props)

  console.info(dt(t0) + 'ComponentUnderTest OUT ***RENDERING*** state=', state)

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
    </div>
  )
}

export default ComponentUnderTest

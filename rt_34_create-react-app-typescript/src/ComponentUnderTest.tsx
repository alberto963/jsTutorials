import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from './Button'
import Box from '@material-ui/core/Box'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries } from 'react-vis'
import {t, generateData, IFunc, Data} from './Utils'

const DELAY = 1000

const useStyles = makeStyles((theme: { spacing: (arg0: number) => void }) => ({
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
type E = number

const f: IFunc<E> = {x: v => v, y: x => x}

// tslint:disable-next-line: interface-over-type-literal
type State<T> = {
  data: Data<T>,
  loading: boolean,
  init: number
}

interface IOwnProps {
  max: number,
  init?: number
}

const ComponentUnderTest = (props: IOwnProps) => {

  const t0 = t()

  const [state, setState] = useState<State<E>>({
    data: [],
    loading: true,
    init: 0 || props.init as number
  })

  // console.info(dt(t0) + 'Entering ComponentUnderTest state=', state)

  useEffect(() => {
    // console.info(dt(t0) + 'useEffect IN state=', state)

    if (state.loading) {
      // console.info(dt(t0) + 'useEffect setting timeout state=', state)

      setTimeout(() => {
        // console.info(dt(t0) + 'timeout expired state=', state)
        const newState: State<E> = {...state, loading: false, data: generateData<E>(t0, state.init, f)}
        // console.info(dt(t0) + 'setting state with new data newState=', newState)
        setState(newState)
        // console.info(dt(t0) + 'after set state with new data state is stil previous state: state=', state)
      }, DELAY)
    }

    // console.info(dt(t0) + 'useEffect OUT state=', state)
  })

const updateInit = useCallback(increment => () => {
    const newInit = state.init + increment
    const newState: State<E> = {...state, loading: true, data: [...state.data],
      init: newInit < 0 ? props.max - 1 : newInit % props.max}
    // console.info(dt(t0) + 'updateInit newState=', newState)
    setState(newState)
    // console.info(dt(t0) + 'updateInit state=', state)
// eslint-disable-next-line
}, [state.loading, state.init])

  const updatedata = () => {
    setState({...state, loading: true, data: [...state.data] })
    // console.info(dt(t0) + 'updatedata state=', state)
  }

  const classes = useStyles(props)

  // console.info(dt(t0) + 'ComponentUnderTest OUT ***RENDERING*** state=', state)

  return (
    <div className='centered-and-flexed'>
      <div className='centered-and-flexed-controls'>
        <Button
          className={classes.button}
          onClick={updateInit(-1)}
          buttonContent={'PREV'}
        />
        <div> {`ARRAY DIMENSION: ${state.init}`} </div>
        <Button
          className={classes.button}
          onClick={updateInit(+1)}
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
        onClick={useCallback(updatedata, [state.init])}
        buttonContent={'UPDATE DATA'}
      />
    </div>
  )
}

export default ComponentUnderTest

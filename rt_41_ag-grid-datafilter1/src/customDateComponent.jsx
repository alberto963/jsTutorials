import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState,} from 'react'
import FlatPikr from 'flatpickr'

// import './fontawesome-free-5.15.1-web/css/all.css' // Imported in index.html

// import '../node_modules/flatpickr/dist/flatpickr.css'
// import '../node_modules/flatpickr/dist/themes/material_blue.css'
import '../node_modules/flatpickr/dist/themes/material_green.css'

const CustomDateComponent = (props, ref) => {
  const e = (_=>_)()

  const [date, setDate] = useState(null)
  const [pickr, setPickr] = useState(null)
  const refFlatPickr = useRef(null)
  const refInput = useRef(null)

  //*********************************************************************************
  //          LINKING THE UI, THE STATE AND AG-GRID
  //*********************************************************************************

  const onDateChanged = selectedDates => setDate(selectedDates[0])

  const onDateStateChanged = () => {
    pickr.setDate(date)
    props.onDateChanged()
  }

  const pickrConfig = {
    onChange: onDateChanged,
    enableTime: true,
    dateFormat: 'd/m/Y H:i',
    wrap: true,
  }
  
  const agGridMethods = {
    //*********************************************************************************
    //          METHODS REQUIRED BY AG-GRID
    //*********************************************************************************

    // ag-grid will call us here when in need to check what the current date value is hold by this
    // component.
    getDate: () => date,

    // ag-grid will call us here when it needs this component to update the date that it holds.
    setDate: date => setDate(date),

    //*********************************************************************************
    //          AG-GRID OPTIONAL METHODS
    //*********************************************************************************
    setInputPlaceholder: placeholder => refInput.current ? refInput.current.setAttribute('placeholder', placeholder) : e,

    setInputAriaLabel: label => refInput.current ?  refInput.current.setAttribute('aria-label', label) : e,
  }

  useEffect(() => {
    const fp = FlatPikr(refFlatPickr.current, pickrConfig)
    setPickr(fp)
  }, [])

  useEffect(() => pickr ? pickr.calendarContainer.classList.add('ag-custom-component-popup') : e, [pickr])

  // Callback after the state is set. This is where we tell ag-grid that the date has changed so
  // it will proceed with the filtering and we can then expect ag-Grid to call us back to getDate
  useEffect(() => pickr ? onDateStateChanged() : e, [date, pickr])

  useImperativeHandle(ref, () => (agGridMethods))

  // Inlining styles to make simpler the component
  return (
    <div ref={refFlatPickr} className='ag-input-wrapper custom-date-filter' role='presentation' >
      <input ref={refInput} type='text' data-input style={{width: '100%'}} />
      <a className='input-button' title='clear' data-clear><i className='fa fa-times' /></a>
    </div>
  )
}

export default forwardRef(CustomDateComponent)
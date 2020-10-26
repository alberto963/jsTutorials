import React from 'react'
import './styles.css'
import InputMask from 'react-input-mask'

const validate = input => {
  // console.log('input=', input)

  const split0 =  input.nextState.value.split(' ')
  const date = split0[0]
  const time = split0[1]

  // console.log('date=', date)
  // console.log('time=', time)

  const dateSplit = date.split('/')
  const day = +dateSplit[0]
  const month = +dateSplit[1]
  if (day === 0 || day > 31) return input.previousState
  if (month === 0 || month > 12) return input.previousState

  const timeSplit = time.split(':')
  const hour = +timeSplit[0]

  if (hour > 23) return input.previousState

  return input.nextState
}

const DateField = ({value, onChange}) => {
  const day = /([0123])/i
  const hour = /([012])/i
  const min = /([012345])/i
  const month = /[01]/i
  const digit = /[0-9]/
  const mask = [day, digit, '/', month, digit, '/', digit, digit, digit, digit, ' ', hour, digit, ':', min, digit]
  return (
    <div>
      <InputMask
        mask={mask}
        maskPlaceholder='gg/mm/aaaa hh:mm'
        alwaysShowMask={true}
        beforeMaskedStateChange={validate}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default DateField
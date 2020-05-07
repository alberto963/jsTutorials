import React, { useState, useCallback } from "react"
import ReactDOM from 'react-dom'

const BoilingVerdict = (props) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const TemperatureInput = ({ scale, temperature, onTemperatureChange }) =>
  <fieldset>
    <legend>Enter temperature in {scaleNames[scale]}:</legend>
    <input value={temperature}
      onChange={onTemperatureChange} />
  </fieldset>

const Calculator = (_props) => {
  const [temperature, setTemperature] = useState(0)
  const [scale, setScale] = useState('c')

  const handleCelsiusChange = useCallback(e => {
    setTemperature(e.target.value);
    setScale('c');
  }, [])

  const handleFahrenheitChange = useCallback(e => {
    setTemperature(e.target.value);
    setScale('f');
  }, [])

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={scale === 'f' ? tryConvert(temperature, toCelsius) : temperature}
        onTemperatureChange={handleCelsiusChange} />
      <TemperatureInput
        scale="f"
        temperature={scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature}
        onTemperatureChange={handleFahrenheitChange} />
      <BoilingVerdict
        celsius={parseFloat(tryConvert(temperature, toCelsius))} />
    </div>
  );
}

ReactDOM.render(
  <div>
    <Calculator />
  </div>,
  document.getElementById('root')
)

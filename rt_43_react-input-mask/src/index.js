
import React from 'react';
import ReactDOM from 'react-dom';
import DateField from './datefield';

const App = () => {
    const [value, setValue] = React.useState('010120200001')

    const onChange = event => {
        console.log('value=', event.target.value)
        setValue(event.target.value)
    }

    return <div>Field Value: {value} <DateField value={value} onChange={onChange} /></div>
}

ReactDOM.render(<App />, document.querySelector('#root'));
    
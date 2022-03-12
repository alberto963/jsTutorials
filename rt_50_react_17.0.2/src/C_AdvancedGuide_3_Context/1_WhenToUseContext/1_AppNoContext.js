import { Component } from 'react'

import './0_App.css'

const themes = {
    dark: { background: 'blue', color: 'white' },
    light: { background: 'yellow', color: 'black' }
}

// NOTE: class component
class ThemedButton extends Component {
    render() {
        return (<div className='App' >
            <button {...this.props} style={{ backgroundColor: this.props.theme.background, color: this.props.theme.color }}>Button</button>
        </div>)
    }
}

// NOTE: functional component
const Toolbar = (props) => <ThemedButton type={'button'} disabled={true} theme={props.theme} />

// NOTE: class component
class App extends Component {
    render() {
        return <Toolbar theme={themes.dark} />
    }
}

export default App

import { Component, createContext } from 'react'

import 'utils/App.css'
import './0_App.css'

const themes = {
    dark: { background: 'blue', color: 'white' },
    light: { background: 'yellow', color: 'black' },
    medium: { background: 'pink', color: 'black' }
}

const ThemeContext = createContext(themes.light)

// NOTE: class component
class ThemedButtonWithStatic extends Component {
    static contextType = ThemeContext

    render() {
        return (
            <div className='App' >
                <button {...this.props} style={{ backgroundColor: this.context.background, color: this.context.color }}>Button</button>
            </div>)
    }
}

class ThemedButton extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {(theme) => <div className='App' >
                    <button {...this.props} style={{ backgroundColor: theme.background, color: theme.color }}>Button</button>
                </div>}
            </ThemeContext.Consumer>)
    }
}

// NOTE: functional component
const Toolbar = (props) => <ThemedButton type={'button'} disabled={true} />

// NOTE: class component
class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value={themes.medium}>
                <Toolbar />
            </ThemeContext.Provider>)
    }
}

// Renders with light style
export class AppDebug extends Component {
    render() {
        return <Toolbar />
    }
}

export default App

import { Component } from 'react'

import 'utils/App.css'
import './0_App.css'
import { AppContext } from './0_AppContext'

class Link extends Component {
    render() {
        return (
            <div className='App'>
                {this.props.children}
                <a href={this.props.href}>The Anchor element 9</a>
            </div>)
    }
}

class Avatar extends Component {
    static contextType = AppContext // With public class field (static) 
    render() {
        return <img src={this.context.user} alt='Avatar' className='avatar' style={{ width: this.context.size, height: this.context.size }} />
    }
}
// Avatar.contextType = AppContext // Used only in class components, for functional components Context.Consumer is used

class NavigatorBar extends Component {
    static contextType = AppContext
    render() {
        return (
            <Link href={this.context.user}>
                <Avatar />
                <button onClick={() => this.context.updateSize(+5)}>Click to increase icon size</button>
                <button onClick={() => this.context.updateSize(-5)}>Click to decrease icon size</button>
            </Link>)
    }
}
NavigatorBar.contextType = AppContext // Used only in class components, for functional components Context.Consumer is used

class PageLayout extends Component {
    render() {
        return <NavigatorBar />
    }
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'logo512.png',
            size: 100,
            updateSize: (v) => this.setState(state => ({ size: state.size + v }))
        };
    }

    render() {
        return (
            <AppContext.Provider value={this.state} >
                <PageLayout />
            </AppContext.Provider>
        )
    }
}

export default Page



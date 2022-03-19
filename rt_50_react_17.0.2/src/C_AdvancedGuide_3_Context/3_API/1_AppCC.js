import { Component } from 'react'

import 'utils/App.css'
import './0_App.css'
import { AppContext } from './0_AppContext'

class Link extends Component {
    render() {
        return (
            <div className='App'>
                {this.props.children}
                <a href={this.props.href}>The Anchor element 1</a>
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
    render() {
        return <PageLayout />
    }
}

export default Page



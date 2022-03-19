import { Component } from 'react'

import 'utils/App.css'
import './0_App.css'

class Link extends Component {
    render() {
        return (
            <div className='App'>
                {this.props.children}
                <a href={this.props.href}>The Anchor element</a>
            </div>)
    }
}

class Avatar extends Component {
    render() {
        return <img src={this.props.user} alt='Avatar' className='avatar' style={{width: this.props.size, height: this.props.size}}/>
    }
}

class NavigatorBar extends Component {
    render() {
        return (
            <Link href={this.props.user}>
                <Avatar user={this.props.user} size={this.props.size} />
            </Link>)
    }
}

class PageLayout extends Component {
    render() {
        return <NavigatorBar user={this.props.user} size={this.props.size} />
    }
}

class Page extends Component {
    render() {
        return <PageLayout user={this.props.user} size={this.props.size} />
    }
}

export default Page

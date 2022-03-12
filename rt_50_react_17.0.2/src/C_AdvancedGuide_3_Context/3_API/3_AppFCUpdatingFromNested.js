import { useState } from 'react'
import './0_App.css'
import { AppContext } from './0_AppContext'

const Link = props =>
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element 3</a>
    </div>

const Avatar = props =>
    <AppContext.Consumer>
        {({ user, size, updateSize }) => {
            return (
                <div>
                    <img src={user} alt='Avatar' className='avatar' style={{ width: size, height: size }} />
                    <button onClick={() => updateSize(+5)}>Click to increase icon size</button>
                    <button onClick={() => updateSize(-5)}>Click to decrease icon size</button>
                </div>)
        }}
    </AppContext.Consumer>

const NavigatorBar = props =>
    <AppContext.Consumer>
        {({ user }) =>
            <Link href={user}>
                <Avatar />
            </Link>}
    </AppContext.Consumer>

const PageLayout = props => <NavigatorBar />

const Page = props => {
    const [size, setSize] = useState(50) // Need to use a state hook for functional component (in react doc it is done with class component)
    const updateSize = (inc) => setSize((size) => size + inc)

    return <AppContext.Provider value={{ user: 'logo192.png', size, updateSize }}><PageLayout /></AppContext.Provider>
}

export default Page

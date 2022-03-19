import { useState, useEffect, memo } from 'react'
import 'utils/App.css'
import './0_App.css'
import { AppContext } from './0_AppContext'

const Link = props =>
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element 5</a>
    </div>

const Avatar = props => {
    console.info('Avatar rendered...')

    return <AppContext.Consumer>
        {({ user, size }) => <img src={user} alt='Avatar' className='avatar' style={{ width: size, height: size }} />}
    </AppContext.Consumer>
}

// NOTE: to avoid re-render on parent component being re-rendered I had to wrap this component with memo
// See: https://alexsidorenko.com/blog/react-render-context/ and https://alexsidorenko.com/blog/react-render-always-rerenders/
// As reminder: 
// In normal rendering, React does not care whether props changed - it will render child components unconditionally just because the parent rendered!
// With memo it will not re-render 
const NavigatorBar = memo(props => {
    console.info('NavigatorBar rendered...')

    return (
        <AppContext.Consumer>
            {({ user }) =>
                <Link href={user}>
                    <Avatar />
                </Link>}
        </AppContext.Consumer>)
})

const PageLayout = props => {
    console.info('PageLayout rendered...')

    return <AppContext.Provider value={{ user: 'logo192.png', size: 75 }}><NavigatorBar /></AppContext.Provider>
}

const Page = props => {
    console.info('Page rendered...')

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const id = setInterval(() => counter < 3 ? setCounter(c => c + 1) : clearInterval(id), 1000);
        return () => clearInterval(id);
    }, [counter])

    return <div>Counter to force re-render: {counter}<PageLayout /></div>
}

export default Page

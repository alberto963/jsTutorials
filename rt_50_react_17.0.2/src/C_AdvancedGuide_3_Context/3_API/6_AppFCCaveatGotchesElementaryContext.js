import { useState, useEffect, memo } from 'react'
import './0_App.css'
import { AppUserContext, AppSizeContext } from './0_AppContext'

const Link = props => {
    console.info('Link rendered...')

    return <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element 6</a>
    </div>
}

const Avatar = props => {
    console.info('Avatar rendered...')

    return <AppUserContext.Consumer>
        {(user) =>
            <AppSizeContext.Consumer>
                {(size) =>
                    <img src={user} alt='Avatar' className='avatar' style={{ width: size, height: size }} />}
            </AppSizeContext.Consumer>}
    </AppUserContext.Consumer>
}

// NOTE: to avoid re-render on parent component being re-rendered I had to wrap this component with memo
// See: https://alexsidorenko.com/blog/react-render-context/ and https://alexsidorenko.com/blog/react-render-always-rerenders/
// As reminder: 
// In normal rendering, React does not care whether props changed - it will render child components unconditionally just because the parent rendered!
const NavigatorBar = memo(props =>
    <AppUserContext.Consumer>
        {(user) => <Link href={user}><Avatar /></Link>}
    </AppUserContext.Consumer>)

const PageLayout = props => {
    console.info('PageLayout rendered...')

    return <AppUserContext.Provider value={'logo192.png'}>
        <AppSizeContext.Provider value={100}>
            <NavigatorBar />
        </AppSizeContext.Provider>
    </AppUserContext.Provider>
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

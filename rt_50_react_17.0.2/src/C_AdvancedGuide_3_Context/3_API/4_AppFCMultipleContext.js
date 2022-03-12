import './0_App.css'
import { AppUserContext, AppSizeContext } from './0_AppContext'

const Link = props =>
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element 4</a>
    </div>

const Avatar = props =>
    <AppUserContext.Consumer>
        {(user) =>
            <AppSizeContext.Consumer>
                {(size) =>
                    <img src={user} alt='Avatar' className='avatar' style={{ width: size, height: size }} />}
            </AppSizeContext.Consumer>}
    </AppUserContext.Consumer>

const NavigatorBar = props =>
    <AppUserContext.Consumer>
        {(user) => <Link href={user}><Avatar /></Link>}
    </AppUserContext.Consumer>

const PageLayout = props => <NavigatorBar />

const Page = props => <PageLayout />

export default Page

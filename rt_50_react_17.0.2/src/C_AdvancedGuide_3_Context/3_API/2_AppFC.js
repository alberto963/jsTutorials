import 'utils/App.css'
import './0_App.css'
import { AppContext } from './0_AppContext'

const Link = props =>
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element 2</a>
    </div>

const Avatar = props =>
    <AppContext.Consumer>
        {({user, size}) => <img src={user} alt='Avatar' className='avatar' style={{ width: size, height: size }} />}
    </AppContext.Consumer>

const NavigatorBar = props =>
    <AppContext.Consumer>
        {({user}) => <Link href={user}><Avatar /></Link>}
    </AppContext.Consumer>

const PageLayout = props => <NavigatorBar />

const Page = props => <PageLayout />

export default Page

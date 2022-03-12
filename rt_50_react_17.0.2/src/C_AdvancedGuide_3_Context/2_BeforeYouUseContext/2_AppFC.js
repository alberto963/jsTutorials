import './0_App.css'

const Link = props => 
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element</a>
    </div>

const Avatar = props => 
    <img src={props.user} alt='Avatar' className='avatar' style={{ width: props.size, height: props.size }} />

const NavigatorBar = props => 
    <Link href={props.user}>
        <Avatar user={props.user} size={props.size} />
    </Link>

const PageLayout = props =>
    <NavigatorBar user={props.user} size={props.size} />

const Page = props =>
    <PageLayout user={props.user} size={props.size} />

export default Page

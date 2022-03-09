import './App.css'

const Link = (props) =>
    <div className='App'>
        {props.children}
        <a href={props.href}>The Anchor element</a>
    </div>

const Avatar = (props) =>
    <img src={props.user} alt='Avatar' className='avatar' style={{ width: props.size, height: props.size }} />

const NavigatorBar = (props) => props.userLink

const PageLayout = (props) => <NavigatorBar userLink={props.userLink} />

const Page = (props) => {
    const userLink =
        <Link href={props.user}>
            <Avatar user={props.user} size={props.size} />
        </Link>

    return <PageLayout userLink={userLink} />
}

export default Page

/* FROM REACT DOC:
    This inversion of control can make your code cleaner in many cases by reducing the amount of props
    you need to pass through your application and giving more control to the root components.
    Such inversion, however, isn’t the right choice in every case;
    moving more complexity higher in the tree makes those higher-level components more complicated
    and forces the lower-level components to be more flexible than you may want.
*/

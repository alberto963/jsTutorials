import { Component, forwardRef, createRef, useEffect } from 'react'

function logProps(WrappedComponent) {

    class LogProps extends Component {
        componentDidUpdate(prevProps) {
            console.info('oldProps=', prevProps)
            console.info('newprops=', this.props)
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    return LogProps
}

const FancyButton = forwardRef((props, ref) =>
    <button className='FuncyButton' ref={ref}>
        {props.children}
    </button>)

const FancyButtonWithLog = logProps(FancyButton)
// export default logProps(FancyButton)

// Now you can get a ref to the inner button
const MyButton = (props) => {
    const ref = createRef()
    useEffect(() => {
        console.info(ref.current)
    }, [ref])

    return <FancyButtonWithLog ref={ref}>Click me!</FancyButtonWithLog>
}

export default MyButton 
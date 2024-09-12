import { Component, forwardRef, createRef, useEffect } from 'react'

// Function Component
function EncapsulatedFuncyButton0(props) {
    return <button className='FuncyButton'>
        {props.children}
    </button>
}

// Class Component
class EncapsulatedFuncyButton1 extends Component {
    render() {
        return <button className='FuncyButton'>
            {this.props.children}
        </button>
    }
}

// Three different ways to write the same thing
const FancyButton = forwardRef((props, ref) =>
    <button className='FuncyButton' ref={ref}>
        {props.children}
    </button>)

const FancyButton2 = forwardRef(function (props, ref) {
    return <button className='FuncyButton' ref={ref}>
        {props.children}
    </button>
})

const FancyButton3 = forwardRef(function FancyButton(props, ref) {
    return <button className='FuncyButton' ref={ref}>
        {props.children}
    </button>
})

// Now you can get a ref to the inner button
const MyButton = (props) => {
    const ref = createRef()
    useEffect(() => {
        console.info(ref.current)
    }, [ref])

    return <FancyButton ref={ref}>Click me!</FancyButton>
}

export default MyButton 
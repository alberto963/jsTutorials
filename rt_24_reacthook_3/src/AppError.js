import React from 'react';

import './App.css';

class AppError extends React.Component {

    constructor(props) {
        super(props)
        this.state = { hasError: false, errorInfo: '', networkErrorInfo: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorInfo: `getDerivedStateFromError error: ${error.message}` }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, networkErrorInfo: `componentDidCatch error: ${error.message}` })
    }

    render() {
        if (this.state.hasError) {
            return <div><div className='error'>{this.state.errorInfo}</div><div className='error'>{this.state.networkErrorInfo}</div></div>
        }

        return this.props.children
    }
}

export default AppError
import React, { Component } from 'react'

interface Greeting {
    name: string,
    firstName: string,
    lastName: string
}

interface State {
    count: number
}

class HelloComp extends Component<Greeting, State> {
    state: State = {
        count: 0
    }
    static defaultProps = {
        firstName: '',
        lastName: ''
    }
    
    render() {
        return <button>Hello {this.props.name}</button>
    }
}

export default HelloComp
import React from 'react'

interface Greeting {
    name: string
}

const Hello = (props: Greeting) => <div>Hello {props.name}</div>

export default Hello
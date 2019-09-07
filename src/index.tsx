/*
 * @功能描述: 
 * @作者: 高云蛟
 * @Date: 2019-08-25 11:22:57
 */

// const hello: string = 'Hello TypeScripy'
// document.querySelectorAll('.app')[0].innerHTML = hello

import React from 'react'
import ReactDom from 'react-dom'

import Hello from './Hello'
import HelloComp from './HelloComp'

ReactDom.render(
    <Hello name='Type'/>,
    document.querySelectorAll('.app')[0]
)

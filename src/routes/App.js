import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './App.scss'

@cssModules(styles)
export default class App extends Component {
  render() {
    return (
      <div styleName="title">
        App
      </div>
    )
  }
}

import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.scss'

@CSSModules(styles)
export default class App extends Component {
  render () {
    return (
      <div styleName='title'>
        App
      </div>
    )
  }
}

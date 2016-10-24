import React from 'react'
import {render} from 'react-dom'
import App from './routes/App'

class Wrap extends React.Component {

  render(){
    return this.props.children
  }
}

render(
  <Wrap>
    <App />
  </Wrap>,
  document.getElementById('root')
)

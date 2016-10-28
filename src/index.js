import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import App from './routes/App'

class Wrap extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return this.props.children
  }
}

render(
  <Wrap>
    <App />
  </Wrap>,
  document.getElementById('root')
)

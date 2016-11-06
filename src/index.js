import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './routes/App'

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes/App', () => {
    const NextApp = require('./routes/App').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

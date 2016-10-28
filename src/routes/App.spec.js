import React from 'react'
import { expect } from 'chai'
import { render } from 'enzyme'

import App from './App'

describe('<App />', () => {
  it('renders div with style containing a title', () => {
    // arrange

    // act
    const app = render(<App />)

    // assert
    expect(app.text()).to.equal('App')
  })
})

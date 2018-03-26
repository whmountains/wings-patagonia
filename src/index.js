import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-source-sans-pro'
import 'typeface-spectral'

import './styles/base.css'
import './styles/fa-svg-with-js.css'

// required to kick off hydration process before react gets to it
import './lib/emotion'

// netlify identity
import './cms/browser'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render
  const render = (Comp) => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}

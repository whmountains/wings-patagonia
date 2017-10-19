import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Home from './containers/Home'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

if (window.parent.parent.CMS) {
  console.log('inside CMS preview')
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
    document.getElementById('root'),
  )
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}

registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import App from './App'

if (typeof window !== 'undefined') {
  if (window.parent.parent.CMS) {
    // render into the CMS preview window
    const context = {}
    ReactDOM.render(
      <StaticRouter
        location={'/' + (window.parent.parent.ROUTE_PATH || '')}
        context={context}
      >
        <App />
      </StaticRouter>,
      document.getElementById('root'),
    )
  } else {
    // render into the dev environment
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root'),
    )
  }
}

export const render = locals => {
  // render to string
  const context = {}
  const sheet = new ServerStyleSheet()

  const html = ReactDOMServer.renderToStaticMarkup(
    sheet.collectStyles(
      <StaticRouter location={locals.path} context={context}>
        <App />
      </StaticRouter>,
    ),
  )

  return {
    html,
    css: sheet.getStyleTags(),
  }
}

/* eslint-disable no-unused-vars */
/* eslint-env browser */
import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import netlifyIdentityWidget from 'netlify-identity-widget'
import { StaticRouter, Route } from 'react-router'
import React from 'react'

import Home from '../Home'

window.netlifyIdentity = netlifyIdentityWidget
netlifyIdentityWidget.init()

const context = {}

const makePreview = (path, Comp) => {
  const Preview = () => {
    return (
      <StaticRouter location={path} context={context}>
        <Route path={path} component={Comp} />
      </StaticRouter>
    )
  }
  return Preview
}

CMS.registerPreviewTemplate('home', makePreview('/', Home))

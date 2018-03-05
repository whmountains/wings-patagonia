import React from 'react'
import { Content } from '../../pages/index'

const PagePreview = ({ entry, widgetFor }) => <Content content={entry.toJS()} />

export default PagePreview

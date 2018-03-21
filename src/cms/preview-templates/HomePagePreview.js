import React from 'react'
import Content from '../../pages/index'

import seamlessSrc from '../../assets/seamless.jpg'

const PagePreview = ({ entry, widgetFor }) => {
  const data = {
    seamlessImg: seamlessSrc,
    globalStrings: {},
    homeStrings: {
      frontmatter: entry.toJS(),
    },
  }

  return <Content data={data} />
}
export default PagePreview

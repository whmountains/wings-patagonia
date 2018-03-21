import React from 'react'
import Img from 'gatsby-image'

export default (props) => {
  if (props.info && props.info.childImageSharp) {
    return <Img {...props.info.childImageSharp} {...props} />
  }

  return <img src={props.info} />
}

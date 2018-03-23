import React from 'react'
import PropTypes from 'prop-types'

// import { cx } from '../lib/emotion'
import styled from '../lib/react-emotion'
import Img from './GatsbyImage'

const SingleImage = styled.img`
  ${(p) =>
    p.fill &&
    `
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  `};
`

const Image = (props) => {
  if (typeof props.info === 'string') {
    return <SingleImage src={props.info} {...props} />
  }

  return <Img sizes={props.info} {...props} />
}

Image.propTyeps = {
  info: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
}

export default Image

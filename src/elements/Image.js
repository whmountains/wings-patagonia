import React from 'react'

import { cx, css } from '../lib/emotion'
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

const fill = css`
  height: 100%;
  width: 100%;
`

const Image = (props) => {
  if (typeof props.info === 'string') {
    return <SingleImage src={props.info} {...props} />
  }

  return (
    <Img
      sizes={props.info}
      {...props}
      className={cx(props.className, { [fill]: props.fill })}
      outerWrapperClassName={cx(props.outerWrapperClassName, {
        [fill]: props.fill,
      })}
    />
  )
}

export default Image

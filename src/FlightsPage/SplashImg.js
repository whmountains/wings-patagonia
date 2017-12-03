import React from 'react'
import styled from 'styled-components'

import { ResponsiveImage } from '../elements/Image'
import plane from '../assets/plane-on-glacier.jpg'

const Image = styled(ResponsiveImage)`
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  object-position: center;
`

const SplashImg = () => {
  return <Image info={plane} />
}

export default SplashImg

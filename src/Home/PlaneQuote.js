import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { withStrings } from '../lib/i18n'
import homeStrings from '../data/home.md'
import { ResponsiveImage } from '../elements/Image'

import plane from '../assets/aplane.jpg'

const Container = styled.div`
  height: 25rem;
  width: 100%;
  position: relative;
`

const Image = styled(ResponsiveImage)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: right;
  transform: rotate(-7deg);
`

const PlaneQuote = () => {
  return (
    <Container>
      <Image info={plane} />
    </Container>
  )
}

export default withStrings(PlaneQuote, homeStrings)

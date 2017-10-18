import React from 'react'
import styled from 'styled-components'
import { ResponsiveImage } from '../elements/Image.js'

import logo from '../assets/logo-gray.svg'
import mountain from '../assets/seamless.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Splash = styled.div`
  background: #e5ecf2;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60vh;
`
const Logo = styled.img`
  margin: auto;
`

// 1.6 aspect ratio
// Horizon line is at -32vw
const SeamlessImage = styled(ResponsiveImage)`
  &,
  & * {
    width: 100%;
  }
`

const BigSpace = styled.div`
  height: 200vh;
`

export default ({ title }) => {
  return (
    <Container>
      <Splash>
        <Logo src={logo} />
      </Splash>
      <SeamlessImage info={mountain} />
      <BigSpace />
    </Container>
  )
}

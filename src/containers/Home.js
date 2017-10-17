import React from 'react'
import { getSiteProps } from 'react-static'
import styled from 'styled-components'
// import { ResponsiveImage } from '../elements/Image.js'

import mountain from '../assets/seamless.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Splash = styled.div`
  height: 100vh;
  background: #e5ecf2;
`

export default ({ title }) => {
  console.log(mountain)

  return (
    <Container>
      <Splash>
        {/* <ResponsiveImage images={mountain} /> */}
        <img src={mountain} />
      </Splash>
    </Container>
  )
}

import React from 'react'
import styled from 'styled-components'

import { Slant } from '../elements/Slant'

const Container = styled.div`
  background: #2f4d65;
  flex-direction: column;
  color: white;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  padding: 2rem;
`

const Title = styled.h1`
  font-size: 3rem;
`

const Tagline = styled.p`
  width: 100%;
  max-width: 40rem;
`

const FlightsPage = () => {
  return [
    <Container key="header">
      <Title>Scenic Flights</Title>
      <Tagline>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu
        purus non nibh convallis elementum nec at leo. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Aliquam eu purus non nibh convallis
        elementum nec at leo.
      </Tagline>
    </Container>,
    <Slant bottom color="#2f4d65" key="slant" />,
  ]
}

export default FlightsPage

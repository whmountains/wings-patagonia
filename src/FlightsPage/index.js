import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import SplashImg from './SplashImg'
import FeaturesGrid from './FeaturesGrid'

const Container = styled.div`
  flex-direction: column;
  width: 100%;
`

const FlightsPage = () => {
  return (
    <Container>
      <Header />
      <SplashImg />
      <FeaturesGrid />
    </Container>
  )
}

export default FlightsPage

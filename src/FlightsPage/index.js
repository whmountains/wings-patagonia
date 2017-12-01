import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const Container = styled.div`
  flex-direction: column;
`

const FlightsPage = () => {
  return (
    <Container>
      <Header />
    </Container>
  )
}

export default FlightsPage

import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import TripOptions from './TripOptions'
import Partners from './Partners'
import FinalCall from './FinalCall'
import PlaneQuote from './PlaneQuote'

const Container = styled.div`
  margin-top: -5vw;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #444;
  background-color: #fcfbfa;
  overflow: hidden;
`

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 2em;
  margin-bottom: 1rem;
  z-index: 1;
`

const SectionSubtitle = styled.p`
  max-width: 800px;
  text-align: center;
  margin-bottom: 4rem;
`

const HomeBody = ({ data }) => {
  const strings = data.homeStrings.frontmatter

  return (
    <Container>
      <SectionTitle>{strings.optionsTitle}</SectionTitle>
      <SectionSubtitle>{strings.optionsSubtitle}</SectionSubtitle>
      <TripOptions data={data} />
      <PlaneQuote data={data} />

      <SectionTitle>{strings.ourPartnersTitle}</SectionTitle>
      <Partners data={data} />
      <FinalCall data={data} />
    </Container>
  )
}

export default HomeBody

import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import TripOptions from './TripOptions'
import Partners from './Partners'
import Footer from '../Footer'
import PlaneQuote from './PlaneQuote'

const Container = styled.div`
  display: flex;

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
  margin-bottom: 5.5rem;
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
      <Footer strings={data.globalStrings.frontmatter} />
    </Container>
  )
}

export default HomeBody

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { withStrings } from '../lib/i18n'

import TripOptions from './TripOptions'
import Partners from './Partners'
import FinalCall from './FinalCall'
import PlaneQuote from './PlaneQuote'

import homeStrings from '../data/home.md'

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
`

const SectionSubtitle = styled.p`
  max-width: 800px;
  text-align: center;
  margin-bottom: 4rem;
`

const HomeBody = ({ strings: s }) => {
  return (
    <Container>
      <SectionTitle>{s.get('optionsTitle')}</SectionTitle>
      <SectionSubtitle>{s.get('optionsSubtitle')}</SectionSubtitle>
      <TripOptions />
      <PlaneQuote />

      <SectionTitle>{s.get('ourPartnersTitle')}</SectionTitle>
      <Partners />
      <FinalCall />
    </Container>
  )
}

export default withStrings(HomeBody, homeStrings)

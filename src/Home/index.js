// external libs
import React from 'react'
import { withRouteData } from 'react-static'

// internal libs
import styled from '../lib/react-emotion'
import { css } from '../lib/emotion'
import Img from '../elements/Image'

// page sections
import TripOptions from './TripOptions'
import Partners from './Partners'
import PlaneQuote from './PlaneQuote'
import Splash from './Splash'

import Footer from '../components/Footer'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SeamlessImageContainer = styled(Img)`
  width: 100%;
  display: block;
  ${'' /* height: 51vw; */};
`
const imageContainerOuterStyles = css`
  z-index: -1 !important;
  background: linear-gradient(to bottom, #e5ecf2, white);
`

const WhiteContainer = styled.div`
  background: white;
`

const HomeBody = styled.div`
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

const Content = ({ homeStrings, footerStrings, seamlessImg }) => {
  return (
    <Container>
      <Splash strings={homeStrings} />
      <SeamlessImageContainer
        outerWrapperClassName={imageContainerOuterStyles}
        info={seamlessImg}
      />
      <WhiteContainer>
        <HomeBody>
          <SectionTitle>{homeStrings.optionsTitle}</SectionTitle>
          <SectionSubtitle>{homeStrings.optionsSubtitle}</SectionSubtitle>
          <TripOptions strings={homeStrings} />
          <PlaneQuote strings={homeStrings} />

          <SectionTitle>{homeStrings.ourPartnersTitle}</SectionTitle>
          <Partners strings={homeStrings} />
          <Footer strings={footerStrings} />
        </HomeBody>
      </WhiteContainer>
    </Container>
  )
}

export default withRouteData(Content)

import React from 'react'
import styled from 'react-emotion'

import PageContainer from '../../components/flightsPages/PageContainer.js'
import Splash from '../../components/flightsPages/Splash.js'
import CaseStudies from '../../components/flightsPages/CaseStudies'
import BuyNow from '../../components/flightsPages/BuyNow'
import Footer from '../../components/Footer'

const ScenicFlights = ({ data }) => {
  const strings = data.commercialStrings.frontmatter
  const globalStrings = data.globalStrings.frontmatter

  return (
    <PageContainer>
      <Splash strings={strings} />
      <CaseStudies strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={globalStrings} />
    </PageContainer>
  )
}

export default ScenicFlights

export const pageQuery = graphql`
  query CommercialFlightsQuery {
    globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
      frontmatter {
        ...FooterQuery
      }
    }
    commercialStrings: markdownRemark(
      fileAbsolutePath: { regex: "/commercial-flights.md$/" }
    ) {
      frontmatter {
        ...SplashStrings
        ...CaseStudiesStrings
        ...BuyNowQuery
      }
    }
  }
`

import React from 'react'
import styled from 'react-emotion'

import PageContainer from '../../components/flightsPages/PageContainer.js'
import Splash from '../../components/flightsPages/Splash.js'
import BuyNow from '../../components/flightsPages/BuyNow'
import Footer from '../../components/Footer'

const CustomFlights = ({ data }) => {
  const strings = data.customStrings.frontmatter
  const globalStrings = data.globalStrings.frontmatter

  return (
    <PageContainer>
      <Splash strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={globalStrings} />
    </PageContainer>
  )
}

export default CustomFlights

export const pageQuery = graphql`
  query CustomFlightsQuery {
    globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
      frontmatter {
        ...FooterQuery
      }
    }
    customStrings: markdownRemark(
      fileAbsolutePath: { regex: "/custom-flights.md$/" }
    ) {
      frontmatter {
        ...SplashStrings
        ...BuyNowQuery
      }
    }
  }
`

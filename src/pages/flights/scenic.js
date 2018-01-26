import React from 'react'
import styled from 'react-emotion'

import PageContainer from '../../components/flightsPages/PageContainer.js'
import Splash from '../../components/flightsPages/Splash.js'
import FeaturePages from '../../components/flightsPages/FeaturePages'
import BuyNow from '../../components/flightsPages/BuyNow'
import Footer from '../../components/Footer'

const ScenicFlights = ({ data }) => {
  const strings = data.scenicStrings.frontmatter
  const globalStrings = data.globalStrings.frontmatter

  console.log('strings', strings)
  console.log('globalStrings', globalStrings)

  return (
    <PageContainer>
      <Splash strings={strings} />
      <FeaturePages strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={globalStrings} />
    </PageContainer>
  )
}

export default ScenicFlights

export const pageQuery = graphql`
  query ScenicFlightsQuery {
    globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
      frontmatter {
        ...FooterQuery
      }
    }
    scenicStrings: markdownRemark(
      fileAbsolutePath: { regex: "/scenic-flights.md$/" }
    ) {
      frontmatter {
        ...SplashStrings
        ...FeaturePageStrings
        ...BuyNowQuery
      }
    }
  }
`

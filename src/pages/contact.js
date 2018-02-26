import React from 'react'
import styled from 'react-emotion'

import PageContainer from '../components/flightsPages/PageContainer.js'
import Splash from '../components/contact/Splash'
import Directions from '../components/contact/Directions'
import BuyNow from '../components/flightsPages/BuyNow'
import Footer from '../components/Footer'

const ScenicFlights = ({ data }) => {
  const strings = data.contactStrings.frontmatter
  const globalStrings = data.globalStrings.frontmatter

  return (
    <PageContainer>
      <Splash strings={strings} />
      <Directions strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={globalStrings} />
    </PageContainer>
  )
}

export default ScenicFlights

export const pageQuery = graphql`
  query ContactUsQuery {
    globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
      frontmatter {
        ...FooterQuery
      }
    }
    contactStrings: markdownRemark(
      fileAbsolutePath: { regex: "/contact.md$/" }
    ) {
      frontmatter {
        ...ContactSplashStrings
        ...DirectionsStrings
        ...CaseStudiesStrings
        ...BuyNowQuery
      }
    }
  }
`

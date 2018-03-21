import React from 'react'
import styled from 'react-emotion'

import PageContainer from '../components/flightsPages/PageContainer.js'
import Splash from '../components/contact/Splash'
import Directions from '../components/contact/Directions'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import AboutUs from '../components/contact/AboutUs'

const ScenicFlights = ({ data }) => {
  const strings = data.contactStrings.fields
  const globalStrings = data.globalStrings.frontmatter

  return (
    <PageContainer>
      <Splash strings={strings} />
      <Directions strings={strings} />
      <Faq strings={strings} />
      <AboutUs strings={strings} />
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
      fields {
        ...ContactSplashStrings
        ...DirectionsStrings
        ...FaqStrings
        ...AboutUsStrings
      }
    }
  }
`

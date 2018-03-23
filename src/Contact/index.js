import React from 'react'
import withRouteData from 'react-static'
// import styled from '../lib/react-emotion'

import Splash from './Splash'
import Directions from './Directions'
import AboutUs from './AboutUs'

import PageContainer from '../components/PageContainer.js'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

const ScenicFlights = ({ strings, footerStrings }) => {
  return (
    <PageContainer>
      <Splash strings={strings} />
      <Directions strings={strings} />
      <Faq strings={strings} />
      <AboutUs strings={strings} />
      <Footer strings={footerStrings} />
    </PageContainer>
  )
}

export default withRouteData(ScenicFlights)

// export const pageQuery = graphql`
//   query ContactUsQuery {
//     globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
//       frontmatter {
//         ...FooterQuery
//       }
//     }
//     contactStrings: markdownRemark(
//       fileAbsolutePath: { regex: "/contact.md$/" }
//     ) {
//       fields {
//         ...ContactSplashStrings
//         ...DirectionsStrings
//         ...FaqStrings
//         ...AboutUsStrings
//       }
//     }
//   }
// `

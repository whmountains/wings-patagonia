import React from 'react'
import { withRouteData } from 'react-static'

import PageContainer from '../components/PageContainer.js'
import Footer from '../components/Footer'

import Splash from './Splash.js'
import CaseStudies from './CaseStudies'
import BuyNow from './BuyNow'

const ScenicFlights = ({ strings, footerStrings }) => {
  return (
    <PageContainer>
      <Splash strings={strings} />
      <CaseStudies strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={footerStrings} />
    </PageContainer>
  )
}

export default withRouteData(ScenicFlights)

// export const pageQuery = graphql`
//   query CommercialFlightsQuery {
//     globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
//       frontmatter {
//         ...FooterQuery
//       }
//     }
//     commercialStrings: markdownRemark(
//       fileAbsolutePath: { regex: "/commercial-flights.md$/" }
//     ) {
//       frontmatter {
//         ...SplashStrings
//         ...CaseStudiesStrings
//         ...BuyNowQuery
//       }
//     }
//   }
// `

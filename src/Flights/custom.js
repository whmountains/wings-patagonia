import React from 'react'
import { withRouteData } from 'react-static'

import Footer from '../components/Footer'
import PageContainer from '../components/PageContainer.js'

import Splash from './Splash.js'
import BuyNow from './BuyNow'

const CustomFlights = ({ strings, footerStrings }) => {
  return (
    <PageContainer>
      <Splash strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={footerStrings} />
    </PageContainer>
  )
}

export default withRouteData(CustomFlights)

// export const pageQuery = graphql`
//   query CustomFlightsQuery {
//     globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
//       frontmatter {
//         ...FooterQuery
//       }
//     }
//     customStrings: markdownRemark(
//       fileAbsolutePath: { regex: "/custom-flights.md$/" }
//     ) {
//       frontmatter {
//         ...SplashStrings
//         ...BuyNowQuery
//       }
//     }
//   }
// `

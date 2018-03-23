import React from 'react'
import { withRouteData } from 'react-static'

import PageContainer from '../components/PageContainer.js'
import Splash from './Splash.js'
import FeaturePages from './FeaturePages'
import BuyNow from './BuyNow'

import Footer from '../components/Footer'

const ScenicFlights = ({ strings, footerStrings }) => {
  return (
    <PageContainer>
      <Splash strings={strings} />
      <FeaturePages strings={strings} />
      <BuyNow strings={strings} />
      <Footer strings={footerStrings} />
    </PageContainer>
  )
}

export default withRouteData(ScenicFlights)

// export const pageQuery = graphql`
//   query ScenicFlightsQuery {
//     globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
//       frontmatter {
//         ...FooterQuery
//       }
//     }
//     scenicStrings: markdownRemark(
//       fileAbsolutePath: { regex: "/scenic-flights.md$/" }
//     ) {
//       frontmatter {
//         ...SplashStrings
//         ...FeaturePageStrings
//         ...BuyNowQuery
//       }
//     }
//   }
// `

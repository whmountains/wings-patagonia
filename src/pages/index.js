import React from 'react'
import styled from 'react-emotion'
import { css } from 'emotion'

import Img from 'gatsby-image'
// import { withStrings } from '../lib/i18n'
//
import TripOptions from '../components/home/TripOptions'
import Splash from '../components/home/Splash'
// import mountain from '../assets/seamless.jpg'
// import homeStrings from '../data/home.md'

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
`

const WhiteContainer = styled.div`
  background: white;
`

class Home extends React.PureComponent {
  render() {
    const strings = this.props.data.homeStrings.frontmatter
    return (
      <Container>
        <Splash strings={strings} />
        <SeamlessImageContainer
          outerWrapperClassName={imageContainerOuterStyles}
          sizes={this.props.data.seamlessImg.childImageSharp.sizes}
        />
        <WhiteContainer>
          <TripOptions data={this.props.data} />
        </WhiteContainer>
      </Container>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query HomeQuery {
    seamlessImg: file(relativePath: { eq: "seamless.jpg" }) {
      childImageSharp {
        sizes(
          maxWidth: 5120
          traceSVG: { background: "transparent", color: "#999" }
        ) {
          # ...GatsbyImageSharpSizes_withWebp
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    homeStrings: markdownRemark(fileAbsolutePath: { regex: "/home.md$/" }) {
      frontmatter {
        title
        subtitle
        cta
        video
        scrollPrompt
        optionsTitle
        optionsSubtitle
        scenicFlightsTitle
        scenicFlightsSubtitle
        scenicFlightsAction
        scenicFlightsActionLink
        scenicFlightsInfo
        scenicFlightsInfoLink
        scenicFlightsImage {
          childImageSharp {
            sizes(
              maxWidth: 5120
              traceSVG: { background: "transparent", color: "#999" }
            ) {
              # ...GatsbyImageSharpSizes_withWebp
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
        customTripsTitle
        customTripsSubtitle
        customTripsAction
        customTripsActionLink
        customTripsInfo
        customTripsInfoLink
        customTripsImage {
          childImageSharp {
            sizes(
              maxWidth: 5120
              traceSVG: { background: "transparent", color: "#999" }
            ) {
              # ...GatsbyImageSharpSizes_withWebp
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
        commercialSolutionsTitle
        commercialSolutionsSubtitle
        commercialSolutionsAction
        commercialSolutionsActionLink
        commercialSolutionsInfo
        commercialSolutionsInfoLink
        commercialSolutionsImage {
          childImageSharp {
            sizes(
              maxWidth: 5120
              traceSVG: { background: "transparent", color: "#999" }
            ) {
              # ...GatsbyImageSharpSizes_withWebp
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
        ourPartnersTitle
        raveReview
        reviewAttr
        actionBtn
        actionBtnLink
        infoBtn
        infoBtnLink
        _PARENT
        parent
      }
    }
  }
`

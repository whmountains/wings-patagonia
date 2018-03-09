import React from 'react'
import styled from 'react-emotion'
import { css } from 'emotion'

import Img from 'gatsby-image'
// import { withStrings } from '../lib/i18n'
//
import Splash from '../components/home/Splash'
import HomeBody from '../components/home/HomeBody'

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

export const Content = ({ data }) => {
  const strings = data.homeStrings.frontmatter

  return (
    <Container>
      <Splash strings={strings} />
      <SeamlessImageContainer
        outerWrapperClassName={imageContainerOuterStyles}
        sizes={data.seamlessImg.childImageSharp.sizes}
      />
      <WhiteContainer>
        <HomeBody data={data} />
      </WhiteContainer>
    </Container>
  )
}

export default (props) => {
  return <Content data={props.data} />
}

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
    globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
      frontmatter {
        ...FooterQuery
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
        quoteText
        quoteAttr
        quoteBg {
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
        partnersSections {
          title
          logos {
            image
            name
            url
          }
        }
        _PARENT
        parent
      }
    }
  }
`

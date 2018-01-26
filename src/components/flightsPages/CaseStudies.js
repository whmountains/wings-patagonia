import React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'
import { Motion, spring } from 'react-motion'

const FeaturePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
  padding: 1rem 3rem;
`

const ImageContainer = styled.div`
  width: 800px;
  max-width: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  box-sizing: border-box;
  color: #444444;
  max-width: 800px;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 100;
  text-align: center;
  margin-bottom: 1rem;
`

const Subtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`

const Description = styled.p`
  font-size: 1rem;
  font-weight: 100;
  margin-bottom: 1rem;
`

const FeaturePage = ({ title, description, image, index }) => {
  return (
    <FeaturePageContainer>
      <ContentContainer>
        <Title>We Have Lots to Offer</Title>
        <Subtitle>{title}</Subtitle>
        <Description>{description}</Description>
      </ContentContainer>
      <ImageContainer>
        <Img sizes={image.childImageSharp.sizes} />
      </ImageContainer>
    </FeaturePageContainer>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  background: #eff4f7;
  overflow: hidden;
  ${'' /* max-width: 1300px; */} ${'' /* align-self: center; */};
`

const Nav = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  background: #444444;
  padding-top: 1rem;
  min-width: 13rem;
  flex: 1;
`

const NavItem = styled.li`
  display: flex;
  color: white;
  font-weight: 300;
  justify-content: flex-end;
  ${p =>
    p.active &&
    `
    background: white;
    color: black;
    font-weight: 400;
  `};
  padding: 0.6rem;
  margin: 0.5rem 0;
  cursor: pointer;
`

class CaseStudies extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
    }
  }
  render() {
    const { strings } = this.props
    return (
      <Container>
        <Nav>
          {strings.caseStudies.map((caseStudy, i) => {
            return (
              <NavItem
                active={i === this.state.currentPage}
                onMouseOver={() => this.setState({ currentPage: i })}
              >
                {caseStudy.shortTitle}
              </NavItem>
            )
          })}
        </Nav>
        <FeaturePage {...strings.caseStudies[this.state.currentPage]} />
      </Container>
    )
  }
}

export default CaseStudies

export const pageQuery = graphql`
  fragment CaseStudiesStrings on frontmatter_2 {
    caseStudies {
      shortTitle
      title
      description
      image {
        childImageSharp {
          sizes(
            maxWidth: 3000
            traceSVG: { background: "transparent", color: "#999" }
          ) {
            # ...GatsbyImageSharpSizes_withWebp
            ...GatsbyImageSharpSizes_withWebp_tracedSVG
          }
        }
      }
    }
  }
`

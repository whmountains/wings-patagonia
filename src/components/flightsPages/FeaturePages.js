import React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'
import { Motion, spring } from 'react-motion'

const FeaturePageContainer = styled.div`
  display: flex;
  height: 35rem;
  flex: none;
`

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;

  & .gatsby-image-outer-wrapper,
  & .gatsby-image-wrapper {
    height: 100%;
  }
`

const ContentContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 3rem;
  box-sizing: border-box;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 100;
  text-align: center;
`

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  font-weight: 100;
`

const FeaturePage = ({ title, description, image, index }) => {
  return (
    <FeaturePageContainer id={`ExP${index}`}>
      <ImageContainer>
        <Img sizes={image.childImageSharp.sizes} />
      </ImageContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentContainer>
    </FeaturePageContainer>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #5cc1d8, #5cc1d8, #2f8aab);
  height: 35rem;
  overflow: hidden;
`

const NavDots = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  width: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Dot = styled.a`
  display: flex;
  border-radius: 50%;
  width: 0.8rem;
  height: 0.8rem;
  box-sizing: border-box;
  border: 2px solid white;
  overflow: hidden;
  margin: 0.3rem 0;
  cursor: pointer;
`

const DotChild = styled.div`
  width: 5rem;
  height: 5rem;
  background: white;
  transition: opacity 0.1s;
  opacity: ${p => (p.active ? 1 : 0)};

  ${Dot}:hover & {
    opacity: 1;
  }
`

class FeaturePages extends React.Component {
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
        <Motion
          defaultStyle={{ y: -35 * this.state.currentPage }}
          style={{ y: spring(-35 * this.state.currentPage) }}
        >
          {({ y }) => (
            <div style={{ position: 'relative', top: `${y}rem` }}>
              {strings.featurePages.map((featuredSection, i) => (
                <FeaturePage {...featuredSection} index={i} />
              ))}
            </div>
          )}
        </Motion>

        <NavDots>
          {strings.featurePages.map((_, i) => (
            <Dot onClick={() => this.setState({ currentPage: i })}>
              <DotChild active={i === this.state.currentPage} />
            </Dot>
          ))}
        </NavDots>
      </Container>
    )
  }
}

export default FeaturePages

export const pageQuery = graphql`
  fragment FeaturePageStrings on frontmatter_2 {
    featurePages {
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

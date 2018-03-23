import React from 'react'
import { Motion, spring } from 'react-motion'

import styled from '../lib/react-emotion'
import Img from '../elements/Image'

const TABLET_BRK = '1000px'
const SECTION_HEIGHT_INT = 35
const SECTION_HEIGHT = SECTION_HEIGHT_INT + 'rem'

const FeaturePageContainer = styled.div`
  display: flex;
  height: ${SECTION_HEIGHT};
  flex: none;
  @media (max-width: ${TABLET_BRK}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  min-width: 0;

  & .gatsby-image-outer-wrapper,
  & .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;

  @media (max-width: ${TABLET_BRK}) {
    order: -1;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 3rem;
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
        <Img info={image} />
      </ImageContainer>
      <ContentContainer>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
      </ContentContainer>
    </FeaturePageContainer>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #5cc1d8, #5cc1d8, #2f8aab);
  height: ${SECTION_HEIGHT};
  overflow: hidden;

  @media (max-width: ${TABLET_BRK}) {
    height: auto;
  }
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

  @media (max-width: ${TABLET_BRK}) {
    display: none;
  }
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
  opacity: ${(p) => (p.active ? 1 : 0)};

  ${Dot}:hover & {
    opacity: 1;
  }
`

const FeaturePagesWrapper = styled.div`
  position: relative;
  ${'' /* display: flex; */}
  ${'' /* flex-direction: column; */}

  @media (max-width: ${TABLET_BRK}) {
    position: static;
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
      <Container className="featurePages">
        <Motion
          defaultStyle={{ y: this.state.currentPage }}
          style={{ y: spring(this.state.currentPage) }}
        >
          {({ y }) => (
            <FeaturePagesWrapper
              className="FeaturePagesWrapper"
              style={{
                top: `${y * -SECTION_HEIGHT_INT}rem`,
              }}
            >
              {strings.featurePages.map((featuredSection, i) => (
                <FeaturePage
                  {...featuredSection}
                  index={i}
                  key={JSON.stringify(featuredSection)}
                />
              ))}
            </FeaturePagesWrapper>
          )}
        </Motion>

        <NavDots>
          {strings.featurePages.map((_, i) => (
            <Dot
              key={String(i) + String(i === this.state.currentPage)}
              onClick={() => this.setState({ currentPage: i })}
            >
              <DotChild active={i === this.state.currentPage} />
            </Dot>
          ))}
        </NavDots>
      </Container>
    )
  }
}

export default FeaturePages

// export const pageQuery = graphql`
//   fragment FeaturePageStrings on frontmatter_2 {
//     featurePages {
//       title
//       description
//       image {
//         childImageSharp {
//           sizes(
//             maxWidth: 3000
//             traceSVG: { background: "transparent", color: "#999" }
//           ) {
//             # ...GatsbyImageSharpSizes_withWebp
//             ...GatsbyImageSharpSizes_withWebp_tracedSVG
//           }
//         }
//       }
//     }
//   }
// `

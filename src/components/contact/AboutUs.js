import React from 'react'
import styled from '../../lib/react-emotion'
import Image from '../../lib/Image'
import Remarkable from 'remarkable'

import { SvgSlant as Slant } from '../../elements/Slant'

const OuterWrapper = styled.div`
  position: relative;
  margin-top: 7vw;
`

const Container = styled.div`
  background: #89c9ff;
  padding: 2rem;
  display: flex;
  position: relative;
  justify-content: space-around;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: center;
`

const Title = styled.h2`
  color: #313131;
  font-size: 2rem;
  margin-bottom: 0.5em;
`

const About = styled.div`
  color: #fff;
  font-size: 0.9rem;

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }
`

const RightImage = styled.div`
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 1rem;
  border: 10px solid white;
  flex: none;
`

const AboutUs = ({ strings }) => {
  const md = new Remarkable()
  const renderedAboutUs = { __html: md.render(strings.aboutContent) }

  return (
    <OuterWrapper>
      <Slant color="#89c9ff" />
      <Container>
        <Left>
          <Title>{strings.aboutTitle}</Title>
          <About dangerouslySetInnerHTML={renderedAboutUs} />
        </Left>
        <RightImage>
          <Image info={strings.aboutImg} />
        </RightImage>
      </Container>
      <Slant bottom color="#89c9ff" />
    </OuterWrapper>
  )
}

export default AboutUs

export const pageQuery = graphql`
  fragment AboutUsStrings on fields_2 {
    aboutTitle
    aboutContent
    aboutImg {
      childImageSharp {
        sizes(
          maxWidth: 1000
          traceSVG: { background: "transparent", color: "#999" }
        ) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`

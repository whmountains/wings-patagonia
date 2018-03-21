import React from 'react'
import styled from 'react-emotion'
import Img from '../../lib/Image'
import FaIcon from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/fontawesome-free-solid'

import Nav from '../Nav'

import logoFlame from '../../assets/white-logo-flame.svg'

const Container = styled.div`
  display: flex;
  height: 35rem;
  position: relative;
  color: white;
  flex-direction: column;
  z-index: 1;
`

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  width: 100%;
  height: 100%;

  & .gatsby-image-outer-wrapper,
  & .gatsby-image-wrapper {
    height: 100%;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  margin-left: 1.5rem;
  max-width: 28rem;
`

const Title = styled.h1`
  font-size: 4rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
`

const Navbar = styled.nav`
  width: 100%;
  background: linear-gradient(to top, transparent, #4c5d6f);
  display: flex;
  height: 4rem;
  justify-content: space-between;
  padding: 0 1.3rem;
  box-sizing: border-box;
`

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  height: 3rem;
  list-style: none;
  font-weight: 300;
`

const Logo = styled.img``

const NavItem = styled.li`
  margin-left: 1rem;
`

const Splash = ({ strings }) => {
  return (
    <Container>
      <ImgContainer>
        <Img info={strings.splashImg} />
      </ImgContainer>
      <Nav />
      <ContentContainer>
        <Title>{strings.title}</Title>
        <Subtitle>{strings.description}</Subtitle>
      </ContentContainer>
    </Container>
  )
}

export default Splash

export const pageQuery = graphql`
  fragment SplashStrings on frontmatter_2 {
    title
    description
    splashImg {
      childImageSharp {
        sizes(
          maxWidth: 5120
          traceSVG: { background: "transparent", color: "#999" }
        ) {
          # ...GatsbyImageSharpSizes_withWebp
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`

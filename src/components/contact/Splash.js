import React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'
import FaIcon from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
  faCaretDown,
} from '@fortawesome/fontawesome-free-solid'

import logoFlame from '../../assets/white-logo-flame.svg'
import bg from '../../assets/contact-fill.svg'
import scenery from '../../assets/contact-scenery.svg'

const Container = styled.div`
  display: flex;
  height: 35rem;
  position: relative;
  color: white;
  flex-direction: column;
  z-index: 1;
  background: linear-gradient(-4deg, #59ac9d, #2e96ad);
`

const BgTexture = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  width: 100%;
  height: 100%;
  ${'' /* display: none; */};
`
const Scenery = styled.img`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  max-width: 28rem;
`

const Title = styled.h1`
  font-size: 4rem;
`

const Subtitle = styled.div`
  font-size: 1rem;
  background: white;
  color: #595959;
  padding: 1rem;
`

const Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
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

const ContactMethod = styled.div`
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const ContactRow = styled.div``
const ContactTitle = styled.h5`
  font-weight: bold;
`

const ContactInfo = styled.span`
  margin-left: 1rem;
`

const getIcon = (type) => {
  if (type === 'phone') {
    return <FaIcon icon={faPhone} />
  } else {
    return <FaIcon icon={faEnvelope} />
  }
}

const Splash = ({ strings }) => {
  return (
    <Container>
      <BgTexture src={bg} />
      <Scenery src={scenery} />
      <Navbar>
        <Logo src={logoFlame} />
        <NavItems>
          <NavItem>Home</NavItem>
          <NavItem>
            Flights <FaIcon icon={faCaretDown} />
          </NavItem>
          <NavItem>Contact Us</NavItem>
        </NavItems>
      </Navbar>
      <ContentContainer>
        <Title>{strings.title}</Title>
        <Subtitle>
          {strings.contactMethods.map((contactMethod) => (
            <ContactMethod
              key={
                contactMethod.type + contactMethod.info + contactMethod.title
              }
            >
              <ContactTitle>{contactMethod.title}</ContactTitle>
              <ContactRow>
                {getIcon(contactMethod.type)}
                <ContactInfo>{contactMethod.info}</ContactInfo>
              </ContactRow>
            </ContactMethod>
          ))}
        </Subtitle>
      </ContentContainer>
    </Container>
  )
}

export default Splash

export const pageQuery = graphql`
  fragment ContactSplashStrings on frontmatter_2 {
    title
    contactMethods {
      type
      info
      title
    }
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

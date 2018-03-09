import React from 'react'
import styled, { css } from 'react-emotion'
import Image from 'gatsby-image'
import FaIcon from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/fontawesome-free-solid'

import Nav from '../Nav.js'

// import bg from '../../assets/contact-fill.svg'
import bg from '../../assets/mountains-stars.jpg'
import scenery from '../../assets/contact-scenery.svg'

const Container = styled.div`
  display: flex;
  height: 35rem;
  position: relative;
  color: white;
  flex-direction: column;
  z-index: 1;
  background: linear-gradient(to bottom right, #72b6f7, #449add);
`

const BgTextureContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  width: 100%;
  height: 100%;
`

const bgTextureInner = css`
  width: 100%;
  height: 100%;
`

const bgTextureOuter = css`
  width: 100%;
  height: 100%;
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
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.div`
  font-size: 1rem;
  background: white;
  color: #595959;
  padding: 1.3rem 3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 450px) {
    padding: 1rem;
  }
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
      <BgTextureContainer>
        <Image
          className={bgTextureInner}
          outerWrapperClassName={bgTextureOuter}
          sizes={strings.backgroundImage.childImageSharp.sizes}
        />
      </BgTextureContainer>
      {/* <Scenery src={scenery} /> */}
      <Nav />
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
    backgroundImage {
      childImageSharp {
        sizes(
          maxWidth: 5800
          traceSVG: { background: "transparent", color: "#999" }
        ) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`

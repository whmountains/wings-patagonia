import React from 'react'
import styled from 'styled-components'

import { ResponsiveImage } from '../elements/Image'
import { SafeLink } from '../elements/Button'

import scenicFlights from '../assets/scenic-flights.jpg'
import customFlights from '../assets/custom-flights.jpg'
import scientificFlights from '../assets/scientific-flights.jpg'
import arrowRight from '../assets/arrow-right.svg'
import motoPatagonia from '../assets/moto-patagonia.png'
import promethius from '../assets/promethius-logo.png'
import html5 from '../assets/html5-logo.png'
import lonelyPlanet from '../assets/lonelyPlanet.png'
import nationalGeographic from '../assets/natgeo.png'
import nasaLogo from '../assets/nasa.png'
import planeSunset from '../assets/plane-sunset.jpg'

import { Link } from 'react-router-dom'

const Container = styled.div`
  margin-top: -5vw;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #444;
`

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 2em;
  margin-bottom: 2rem;
`

const SectionSubtitle = styled.p`
  max-width: 800px;
  text-align: center;
  margin-bottom: 3rem;
`

const ShadowedImage = styled(ResponsiveImage)`
  width: calc(${p => p.height} / 3 * 4);
  object-fit: cover;
  object-position: center;
  width: 100%;
  margin-bottom: 0.8rem;
`

const ImageRow = styled.div`
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;

  @media (max-width: 1300px) {
    flex-direction: column;
  }
`

const ImageContainerInner = styled.div`
  flex-direction: column;
  align-items: center;
  max-width: 22rem;
  margin: 0 0;
  padding: 0 1rem;
  box-sizing: border-box;
  background: #fff;
  ${'' /* min-height: 25rem; */}
  transform: scale(${p => p.scaleFactor});
  overflow: hidden;
  min-width: 16rem;

  border-right: 2px solid #ccc;
  &:last-child {
    border-right: none;
  }

  transition: transform 0.1s;

  @media (min-width: 1900px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 1300px) {
    border-right: none;
    margin-bottom: 3rem;
    max-width: 28rem;
  }

  *:hover > & {
    ${'' /* transform: scale(0.9); */};
  }

  &:hover {
    ${'' /* transform: scale(1); */};
  }
`

const Caption = styled.span`
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: bold;
`

const Description = styled.p`
  text-align: center;
  margin-bottom: 0.5rem;
`

const GoRow = styled.div``

const GoBtn = styled(Link)`
  ${'' /* color: #4a90e2; */} color: #3282e0;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 1rem;
`

const InfoBtn = styled(Link)`
  ${'' /* color: #666; */} color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  margin-left: 1rem;
`

const ImageContainer = ({
  caption,
  img,
  description,
  link,
  gotxt,
  infotxt,
}) => {
  return (
    <ImageContainerInner scaleFactor={1}>
      <ShadowedImage info={img} />
      <Caption>{caption}</Caption>
      <Description>{description}</Description>
      <GoRow>
        <GoBtn to={link}>{gotxt}</GoBtn>
        <InfoBtn to={link}>
          {infotxt} <i class="fa fa-arrow-right" aria-hidden="true" />
        </InfoBtn>
      </GoRow>
    </ImageContainerInner>
  )
}

export default () => {
  return (
    <Container>
      <SectionTitle>It's amazing up there!</SectionTitle>
      <SectionSubtitle>
        Whether you’re a tourist on a budget or want a VIP package all to
        yourself, we have something for you.
      </SectionSubtitle>

      <ImageRow>
        <ImageContainer
          img={scenicFlights}
          caption="Scenic Flights"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/scenic"
        />
        <ImageContainer
          img={customFlights}
          caption="Custom Trips"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/vip"
        />
        <ImageContainer
          img={scientificFlights}
          caption="Commercial Solutions"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/commercial"
        />
      </ImageRow>
      <SectionTitle>Our Partners</SectionTitle>
      <PartnersSection />
      <FiveStarSection />
    </Container>
  )
}

const PartnersContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  overflow: hidden;
`

const PartnersGrid = styled.div`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const PartnersHalf = styled.div`
  padding: 0 1rem;
  border-right: 2px solid #ccc;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  max-width: 700px;

  &:last-child {
    border-right: none;
  }
`

const SmallSectionTitle = styled.h3`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const PartnerImg = styled.img`
  width: 6rem;
  margin: 1rem;
`

const PartnersSection = () => {
  return (
    <PartnersContainer>
      <PartnersHalf>
        <SmallSectionTitle>Working With</SmallSectionTitle>
        <PartnersGrid>
          <PartnerImg src={motoPatagonia} />
          <PartnerImg src={html5} />
        </PartnersGrid>
      </PartnersHalf>
      <PartnersHalf>
        <SmallSectionTitle>As featured by</SmallSectionTitle>
        <PartnersGrid>
          <PartnerImg src={lonelyPlanet} />
        </PartnersGrid>
      </PartnersHalf>
      <PartnersHalf>
        <SmallSectionTitle>Customers</SmallSectionTitle>
        <PartnersGrid>
          <PartnerImg src={nationalGeographic} />
          <PartnerImg src={nasaLogo} />
        </PartnersGrid>
      </PartnersHalf>
    </PartnersContainer>
  )
}

const FiveStarContainer = styled.div`
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 5rem 1rem 8rem 1rem;
  box-sizing: border-box;
`
const BgImage = styled(ResponsiveImage)`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  z-index: -1;
`

const ContentContainer = styled.div``

const RatingRow = styled.div`
  color: #f8e71c;
  font-size: 4rem;
  letter-spacing: 0.9rem;
  margin-bottom: 2rem;
`

const RatingCaption = styled.div`
  flex-direction: column;
  align-items: flex-end;
  color: white;
  margin-bottom: 4em;
`

const RatingCaptionTitle = styled.h2`
  font-weight: 800;
  font-size: 5rem;
`

const RatingCaptionAttr = styled.span`
  font-weight: 500;
  font-size: 2rem;
`

const CtaRow = styled.div`
  flex-wrap: wrap;
  justify-content: center;
`

const TransparentFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 3rem;
  padding: 0 2rem;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(0deg, #0009, #0009 40%, #0000);
  justify-content: flex-end;
`

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  margin: 0 1rem;
  flex: none;

  &:hover {
    text-decoration: underline;
  }
`

export const HugeLinkButton = styled(SafeLink)`
  font-size: 2rem;
  height: 2em;
  padding: 0 1.5em;
  margin: 0.5em;
  display: flex;
  align-items: center;
  border-radius: 3px;
  text-decoration: none;
  color: inherit;
  ${p => p.accent && `color: white; background: #4a90e2;`};
  ${p => p.gray && `background: #eee;`};
  ${p => p.shadow && `box-shadow: 3px 5px 8px 1px #0006;`};

  & > img {
    margin-right: 0.5em;
    margin-bottom: 2px;
    width: 25px;
  }
`

const FiveStarSection = () => {
  return (
    <FiveStarContainer>
      <BgImage info={planeSunset} />
      <RatingRow>
        <i class="fa fa-star" aria-hidden="true" />
        <i class="fa fa-star" aria-hidden="true" />
        <i class="fa fa-star" aria-hidden="true" />
        <i class="fa fa-star" aria-hidden="true" />
        <i class="fa fa-star" aria-hidden="true" />
      </RatingRow>
      <RatingCaption>
        <RatingCaptionTitle>Best Flight Ever!</RatingCaptionTitle>
        <RatingCaptionAttr>-- Satisfied Customer</RatingCaptionAttr>
      </RatingCaption>

      <CtaRow>
        <HugeLinkButton accent shadow to="/contact">
          Book Now
        </HugeLinkButton>
        <HugeLinkButton gray shadow to="/contact">
          Contact Us
        </HugeLinkButton>
      </CtaRow>
      <TransparentFooter>
        <FooterLink to="https://whiting.io/">
          Website by Caleb Whiting
        </FooterLink>
      </TransparentFooter>
    </FiveStarContainer>
  )
}

import React from 'react'
import styled from 'styled-components'

import { ResponsiveImage } from '../elements/Image'

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
  width: 100%;
  margin-bottom: 0.8rem;
`

const ImageRow = styled.div`
  ${'' /* margin: 1rem 0; */} padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  margin-bottom: 5rem;
`

const ImageContainerInner = styled.div`
  flex-direction: column;
  align-items: center;
  ${'' /* box-shadow: 0 19px 45px rgba(0, 0, 0, 0.5); */} ${'' /* border-radius: 10px; */} width: 22rem;
  margin: 0 0;
  padding: 0 1rem;
  box-sizing: border-box;
  background: #fff;
  ${'' /* min-height: 25rem; */}
  transform: scale(${p => p.scaleFactor});
  overflow: hidden;

  border-right: 2px solid #ccc;
  &:last-child {
    border-right: none;
  }

  transition: transform 0.1s;

  @media (min-width: 1900px) {
    padding: 0 1.5rem;
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
  i,
  caption,
  img,
  description,
  link,
  gotxt,
  infotxt,
}) => {
  // const scaleFactor = {
  //   1: 0.9,
  //   2: 1,
  //   3: 0.9,
  // }[i]
  const scaleFactor = 1

  return (
    <ImageContainerInner scaleFactor={scaleFactor}>
      <ShadowedImage
        // innerStyles={imgStyles}
        // innerStyles={{ transform: `scale(${scaleFactor})` }}
        info={img}
        layer={i}
      />
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
          i={1}
          caption="Scenic Flights"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/scenic"
        />
        <ImageContainer
          img={customFlights}
          i={2}
          caption="Custom Trips"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/vip"
        />
        <ImageContainer
          img={scientificFlights}
          i={3}
          caption="Commercial Solutions"
          description="Three spectacular heli sight-seeing flight tours ranging from 20 - 55 minutes in length. Think... glaciers, waterfalls and mountains - oh my!"
          gotxt="Book Now"
          infotxt="More Info"
          link="/commercial"
        />
      </ImageRow>
      <SectionTitle>Our Partners</SectionTitle>
      <PartnersSection />
    </Container>
  )
}

const PartnersContainer = styled.div``

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

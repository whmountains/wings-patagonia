import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Slant } from '../elements/Slant'
import { ResponsiveImage } from '../elements/Image'

import scenicFlights from '../assets/scenic-flights.jpg'
import customFlights from '../assets/custom-flights.jpg'
import scientificFlights from '../assets/scientific-flights.jpg'

const CardContainer = styled.div`
  width: 17rem;
  max-width: 25rem;
  margin: 1rem;
  flex: auto;

  flex-direction: column;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.9rem;

  transition: border-color 0.2s;

  &:hover {
    border-color: hsla(212, 74%, 70%, 1);
  }

  @media (min-width: 1200px) {
    margin: 2rem;
  }
`

const Image = styled(ResponsiveImage)`
  width: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

const Description = styled.p`
  text-align: center;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GoRow = styled.div`
  margin-top: auto;
  width: 100%;
  justify-content: flex-end;
`

const GoBtn = styled(Link)`
  ${'' /* color: #4a90e2; */} color: #3282e0;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  ${'' /* margin-right: 1rem; */};
`

const InfoBtn = styled(Link)`
  ${'' /* color: #666; */} color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  margin-left: 1rem;
`

const Card = ({ img, caption, ...params }) => {
  console.log(img)

  return (
    <CardContainer {...params}>
      <Image info={img} />
      <Description>{caption}</Description>
    </CardContainer>
  )
}

const Container = styled.div`
  background: #edf2f6;
  flex-direction: column;
  color: #505050;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  padding: 2rem;
`

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`

const Tagline = styled.p`
  width: 100%;
  max-width: 25rem;
`

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: center;
  max-width: 50rem;
`

const FlightsPage = () => {
  return [
    <Slant top color="#edf2f6" key="slant" />,
    <Container key="header">
      <Title>Highlights from a typical flight</Title>
      <Cards>
        <Card img={customFlights} caption="Andes Mountains" />
        <Card img={scenicFlights} caption="Ice Fields" />
        <Card img={scientificFlights} caption="Twin Peaks" />
        <Card img={customFlights} caption="Lago O'Higgins" />
      </Cards>
    </Container>,
  ]
}

export default FlightsPage

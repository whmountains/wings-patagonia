import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ResponsiveImage } from '../elements/Image'
import { withStrings } from '../lib/i18n'

import scenicFlights from '../assets/scenic-flights.jpg'
import customFlights from '../assets/custom-flights.jpg'
import scientificFlights from '../assets/scientific-flights.jpg'
import homeStrings from '../data/home.md'

const Row = styled.div`
  display: grid;

  padding: 0 5rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5rem;

  grid-template: auto auto / repeat(2, 1fr);
  grid-gap: 2rem;

  @media (max-width: 1300px) {
    ${'' /* flex-direction: column; */};
  }

  @media (max-width: 800px) {
    ${'' /* padding: 1rem 1rem; */};
  }
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  grid-gap: 1rem;

  align-items: center;
  padding: 1rem;
  background: #fff;
  transform: scale(${p => p.scaleFactor});
  overflow: hidden;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  @media (min-width: 1900px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 1300px) {
    border-right: none;
    margin-bottom: 3rem;
    max-width: 28rem;
  }

  &:hover {
    border-color: hsla(212, 74%, 70%, 1);
  }

  ${p => p.large && 'grid-column: span 2;'};
`

const Image = styled(ResponsiveImage).attrs({
  outerStyles: {
    height: '100%',
  },
})`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
`

const CardContents = styled.div`
  flex-direction: column;
`

const Title = styled.span`
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: bold;
  font-family: spectral;
`

const Description = styled.p`
  margin-bottom: 0.5rem;
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

const Card = ({ img, strings, prefix, ...params }) => {
  const t = str => {
    return strings.get(prefix + str)
  }

  return (
    <CardContainer scaleFactor={1} {...params}>
      <Image info={img} />
      <CardContents>
        <Title>{t('Title')}</Title>
        <Description>{t('Subtitle')}</Description>
        <GoRow>
          <GoBtn to={t('ActionLink')}>
            {t('Action')} <i className="fa fa-arrow-right" aria-hidden="true" />
          </GoBtn>
          {/* <InfoBtn to={t('InfoLink')}>
            {t('Info')} <i className="fa fa-arrow-right" aria-hidden="true" />
          </InfoBtn> */}
        </GoRow>
      </CardContents>
    </CardContainer>
  )
}

const TripOptions = ({ strings: s }) => {
  return (
    <Row>
      <Card large img={scenicFlights} prefix="scenicFlights" strings={s} />
      <Card img={customFlights} prefix="customTrips" strings={s} />
      <Card img={scientificFlights} prefix="commercialSolutions" strings={s} />
    </Row>
  )
}

export default withStrings(TripOptions, homeStrings)

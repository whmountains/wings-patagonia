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
  padding: 1rem 5rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    padding: 1rem 1rem;
  }
`

const CardContainer = styled.div`
  flex-direction: column;
  align-items: center;
  max-width: 22rem;
  margin: 0 2rem;
  padding: 1rem;
  background: #fff;
  transform: scale(${p => (p.large ? 1.2 : 1)});
  overflow: hidden;
  min-width: 16rem;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 5px;
  box-sizing: border-box;
  flex: 1;
  height: 100%;

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
`

const Image = styled(ResponsiveImage)`
  width: calc(${p => p.height} / 3 * 4);
  object-fit: cover;
  object-position: center;
  width: 100%;
  margin-bottom: 0.8rem;
  border-radius: 2px;
`

const Title = styled.span`
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: bold;
  font-family: spectral;
`

const Description = styled.p`
  text-align: center;
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
    <CardContainer {...params}>
      <Image info={img} />
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
    </CardContainer>
  )
}

const SlantBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eaf6fd;
  transform: rotate(-7deg) scale(1.5, 0.9);
`

const TripOptions = ({ strings: s }) => {
  return (
    <Row>
      <SlantBg />
      <Card img={customFlights} prefix="customTrips" strings={s} />
      <Card large img={scenicFlights} prefix="scenicFlights" strings={s} />
      <Card img={scientificFlights} prefix="commercialSolutions" strings={s} />
    </Row>
  )
}

export default withStrings(TripOptions, homeStrings)

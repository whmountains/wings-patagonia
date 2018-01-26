// @flow

import React from 'react'
import styled from 'react-emotion'
import { css } from 'emotion'
import { Link } from 'react-router-dom'
import Img from 'gatsby-image'
import FaIcon from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'

import { SafeLink } from '../../elements/Button'

// import scenicFlights from '../assets/scenic-flights.jpg'
// import customFlights from '../assets/custom-flights.jpg'
// import scientificFlights from '../assets/scientific-flights.jpg'

const Row = styled.div`
  display: flex;
  padding: 1rem 5rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    padding: 1rem 1rem;
  }
`

const CardContainer = styled(SafeLink)`
  display: flex;

  flex-direction: column;
  align-items: center;
  max-width: 22rem;
  margin: 0 2rem;
  padding: 0.4rem;
  ${'' /* padding: 0.6rem; */} background: #fff;
  transform: scale(${p => (p.large ? 1.2 : 1)});
  overflow: hidden;
  min-width: 16rem;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 5px;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  color: inherit;
  text-decoration: inherit;
  z-index: 1;

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

const Image = styled(Img)`
  width: calc(${p => p.height} / 3 * 4);
  object-fit: cover;
  object-position: center;
  width: 100%;
  display: block;
  ${'' /* margin-bottom: 0.8rem; */} border-radius: 2px;
`

const imageContainerExpander = css`
  width: 100%;
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
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: flex-end;
`

const GoBtn = styled.span`
  ${'' /* background: none;
  border: none; */} ${'' /* color: #4a90e2; */} color: #3282e0;
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

const RestOfCard = styled.div`
  display: flex;
  padding: 0.6rem;
  align-items: inherit;
  flex-direction: inherit;
  flex: auto;
`

const Card = ({ strings, prefix, ...params }) => {
  const t = str => {
    return strings[prefix + str]
  }

  return (
    <CardContainer to={t('ActionLink')} {...params}>
      <Image
        sizes={t('Image').childImageSharp.sizes}
        outerWrapperClassName={imageContainerExpander}
      />
      <RestOfCard>
        <Title>{t('Title')}</Title>
        <Description>{t('Subtitle')}</Description>
        <GoRow>
          <GoBtn>
            {t('Action')} <FaIcon icon={faArrowRight} />
          </GoBtn>
          {/* <InfoBtn to={t('InfoLink')}>
          {t('Info')} <i className="fa fa-arrow-right" aria-hidden="true" />
        </InfoBtn> */}
        </GoRow>
      </RestOfCard>
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

const TripOptions = ({ data }) => {
  const strings = data.homeStrings.frontmatter
  return (
    <Row>
      <SlantBg />
      <Card prefix="customTrips" strings={strings} />
      <Card large prefix="scenicFlights" strings={strings} />
      <Card prefix="commercialSolutions" strings={strings} />
    </Row>
  )
}

export default TripOptions

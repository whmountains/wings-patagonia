import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { withStrings } from '../lib/i18n'
import homeStrings from '../data/home.md'
import { ResponsiveImage } from '../elements/Image'

import plane from '../assets/aplane.jpg'

const Container = styled.div`
  height: 40rem;
  width: 100%;
  position: relative;
  margin-top: -6rem;
`

const Image = styled(ResponsiveImage)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 75%;
`

const BottomCut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  background: white;
  transform: rotate(-7deg) scale(1.5, 1) translateY(5.5rem);
`

const QuoteContainer = styled.div`
  height: 100%;
  width: 35%;
  color: white;
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  margin-top: 1rem;
  margin-left: 3rem;
  font-weight: 300;
`

const Quote = styled.p``

const QAttr = styled.span`
  margin-top: 0.7em;
  font-style: italic;
`

const PlaneQuote = () => {
  return (
    <Container>
      <Image info={plane} />
      <BottomCut />
      <QuoteContainer>
        <Quote>
          “Once you have tasted flight, you will forever walk the earth with
          your eyes turned skyward, for there you have been, and there you will
          always long to return.”
        </Quote>
        <QAttr>- Leonardo da Vinci</QAttr>
      </QuoteContainer>
    </Container>
  )
}

export default withStrings(PlaneQuote, homeStrings)

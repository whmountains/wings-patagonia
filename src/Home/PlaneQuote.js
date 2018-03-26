import React from 'react'
// import { css } from '../lib/emotion'
import styled from '../lib/react-emotion'
import Img from '../elements/Image'

const Container = styled.div`
  display: flex;
  height: 40rem;
  width: 100%;
  position: relative;
  margin-top: calc(-0.5 * (100vw + 25px) * 0.12278456);
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

// const imageOuter = css`
//   height: 100%;
// `
//
// const imageInner = css`
//   display: block;
//   height: 100%;
// `

const BottomCut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* h = w sin(7), adding 25px padding in case of scrollbars */
  height: calc((100vw + 25px) * 0.12186934341);
  background: #fcfbfa;
  transform-origin: bottom right;
  transform: rotate(-7deg) scale(1.5, 1) translateX(50px);
`

const QuoteContainer = styled.div`
  display: flex;
  height: 100%;
  width: 35%;
  color: white;
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
  margin-top: 1rem;
  margin-left: 3rem;
  font-weight: 300;

  @media (max-width: 900px) {
    width: 50%;
  }
`

const Quote = styled.p``

const QAttr = styled.span`
  margin-top: 0.7em;
  font-style: italic;
`

const PlaneQuote = ({ strings }) => {
  return (
    <Container>
      <ImageContainer>
        <Img fill info={strings.quoteBg} />
      </ImageContainer>
      <BottomCut />
      <QuoteContainer>
        <Quote>&quot;{strings.quoteText}&quot;</Quote>
        <QAttr>- {strings.quoteAttr}</QAttr>
      </QuoteContainer>
    </Container>
  )
}

export default PlaneQuote

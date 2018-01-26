import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import Img from 'gatsby-image'

const Container = styled.div`
  height: 40rem;
  width: 100%;
  position: relative;
  margin-top: -6rem;
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  & > div {
    display: block;
    width: 100%;
  }
`

const Image = styled(Img)`
  display: block;
  ${'' /* object-fit: cover;
  object-position: 50% 75%; */};
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

const PlaneQuote = ({ data }) => {
  const strings = data.homeStrings.frontmatter
  return (
    <Container>
      <ImageContainer>
        <Image sizes={strings.quoteBg.childImageSharp.sizes} />
      </ImageContainer>
      <BottomCut />
      <QuoteContainer>
        <Quote>"{strings.quoteText}"</Quote>
        <QAttr>- {strings.quoteAttr}</QAttr>
      </QuoteContainer>
    </Container>
  )
}

export default PlaneQuote

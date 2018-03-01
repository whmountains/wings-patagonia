import React from 'react'
import styled, { keyframes } from 'react-emotion'

// import { withStrings } from '../../lib/i18n'
import { LinkButton } from '../../elements/Button.js'

import logo from '../../assets/logo-gray.svg'
import scrollDown from '../../assets/scroll-down.svg'
import yt from '../../assets/youtube-play.svg'

const Container = styled.div`
  display: flex;
  width: 100%;
  background: #e5ecf2;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
`
const Logo = styled.img`
  margin: auto;
  height: 13rem;
  margin-bottom: 1rem;
`

const Separator = styled.div`
  width: 30rem;
  max-width: calc(100% - 5rem);
  border-bottom: 2px solid #777;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: calc(100% - 5rem);
  width: 700px;
  text-align: center;
  margin-bottom: 1.5rem;
`

const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 3rem;
`

const MoreBelow = styled.div`
  margin-bottom: 0.5rem;
`

const bounce = keyframes`
  start {
    transform: translateY(0);
  }

  30% {
    transform: translateY(5px);
  }

  60% {
    transform: translateY(0);
  }
`

const DownIcon = styled.img`
  animation: 1.5s ${bounce} linear infinite;
`

export default ({ strings: s }) => {
  return (
    <Container>
      <Logo src={logo} alt="Wings Logo" />
      <Separator />
      <Subtitle>{s.subtitle}</Subtitle>
      <ActionButtons>
        <LinkButton accent to="/contact">
          {s.cta}
        </LinkButton>
        <LinkButton to="/film">
          <img src={yt} alt="" />
          <span>{s.video}</span>
        </LinkButton>
      </ActionButtons>
      <MoreBelow>{s.scrollPrompt}</MoreBelow>
      <DownIcon src={scrollDown} alt="Scroll Down" />
    </Container>
  )
}

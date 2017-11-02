import React from 'react'
import styled, { keyframes } from 'styled-components'

import { ResponsiveImage } from '../elements/Image.js'
import { LinkButton } from '../elements/Button.js'
import { t } from '../lib/i18n'
import TripOptions from '../containers/TripOptions'

import logo from '../assets/logo-gray.svg'
import mountain from '../assets/seamless.jpg'
import scrollDown from '../assets/scroll-down.svg'
import yt from '../assets/youtube-play.svg'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Splash = styled.div`
  width: 100%;
  background: #e5ecf2;
  position: relative;
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

const SeamlessImage = styled(ResponsiveImage)`
  width: 100%;
  display: block;
  height: 51vw;
  object-fit: cover;
`

const WhiteContainer = styled.div`
  background: white;
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

export default class Home extends React.PureComponent {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.parent.parent.FORCE_UPDATE_HOOK = () => this.forceUpdate()
    }
  }
  render() {
    return (
      <Container>
        <Splash>
          <Logo src={logo} alt="Wings Logo" />
          <Separator />
          <Subtitle>{t('subtitle')}</Subtitle>
          <ActionButtons>
            <LinkButton accent to="/contact">
              {t('cta')}
            </LinkButton>
            <LinkButton to="/film">
              <img src={yt} alt="" />
              <span>{t('video')}</span>
            </LinkButton>
          </ActionButtons>
          <MoreBelow>{t('scrollPrompt')}</MoreBelow>
          <DownIcon src={scrollDown} alt="Scroll Down" />
        </Splash>
        <SeamlessImage info={mountain} />
        <WhiteContainer>
          <TripOptions />
        </WhiteContainer>
      </Container>
    )
  }
}

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import { ResponsiveImage } from '../elements/Image.js'
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
  height: 200vh;
  background: white;
`

const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 3rem;
`

const SafeLink = props => {
  return <Link {...props} accent={undefined} />
}

const Button = styled(SafeLink)`
  font-size: 1rem;
  height: 2.5rem;
  padding: 0 1.5rem;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 3px;
  text-decoration: none;
  color: inherit;
  ${p => p.accent && `color: white; background: #4a90e2;`};

  & > img {
    margin-right: 0.5em;
    margin-bottom: 2px;
    width: 25px;
  }
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
            <Button accent to="/contact">
              {t('cta')}
            </Button>
            <Button to="/film">
              <img src={yt} alt="" />
              <span>{t('video')}</span>
            </Button>
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

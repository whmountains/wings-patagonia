import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import { ResponsiveImage } from '../elements/Image.js'
import { t } from '../lib/i18n'

import logo from '../assets/logo-gray.svg'
import mountain from '../assets/seamless.jpg'
import scrollDown from '../assets/scroll-down.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Splash = styled.div`
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
  border-bottom: 2px solid #777;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  text-align: center;
  margin-bottom: 1.5rem;
`

// 1.6 aspect ratio
// Horizon line is at -32vw
const SeamlessImage = styled(ResponsiveImage)`
  &,
  & * {
    width: 100%;
    display: block;
  }
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

  & > i {
    margin-right: 0.5em;
    margin-bottom: 2px;
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
    window.parent.parent.FORCE_UPDATE_HOOK = () => this.forceUpdate()
  }
  render() {
    return (
      <Container>
        <Splash>
          <Logo src={logo} />
          <Separator />
          <Subtitle>{t('subtitle')}</Subtitle>
          <ActionButtons>
            <Button accent to="/contact">
              Book a Flight
            </Button>
            <Button to="/film">
              <i className="fa fa-youtube-play" aria-hidden="true" />
              <span>Watch the film</span>
            </Button>
          </ActionButtons>
          <MoreBelow>Descend to see more.</MoreBelow>
          <DownIcon src={scrollDown} />
        </Splash>
        <SeamlessImage info={mountain} />
        <WhiteContainer />
      </Container>
    )
  }
}

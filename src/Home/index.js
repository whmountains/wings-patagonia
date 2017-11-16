import React from 'react'
import styled from 'styled-components'

import { ResponsiveImage } from '../elements/Image.js'
import { withStrings } from '../lib/i18n'

import TripOptions from './HomeBody'
import Splash from './Splash'
import mountain from '../assets/seamless.jpg'
import homeStrings from '../data/home.md'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

class Home extends React.PureComponent {
  render() {
    const s = this.props.strings

    return (
      <Container>
        <Splash />
        <SeamlessImage info={mountain} />
        <WhiteContainer>
          <TripOptions />
        </WhiteContainer>
      </Container>
    )
  }
}

export default withStrings(Home, homeStrings)

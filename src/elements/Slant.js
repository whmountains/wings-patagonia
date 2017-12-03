import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 0;
  width: 100%;
  position: relative;
`

const Container = styled.div`
  position: absolute;
  ${p => p.bottom && 'top: 0;'} ${p => p.top && 'bottom: 0;'};
  left: 0;
  width: 100%;
  height: 7vw;
  overflow: hidden;
`

const Angle = styled.div`
  height: 100%;
  width: 100%;
  background: ${p => p.color};
  transform: ${p => (p.top ? 'translateY(100%)' : 'translateY(-100%)')}
    scaleX(2) rotate(-7deg);
  transform-origin: ${p => (p.top ? 'left top' : 'right bottom')};
`

export const Slant = ({ top, color }) => {
  return (
    <Wrapper>
      <Container top={top}>
        <Angle color={color} top={top} />
      </Container>
    </Wrapper>
  )
}

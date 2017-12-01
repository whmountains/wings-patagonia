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
  height: 7vw;
  width: 100%;
  background: ${p => p.color};
  transform-origin: left top;
  transform: scaleX(2) rotate(-7deg) translateX(-50vw);
  top: 0;
  left: 0;
`

export const Slant = ({ bottom, top, color }) => {
  return (
    <Wrapper>
      <Container bottom={bottom} top={top}>
        <Angle color={color} />
      </Container>
    </Wrapper>
  )
}

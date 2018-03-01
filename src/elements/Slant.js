import React from 'react'
import styled, { css, cx } from 'react-emotion'

const Wrapper = styled.div`
  height: 0;
  width: 100%;
  position: relative;
`

const Container = styled.div`
  position: absolute;
  ${(p) => p.bottom && 'top: 0;'} ${(p) => p.top && 'bottom: 0;'};
  left: 0;
  width: 100%;
  height: 7vw;
  overflow: hidden;
`

const Angle = styled.div`
  height: 100%;
  width: 100%;
  background: ${(p) => p.color};
  transform: ${(p) => (p.top ? 'translateY(100%)' : 'translateY(-100%)')}
    scaleX(2) rotate(-7deg);
  transform-origin: ${(p) => (p.top ? 'left top' : 'right bottom')};
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

const ZeroSizeWrapper = styled.div`
  height: 0;
  width: 100%;
  position: relative;
  z-index: 5;
`

const bzero = css`
  bottom: -1px;
`

const tzero = css`
  top: -1px;
`

const SvgContainer = styled.svg`
  position: absolute;
  left: 0;
  width: 100%;
  height: 7vw;
  overflow: hidden;
`

export const SvgSlant = ({ className, bottom }) => {
  return (
    <ZeroSizeWrapper>
      <SvgContainer
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="1.4"
        className={cx({ [bzero]: !bottom, [tzero]: bottom }, className)}
        preserveAspectRatio="none"
        bottom={bottom}
      >
        <path
          d={bottom ? 'M0 24V0h24L0 24z' : 'M0 24h24V0L0 24z'}
          fill="#89c9ff"
        />
      </SvgContainer>
    </ZeroSizeWrapper>
  )
}

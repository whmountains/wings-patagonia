import React from 'react'
import styled from 'styled-components'

import { withStrings } from '../lib/i18n'
import { ResponsiveImage } from '../elements/Image'
import { SafeLink } from '../elements/Button'

import arrowRight from '../assets/arrow-right.svg'
import planeSunset from '../assets/plane-sunset.jpg'

import homeStrings from '../data/home.md'

const FiveStarContainer = styled.div`
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 5rem 1rem 8rem 1rem;
  box-sizing: border-box;
`
const BgImage = styled(ResponsiveImage)`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  z-index: -1;
`

const ContentContainer = styled.div``

const RatingRow = styled.div`
  color: #f8e71c;
  font-size: 4rem;
  letter-spacing: 0.9rem;
  margin-bottom: 2rem;
`

const RatingCaption = styled.div`
  flex-direction: column;
  align-items: flex-end;
  color: white;
  margin-bottom: 4em;
`

const RatingCaptionTitle = styled.h2`
  font-weight: 800;
  font-size: 5rem;
`

const RatingCaptionAttr = styled.span`
  font-weight: 500;
  font-size: 2rem;
`

const CtaRow = styled.div`
  flex-wrap: wrap;
  justify-content: center;
`

const TransparentFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 3rem;
  padding: 0 2rem;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(0deg, #0009, #0009 40%, #0000);
  justify-content: flex-end;
`

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  margin: 0 1rem;
  flex: none;

  &:hover {
    text-decoration: underline;
  }
`

export const HugeLinkButton = styled(SafeLink)`
  font-size: 2rem;
  height: 2em;
  padding: 0 1.5em;
  margin: 0.5em;
  display: flex;
  align-items: center;
  border-radius: 3px;
  text-decoration: none;
  color: inherit;
  ${p => p.accent && `color: white; background: #4a90e2;`};
  ${p => p.gray && `background: #eee;`};
  ${p => p.shadow && `box-shadow: 3px 5px 8px 1px #0006;`};

  & > img {
    margin-right: 0.5em;
    margin-bottom: 2px;
    width: 25px;
  }
`

const FiveStarSection = ({ strings: s }) => {
  return (
    <FiveStarContainer>
      <BgImage info={planeSunset} />
      <RatingRow>
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
      </RatingRow>
      <RatingCaption>
        <RatingCaptionTitle>{s.get('raveReview')}</RatingCaptionTitle>
        <RatingCaptionAttr>-- {s.get('reviewAttr')}</RatingCaptionAttr>
      </RatingCaption>

      <CtaRow>
        <HugeLinkButton accent shadow to={s.get('actionBtnLink')}>
          {s.get('actionBtn')}
        </HugeLinkButton>
        <HugeLinkButton gray shadow to={s.get('infoBtnLink')}>
          {s.get('infoBtn')}
        </HugeLinkButton>
      </CtaRow>
      <TransparentFooter>
        <FooterLink href="https://whiting.io/" target="_blank">
          Website by Caleb Whiting
        </FooterLink>
      </TransparentFooter>
    </FiveStarContainer>
  )
}

export default withStrings(FiveStarSection, homeStrings)

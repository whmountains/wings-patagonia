import React from 'react'
import styled from 'styled-components'

import { withStrings } from '../lib/i18n'

import homeStrings from '../data/home.md'

const PartnersContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  z-index: 1;
`

const PartnersGrid = styled.div`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const PartnersHalf = styled.div`
  padding: 0 1rem;
  border-right: 2px solid #ccc;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  max-width: 700px;

  &:last-child {
    border-right: none;
  }
`

const SmallSectionTitle = styled.h3`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const PartnerImg = styled.img`
  width: 6rem;
  margin: 1rem;
`

const PartnersSection = ({ strings: s }) => {
  return (
    <PartnersContainer>
      {s.get('partnersSections').map(section => {
        return (
          <PartnersHalf key={section.get('title')}>
            <SmallSectionTitle>{section.get('title')}</SmallSectionTitle>
            <PartnersGrid>
              {section
                .get('logos')
                .map(logo => (
                  <PartnerImg
                    src={logo.get('image')}
                    alt={logo.get('name')}
                    key={logo.get('name') + logo.get('image') + logo.get('url')}
                  />
                ))}
            </PartnersGrid>
          </PartnersHalf>
        )
      })}
    </PartnersContainer>
  )
}

export default withStrings(PartnersSection, homeStrings)

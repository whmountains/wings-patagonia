import React from 'react'
import styled from 'react-emotion'

const PartnersContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  z-index: 1;
`

const PartnersGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const PartnersHalf = styled.div`
  display: flex;
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

const PartnersSection = ({ data }) => {
  const strings = data.homeStrings.frontmatter

  console.log(strings)

  return (
    <PartnersContainer>
      {strings.partnersSections.map(section => {
        return (
          <PartnersHalf key={section.title}>
            <SmallSectionTitle>{section.title}</SmallSectionTitle>
            <PartnersGrid>
              {section.logos.map(logo => (
                <PartnerImg
                  src={logo.image}
                  alt={logo.name}
                  key={logo.name + logo.image + logo.url}
                />
              ))}
            </PartnersGrid>
          </PartnersHalf>
        )
      })}
    </PartnersContainer>
  )
}

export default PartnersSection

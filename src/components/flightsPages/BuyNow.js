import React from 'react'
import styled from '../../lib/react-emotion'
import FaIcon from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'

import { SafeLink } from '../../elements/Button'

const Container = styled.div`
  padding: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  color: #5aa3e8;
  font-size: 3em;
`

const Description = styled.p`
  color: #555555;
  text-align: center;
  width: 30rem;
  max-width: 80%;
`

const ButtonRow = styled.div`
  display: flex;
`

const Button = styled(SafeLink)`
  font-weight: bold;
  color: #5aa3e8;
`

const BuyNow = ({ strings }) => {
  return (
    <Container>
      <Title>{strings.ctaTitle}</Title>
      <Description>{strings.ctaSubtitle}</Description>
      <ButtonRow>
        <Button to={strings.ctaActionLink}>
          {strings.ctaActionTxt} <FaIcon icon={faArrowRight} />
        </Button>
      </ButtonRow>
    </Container>
  )
}

export default BuyNow

export const pageQuery = graphql`
  fragment BuyNowQuery on frontmatter_2 {
    ctaTitle
    ctaSubtitle
    ctaActionTxt
    ctaActionLink
  }
`

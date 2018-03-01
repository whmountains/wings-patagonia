import React from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  padding: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 2rem;
  color: #313131;
  margin-bottom: 1rem;
`

const border = '1px solid #979797'

const QuestionC = styled.div`
  border-top: ${border};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:last-child {
    border-bottom: ${border};
  }
`

const QuestionQ = styled.div`
  font-weight: bold;
  color: #595959;
`

const QuestionA = styled.div`
  color: #7b7b7b;
`

class Faq extends React.Component {
  render() {
    const strings = this.props.strings

    return (
      <Container>
        <Title>Frequently Asked Questions</Title>
        {strings.faq.map(({ q, a }) => {
          return (
            <QuestionC key={q}>
              <QuestionQ>Q: {q}</QuestionQ>
              <QuestionA>A: {a}</QuestionA>
            </QuestionC>
          )
        })}
      </Container>
    )
  }
}

export default Faq

export const pageQuery = graphql`
  fragment FaqStrings on frontmatter_2 {
    faq {
      q
      a
    }
  }
`

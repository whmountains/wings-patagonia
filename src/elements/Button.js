import React from 'react'
import styled from '../lib/react-emotion'
import { Link } from 'react-static'

export const SafeLink = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export const LinkButton = styled(SafeLink)`
  font-size: 1rem;
  height: 2.5em;
  padding: 0 1.5em;
  margin: 0 0.5em;
  display: flex;
  align-items: center;
  border-radius: 3px;
  text-decoration: none;
  color: inherit;
  ${(p) => p.accent && `color: white; background: #4a90e2;`};

  & > img {
    margin-right: 0.5em;
    margin-bottom: 2px;
    width: 25px;
  }
`

import React from 'react'

import { pickBy } from 'ramda'

export const blacklistProps = (blacklist, Component) => {
  return (props) => {
    const filteredProps = pickBy((v, k) => !blacklist.includes(k), props)
    return <Component {...filteredProps} />
  }
}

export const whitelistProps = (whitelist, Component) => {
  return (props) => {
    const filteredProps = pick(whitelist, props)
    return <Component {...filteredProps} />
  }
}

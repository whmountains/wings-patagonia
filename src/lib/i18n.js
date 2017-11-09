import React from 'react'
import { fromJS } from 'immutable'

const getCMS = () => {
  if (typeof window !== 'undefined' && window.parent.parent.CMS_CHANNEL) {
    return window.parent.parent.CMS_CHANNEL
  }
}

// export const t = (key, fallback = '') => {
//   if (typeof window !== 'undefined' && window.parent.parent.CMS) {
//     // inside netlify CMS preview window
//     return (
//       (window.parent.parent.CMS_STRINGS &&
//         window.parent.parent.CMS_STRINGS[key]) ||
//       fallback
//     )
//   } else {
//     // load from github
//     return strings[key] || fallback
//   }
// }

export const withStrings = (Component, fallbackStrings) => {
  const cms = getCMS()

  if (cms) {
    return class StringsWrapper extends React.Component {
      constructor() {
        super()
        this.state = {
          strings: cms.getStrings(),
        }
      }
      update = strings => {
        this.setState(strings)
      }
      componentDidMount() {
        let cms = getCMS()
        if (cms) {
          cms.subscribe(this.update)
        }
      }
      componentWillUnmount() {
        let cms = getCMS()
        if (cms) {
          cms.unsubscribe(this.update)
        }
      }
      render() {
        return <Component {...this.props} strings={this.state.strings} />
      }
    }
  } else {
    return () => (
      <Component {...this.props} strings={fromJS(fallbackStrings || {})} />
    )
  }
}

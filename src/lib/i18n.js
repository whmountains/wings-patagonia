import strings from './GENERATE_STRINGS.js'

export const t = (key, fallback = '') => {
  if (typeof window !== 'undefined' && window.parent.parent.CMS) {
    // inside netlify CMS preview window
    return (
      (window.parent.parent.CMS_STRINGS &&
        window.parent.parent.CMS_STRINGS[key]) ||
      fallback
    )
  } else {
    // load from github
    return strings[key] || fallback
  }
}

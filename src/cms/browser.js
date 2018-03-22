import netlifyIdentityWidget from 'netlify-identity-widget'

export const initIdentity = () => {
  netlifyIdentityWidget.on(`init`, (user) => {
    if (!user) {
      netlifyIdentityWidget.on(`login`, () => {
        document.location.href = `/admin/`
      })
    }
  })
  netlifyIdentityWidget.init()
}

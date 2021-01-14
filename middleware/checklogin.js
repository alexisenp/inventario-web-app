export default async function (context) {
  // eslint-disable-next-line
  console.log('Ejecuta checklogin middleware')
  if (context.route.path !== '/login' && !await context.store.getters.isLoggedIn) {
    return context.redirect('/login')
  }
}

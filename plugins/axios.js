export default function ({ $axios, store, route }) {
  $axios.onRequest((config) => {
    if (!config.externalResource) {
      config.headers.common.Authorization = `Bearer ${store.state.session.token}`
    }
  })
}

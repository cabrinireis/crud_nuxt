export default function ({ $axios, store, route }) {
  $axios.onRequest((config) => {
    if (!config.externalResource) {
      config.headers.common.Authorization = `Bearer ${store.state.session.token}`
    }
  })

  $axios.onError((error) => {
    if (error.ignore) {
      return
    }
    if (!error.response.data.success) {
      let message = 'Entity not found'
      if (error.data?.errors?.length) {
        message = error.data.errors.map((e) => e?.message).join('<br>')
      }
      store.commit(
        'notification/SET_NOTIFICATION',
        ['danger', 'Ops', message],
        {
          root: true,
        }
      )
      throw error
    }
    throw error
  })
}

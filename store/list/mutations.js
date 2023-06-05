export default {
  SET_LIST(state, payload) {
    state.list = payload.data.entities.map((el) => {
      el.actions = 'null'
      return el
    })
    state.pagination = payload.data.pagination
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

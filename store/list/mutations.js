export default {
  SET_LIST(state, payload) {
    state.list = payload.data.entities
    state.pagination = payload.data.pagination
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

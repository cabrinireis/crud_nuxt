export default {
  SET_LIST(state, payload) {
    state.list = payload.data.entities.map((el) => {
      el.actions = 'null'
      return el
    })
    state.success = payload.success
    state.pagination = payload.data.pagination
  },
  SET_HOUSE(state, payload) {
    state.house = payload.data
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

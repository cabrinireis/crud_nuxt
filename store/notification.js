export const state = () => ({
  notification: {},
})

export const mutations = {
  SET_NOTIFICATION(state, payload) {
    state.notification = payload
  },
}

export default {
  async LIST({ commit }) {
    commit('SET_LOADING', true)
    await this.$axios
      .get('/api/admin/house_rules')
      .then(({ data }) => {
        commit('SET_LIST', data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async UPDATE_HOUSE({ commit }, params) {
    commit('SET_LOADING', true)
    await this.$axios
      .put(
        `/api/admin/house_rules/${params.id}`,
        (params = { house_rules: params.params })
      )
      .then(({ data }) => {
        commit('SET_LIST', data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
}

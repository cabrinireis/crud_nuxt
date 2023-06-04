export default {
  async LIST({ commit, dispatch }) {
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
}

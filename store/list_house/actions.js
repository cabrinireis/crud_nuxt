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

  async UPDATE_HOUSE({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    await this.$axios
      .put(
        `/api/admin/house_rules/${params.id}`,
        (params = { house_rules: params.params })
      )
      .then(({ success }) => {
        if (success) dispatch('LIST')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async READ_HOUSE({ commit }, id) {
    commit('SET_LOADING', true)
    await this.$axios
      .get(`/api/admin/house_rules/${id}`)
      .then(({ data }) => {
        if (data) commit('SET_HOUSE', data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async CREATE_HOUSE({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    await this.$axios
      .post(
        `/api/admin/house_rules/`,
        (params = { house_rules: params.params })
      )
      .then(({ data }) => {
        if (data) dispatch('LIST')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async DELETE_HOUSE({ commit, dispatch }, id) {
    commit('SET_LOADING', true)
    await this.$axios
      .delete(`/api/admin/house_rules/${id}`)
      .then(({ data }) => {
        if (data) dispatch('LIST')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
}
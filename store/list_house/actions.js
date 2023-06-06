export default {
  async GET_HOUSES({ commit }, page) {
    commit('SET_LOADING', true)
    await this.$axios
      .get(
        `/api/admin/house_rules`,
        page
          ? {
              params: {
                page,
              },
            }
          : ''
      )
      .then(({ data }) => {
        commit('SET_LIST', data)
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
      .then(() => {
        commit(
          'notification/SET_NOTIFICATION',
          ['success', 'Success', 'Entities retrieved successfully.'],
          { root: true }
        )
        this.$router.push('/')
        dispatch('GET_HOUSES')
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
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async CREATE_HOUSE({ commit, dispatch }, params) {
    commit('SET_LOADING', true)
    await this.$axios
      .post(`/api/admin/house_rules/`, (params = { house_rules: params }))
      .then(() => {
        commit(
          'notification/SET_NOTIFICATION',
          ['success', 'Success', 'Entities retrieved successfully.'],
          { root: true }
        )
        this.$router.push('/')
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async DELETE_HOUSE({ commit, dispatch }, id) {
    commit('SET_LOADING', true)
    await this.$axios
      .delete(`/api/admin/house_rules/${id}`)
      .then(() => {
        commit(
          'notification/SET_NOTIFICATION',
          ['success', 'Success', 'Entity removed successfully.'],
          { root: true }
        )
        dispatch('GET_HOUSES')
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
}

<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <b-table
          id="my-table"
          :items="list"
          :per-page="configPagination.perPage"
          :current-page="configPagination.current_page"
          small
        ></b-table>
        <b-pagination
          v-model="configPagination.current_page"
          :total-rows="list.length"
          :per-page="configPagination.perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'Vuex'
export default {
  data() {
    return {
      configPagination: {
        total: 1,
        count: 1,
        per_page: 1,
        current_page: 1,
        total_pages: 1,
        links: { next: null, prev: null },
      },
    }
  },
  computed: {
    ...mapState('list', {
      loader: 'loading',
      list: 'list',
      pagination: 'pagination',
    }),
  },

  async mounted() {
    await this.getList()
    if (this.list.length) {
      this.configPagination = { ...this.pagination }
    }
  },
  methods: {
    ...mapActions('list', {
      getList: 'LIST',
    }),
  },
}
</script>

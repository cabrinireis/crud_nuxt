<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <b-table
          :items="list"
          :busy="loader"
          :per-page="configPagination.perPage"
          :current-page="configPagination.current_page"
          small
        >
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <template #cell(actions)="data">
            <b-button
              size="sm"
              variant="outline-primary"
              @click="onEdit(data.item)"
            >
              <b-icon-pencil aria-hidden="true"></b-icon-pencil>
            </b-button>
            <b-button
              size="sm"
              variant="outline-primary"
              @click="onRemove(data.item)"
            >
              <b-icon-trash aria-hidden="true"></b-icon-trash>
            </b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="configPagination.current_page"
          :total-rows="list.length"
          :per-page="configPagination.perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-modal v-model="modalShow" hide-footer :title="title">
      <HouseForm :data="form" @closeModal="modalShow = !modalShow" />
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'Vuex'

export default {
  components: {
    HouseForm: () => import('@/components/FormHouse.vue'),
  },
  data() {
    return {
      title: '',
      modalShow: false,
      form: {},
      configPagination: {
        total: 1,
        count: 1,
        per_page: 1,
        current_page: 1,
        total_pages: 1,
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
    onEdit(editItem) {
      this.form = editItem
      this.title = `Edit house: ${editItem.id}`
      this.modalShow = !this.modalShow
    },
    onRemove(editItem) {
      this.title = `Delete house: ${editItem.id}`
    },
  },
}
</script>

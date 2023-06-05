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
            <nuxt-link :to="`house/${data.item.id}/show`" class="mr-2">
              <b-icon-eye aria-hidden="true"></b-icon-eye>
            </nuxt-link>
            <nuxt-link :to="`house/${data.item.id}/edit`" class="mr-2">
              <b-icon-pencil aria-hidden="true"></b-icon-pencil>
            </nuxt-link>
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
      <HouseForm :id="id" :data="form" @closeModal="modalShow = !modalShow" />
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
      id: '',
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
    ...mapState('list_house', {
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
    ...mapActions('list_house', {
      getList: 'LIST',
      readHouse: 'READ_HOUSE',
    }),
    onEdit({ name, active, id }) {
      this.id = id
      this.form = { name, active }
      this.title = `Edit house: ${id}`
      this.modalShow = !this.modalShow
    },
    async onRead({ id }) {
      this.$router()
      await this.readHouse(id)
    },
    onRemove(editItem) {
      this.title = `Delete house: ${editItem.id}`
    },
  },
}
</script>

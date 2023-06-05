<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col class="d-flex justify-content-end mb-4">
        <b-button
          type="submit"
          variant="primary"
          @click="$router.push('/house/new')"
        >
          <b-icon-plus aria-hidden="true" class="mr-2"></b-icon-plus>Add
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :items="list"
          :per-page="configPagination.perPage"
          :current-page="configPagination.current_page"
          small
          show-empty
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
            <b-link @click="onRemove(data.item)">
              <b-icon-trash aria-hidden="true"></b-icon-trash>
            </b-link>
          </template>
        </b-table>
        <b-pagination
          v-model="configPagination.current_page"
          :total-rows="list.length"
          :per-page="configPagination.perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
      <b-overlay :show="loader" no-wrap></b-overlay>
    </b-row>
    <b-overlay :show="dialogDelete" no-wrap>
      <template #overlay>
        <div
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p>
            <strong id="form-confirm-label">Are you sure {{ title }}?</strong>
          </p>
          <div>
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="onConfirmeDelete"
              >OK</b-button
            >
          </div>
        </div>
      </template>
    </b-overlay>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      title: '',
      modalShow: false,
      dialogDelete: false,
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
      getList: 'GET_HOUSES',
      readHouse: 'READ_HOUSE',
      deleteHouse: 'DELETE_HOUSE',
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
    onCancel() {
      this.dialogDelete = false
    },
    onRemove(removeItem) {
      this.dialogDelete = true
      this.id = removeItem.id
      this.title = `Delete house: ${removeItem.id}`
    },
    async onConfirmeDelete() {
      await this.deleteHouse(this.id)
      this.dialogDelete = false
      this.id = ''
    },
  },
}
</script>

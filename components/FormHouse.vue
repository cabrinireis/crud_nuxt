<template>
  <b-container v-if="true" class="bv-example-row">
    <b-row class="d-flex justify-content-center">
      <b-col cols="8">
        <b-form @submit="onSave">
          <b-form-group id="name" label="Name:" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              :readonly="readonly"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="active" label="Active:" label-for="active">
            <b-form-input
              id="active"
              v-model="form.active"
              type="number"
              required
              :readonly="readonly"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col
              v-if="!readonly"
              cols="12"
              class="d-flex justify-content-end"
            >
              <b-button type="submit" variant="primary">Save</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    mode: {
      type: String,
      default: 'read',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        name: '',
        active: 0,
      },
    }
  },
  computed: {
    readonly() {
      return this.mode === 'read'
    },
  },
  beforeDestroy() {
    this.form.name = ''
    this.form.active = 0
  },
  mounted() {
    if (this.mode !== 'create') this.form = { ...this.data }
  },
  methods: {
    ...mapMutations('notification', {
      setNotification: 'SET_NOTIFICATION',
    }),
    ...mapActions('list_house', {
      updateHouse: 'UPDATE_HOUSE',
      createHouse: 'CREATE_HOUSE',
    }),
    onClose() {
      this.$emit('closeModal')
    },
    async onSave(event) {
      event.preventDefault()
      if (this.mode === 'edit') {
        await this.updateHouse({ params: this.form, id: this.$route.params.id })
      } else {
        await this.createHouse(this.form)
      }
    },
  },
}
</script>

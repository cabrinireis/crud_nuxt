<template>
  <b-container class="bv-example-row">
    <b-row class="d-flex justify-content-center">
      <b-col cols="8">
        <b-form @submit="onSave">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
              :readonly="readonly"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Active:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.active"
              required
              :readonly="readonly"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col v-if="readonly" cols="12" class="d-flex justify-content-end">
              <b-button
                type="reset"
                class="mr-3"
                variant="secondary"
                @click="$router.push('/')"
              >
                Back
              </b-button>
            </b-col>
            <b-col v-else cols="12" class="d-flex justify-content-end">
              <b-button
                type="reset"
                class="mr-3"
                variant="secondary"
                @click="onClose"
              >
                Cancel
              </b-button>
              <b-button type="submit" variant="primary" @click="onSave"
                >Save</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'Vuex'
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
  created() {
    this.form = { ...this.data }
  },
  methods: {
    ...mapActions('list_house', {
      update: 'UPDATE_HOUSE',
    }),
    onClose() {
      this.$emit('closeModal')
    },
    async onSave(event) {
      event.preventDefault()
      await this.update({ params: this.form, id: this.$route.params.id })
      this.$router.push('/')
    },
  },
}
</script>

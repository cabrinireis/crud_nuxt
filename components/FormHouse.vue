<template>
  <div>
    <b-form @submit="onSave">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Active:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.active"
          required
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-group-3" label="Order:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.order" required></b-form-input>
      </b-form-group> -->
      <b-row>
        <b-col cols="12" class="d-flex justify-content-end">
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
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
export default {
  props: {
    id: {
      type: Number,
      default: 0,
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
    onSave(event) {
      event.preventDefault()
      console.log(this.id)
      this.update({ params: this.form, id: this.id })
    },
  },
}
</script>

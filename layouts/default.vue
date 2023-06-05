<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark" class="mb-5">
      <b-navbar-brand href="#">Home roules</b-navbar-brand>
      <b-button
        type="reset"
        class="mr-3"
        variant="secondary"
        @click="$router.push('/')"
      >
        Back
      </b-button>
    </b-navbar>
    <b-toast
      id="notify"
      :variant="notifyState"
      :title="notifyTitle"
      solid
      @hidden="closeNotification"
    >
      {{ notifyMessage }}
    </b-toast>
    <nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex'
export default {
  data() {
    return {
      notifyTitle: '',
      notifyMessage: '',
      notifyState: '',
    }
  },
  computed: {
    ...mapState('notification', ['notification']),
  },

  watch: {
    notification([state, title, message]) {
      if (state) this.$bvToast.show('notify')
      this.notifyState = state
      this.notifyTitle = title
      this.notifyMessage = message
    },
  },

  methods: {
    ...mapMutations('notification', {
      setNotification: 'SET_NOTIFICATION',
    }),
    closeNotification(event) {
      if (event.type === 'hidden') this.setNotification([])
    },
  },
}
</script>

<style></style>

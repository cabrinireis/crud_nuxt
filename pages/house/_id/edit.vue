<template>
  <div>
    <HouseForm v-if="!loading" :data="house" mode="edit" />
    <b-overlay :show="loading" no-wrap></b-overlay>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    HouseForm: () => import('@/components/FormHouse.vue'),
  },
  computed: {
    ...mapState('list_house', ['house', 'loading']),
  },
  async created() {
    await this.readHouse(this.$route.params.id)
  },
  methods: {
    ...mapActions('list_house', {
      readHouse: 'READ_HOUSE',
    }),
  },
}
</script>

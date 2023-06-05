<template>
  <div>
    <HouseForm v-if="!loading" :data="house" mode="edit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'Vuex'
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

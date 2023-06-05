<template>
  <HouseForm mode="create" />
</template>

<script>
export default {
  components: {
    HouseForm: () => import('@/components/FormHouse.vue'),
  },
}
</script>

<template>
  <div>
    <div v-if="error.statusCode === 404" class="d-flex justify-content-center">
      <h1>Page not found</h1>
    </div>
    <div v-else class="d-flex justify-content-center">
      <h1>An error occurred</h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'], // you can set a custom layout for the error page
}
</script>

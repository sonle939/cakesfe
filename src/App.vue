<template>
  <div id="app">
    <AuthUser />
  </div>
</template>

<script>
import AuthUser from "./components/AuthUser.vue";

export default {
  name: "App",
  components: {
    AuthUser,
  },
};
</script>

<style>
</style>

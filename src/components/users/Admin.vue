<template>
  <div class="admin">
    <Navbar />
    <div class="admin_wrapper">
      <Sidebar />
      <div class="admin_content">abcd</div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin",
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style scoped>
@import "../../style/components/admin.css";
</style>
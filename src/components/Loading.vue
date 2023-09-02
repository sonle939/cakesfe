<template>
  <div class="loading">
    <grid-loader :color="color" :size="size"></grid-loader>
  </div>
</template>
  
  <script>
import GridLoader from "vue-spinner/src/GridLoader.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loading",
  data() {
    return {
      color: "#50b83c",
      size: "20px",
      margin: "0px 40px",
      radius: "2px",
    };
  },
  components: {
    GridLoader,
  },
};
</script>
  
<style>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -200px;
  margin-left: -140px;
}
</style> 
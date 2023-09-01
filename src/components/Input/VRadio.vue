<template>
  <input
    type="radio"
    class="option-input radio_check"
    :name="valueName"
    :id="valueID"
  />
</template>
  
  <script>
export default {
  name: "VRadio",
  props: ["valueID", "valueName"],
};
</script>
  
  <style>
</style>
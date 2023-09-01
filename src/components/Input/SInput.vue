<template>
  <label class="slabel">
    {{ label }}
    <input
      :type="type"
      class="sinput"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "SInput",
  data() {
    return {
      inputValue: this.value,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: [String, Number, Date],
  },
  watch: {
    inputValue(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style>
</style>
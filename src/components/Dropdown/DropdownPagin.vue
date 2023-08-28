<template>
  <div class="amount_cb">
    <input
      type="text"
      :disabled="showIsHide"
      :v-model="pageSize"
      @focus="HIDE"
      style="color: black !important"
    />
    <i
      :class="showIsHide ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'"
    ></i>
    <ul class="oveylay_amount" v-show="showIsHide">
      <li @click="setSize(15)">15</li>
      <li @click="setSize(20)">20</li>
      <li @click="setSize(30)">30</li>
      <li @click="setSize(50)">50</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropdownPagin",
};
</script>

<style>
</style>
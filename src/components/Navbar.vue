<template>
  <div class="navbar">
    <div class="navbar_left">
      <img src="../assets/logonavbar.png" alt="" />
    </div>
    <div class="navbar_right">
      <label>
        <i class="bx bx-search-alt"></i>
        <input type="text" placeholder="Tìm kiếm thông tin..." />
      </label>
      <div class="icon_list">
        <div class="icon_item">
          <i class="bx bx-info-circle"></i>
        </div>
        <div class="icon_item">
          <i class="bx bx-bell"></i>
        </div>
        <div class="icon_item">
          <i class="bx bx-fullscreen"></i>
        </div>
      </div>
      <div class="right_image">
        <div class="image_user">
          <img src="../assets/avt.jpg" alt="" />
        </div>
        <div class="text_right">
          <h2>Lê Xuân Sơn</h2>
          <p>Adminisator</p>
        </div>
        <i class="bx bx-chevron-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
};
</script>

<style scoped>
@import "../style/components/navbar.css";
</style>
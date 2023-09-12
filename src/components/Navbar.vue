<template>
  <div class="navbar">
    <div class="navbar_left">
      <img src="../assets/logonavbarxoaphong.png" alt="" />
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
      <div class="right_image" @click="handleShow()">
        <div class="image_user">
          <img src="../assets/avt.jpg" alt="" />
        </div>
        <div class="text_right">
          <h2>Lê Xuân Sơn</h2>
          <p>Adminisator</p>
        </div>
        <i class="bx bx-chevron-down"></i>
        <div class="right_image_overlist" v-if="isshowOverlaylist">
          <div class="overlaylist_item">
            <i class="bx bx-info-circle"></i>
            <p>Thông tin cá nhân</p>
          </div>
          <div class="overlaylist_item" @click="delDataUserlogin()">
            <i class="bx bx-log-out-circle"></i>
            <router-link to="/">Đăng Xuất</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { createToast } from "mosha-vue-toastify";
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  setup() {
    const toastSuccess = () => {
      createToast(
        {
          title: "Đăng nhập",
          description: "Đăng nhập thành công",
        },
        {
          type: "success",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastError = () => {
      createToast(
        {
          title: "Đăng nhập",
          description: "Tài khoản hoặc mật khẩu nhập sai",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const isshowOverlaylist = ref(false);
    const handleShow = () => {
      isshowOverlaylist.value = !isshowOverlaylist.value;
    };
    return {
      isshowOverlaylist,
      handleShow,
      toastError,
      toastSuccess,
    };
  },
  computed: {
    ...mapGetters(["idloginstudent"]),
  },
  methods: {
    delDataUserlogin() {
      sessionStorage.clear();
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import "../style/components/navbar.css";
</style>
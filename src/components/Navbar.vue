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
          <h2>{{ userData.StudentName }}</h2>
          <h2>{{ teaadmin.TeacherName }}</h2>
          <p>{{ dataRole }}isator</p>
        </div>
        <div class="right_icon" style="display: flex; flex-direction: column">
          <i class="bx bx-chevron-up"></i>
          <i class="bx bx-chevron-down"></i>
        </div>
        <div class="right_image_overlist" v-if="isshowOverlaylist">
          <div
            class="overlaylist_item"
            v-if="dataRole === 'admin' || dataRole === 'teacher'"
          >
            <i class="bx bx-info-circle"></i>
            <router-link to="/information">Thông tin cá nhân</router-link>
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
    const userData = ref([]);
    const teaadmin = ref([]);
    const dataRole = ref("");
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
      userData,
      teaadmin,
      dataRole,
      handleShow,
      toastError,
      toastSuccess,
    };
  },
  computed: {
    ...mapGetters(["idloginstudent", "idloginteacher"]),
  },
  methods: {
    delDataUserlogin() {
      sessionStorage.clear();
    },
    async loadUserDataFromSessionStorage() {
      const userDataString = sessionStorage.getItem("idloginstudentData");
      const userDataString1 = sessionStorage.getItem("roleData");
      console.log(userDataString);
      console.log(userDataString1);

      if (userDataString) {
        try {
          this.userData = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    async loadAdminAndTeacher() {
      const userDataString = sessionStorage.getItem("idloginteacherData");
      const userDataString1 = sessionStorage.getItem("roleData");
      console.log(userDataString);
      console.log(userDataString1);

      if (userDataString) {
        try {
          this.teaadmin = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    loadDataRole() {
      const userDataString = sessionStorage.getItem("roleData");
      console.log(userDataString);

      if (userDataString) {
        try {
          this.dataRole = userDataString;
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
  },
  mounted() {
    this.loadUserDataFromSessionStorage();
    this.loadAdminAndTeacher();
    this.loadDataRole();
  },
  watch: {
    idloginstudent(newVal) {
      if (newVal && newVal.length !== null) {
        const idloginstudentData = newVal;
        sessionStorage.setItem(
          "idloginstudentData",
          JSON.stringify(idloginstudentData)
        );
      }
      this.loadUserDataFromSessionStorage();
    },
    idloginteacher(newVal) {
      if (newVal && newVal.length !== null) {
        const idloginteacherData = newVal;
        sessionStorage.setItem(
          "idloginteacherData",
          JSON.stringify(idloginteacherData)
        );
      }
      this.loadAdminAndTeacher();
    },
  },
};
</script>

<style scoped>
@import "../style/components/navbar.css";
</style>
<template>
  <div
    :class="
      backgroundWeb ? 'background-black navbar' : 'background-white navbar'
    "
  >
    <div class="navbar_left">
      <img
        src="../assets/logonavbarxoaphong.png"
        alt=""
        v-if="backgroundWeb === false"
      />
      <img src="../assets/logobgrblack.png" alt="" v-else class="logo_black" />
    </div>
    <div class="navbar_right">
      <!-- <label
        :class="
          backgroundWeb
            ? 'background-white navbar_right label '
            : 'navbar_right label '
        "
      >
        <i class="bx bx-search-alt"></i>
        <input type="text" placeholder="Tìm kiếm thông tin..." />
      </label> -->
      <div class="icon_list">
        <div class="icon_item">
          <i class="bx bx-info-circle"></i>
        </div>
        <div class="icon_item" v-if="dataRole === 'student'">
          <p class="notify_icon" v-if="countStudentsWithFalseHandle > 0">
            {{ countStudentsWithFalseHandle }}
          </p>
          <i class="bx bx-bell" @click="ClickLoadDataInform()"></i>
          <div class="overlay_inform" v-if="isInform">
            <div class="inform_top">
              <h3>Thông báo</h3>
              <i
                class="bx bx-dots-horizontal-rounded"
                @click="handleRead()"
              ></i>
              <div class="overlay_infrom_icon" v-if="isShowRead">
                <div
                  class="overlay_icon"
                  @click="
                    handleRead();
                    onSubmitUpdate();
                    handleInform();
                  "
                >
                  <i class="bx bx-check-double"></i>
                  Đánh dấu tất cả đã đọc
                </div>
              </div>
            </div>
            <div class="inform_list" v-if="getstudentidinform.length > 0">
              <div
                v-for="data in getstudentidinform"
                :key="data.InfromId"
                :class="
                  data.Isread == 1 ? 'inform_item bgr_white' : 'inform_item'
                "
              >
                <div class="infrom_icon">
                  <i class="bx bxs-analyse"></i>
                </div>
                <div class="inform_des">
                  <h3>{{ data.Title }}</h3>
                  <p>Yêu cầu: {{ data.Message }} đã được xử lý</p>
                </div>
              </div>
            </div>
            <div class="null_inform" v-else>
              <img src="../assets/nodata.svg" alt="" />
              <p>Không có thông báo</p>
            </div>
          </div>
        </div>
        <div class="icon_item" @click="toggleFullscreen">
          <i class="bx bx-fullscreen"></i>
        </div>
      </div>
      <div class="right_image" @click="handleShow()">
        <div class="image_user">
          <p>{{ nameTea }}</p>
          <p>{{ nameStu }}</p>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { useFullscreen } from "@vueblocks/vue-use-core";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  setup() {
    const userData = ref([]);
    const teaadmin = ref([]);
    const dataRole = ref("");
    const dataInform = ref({
      id: 1,
      studentId: "",
    });
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
    const handleInform = () => {
      isInform.value = !isInform.value;
    };
    const handleRead = () => {
      isShowRead.value = !isShowRead.value;
    };
    const isInform = ref(false);
    const isShowRead = ref(false);
    //full screen
    const imgRef = ref(null);
    const { isFullscreen, toggleFullscreen } = useFullscreen(imgRef);
    return {
      isshowOverlaylist,
      isInform,
      isShowRead,
      userData,
      teaadmin,
      dataRole,
      dataInform,
      handleShow,
      handleInform,
      handleRead,
      toastError,
      toastSuccess,
      imgRef,
      isFullscreen,
      toggleFullscreen,
    };
  },
  computed: {
    ...mapGetters([
      "idloginstudent",
      "idloginteacher",
      "getstudentidinform",
      "backgroundWeb",
    ]),
    countStudentsWithFalseHandle() {
      return this.getstudentidinform.filter((student) => student.Isread === 0)
        .length;
    },
    ReanderIdInform() {
      return this.getstudentidinform.map((item) => item.InformId);
    },
    computedStudentId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.dataInform.studentId = this.userData.StudentId);
    },
    nameTea() {
      try {
        const teacherName = this.teaadmin.TeacherName;
        const words = teacherName.split(" ");

        if (words.length >= 2) {
          const initials = words[0][0] + words[1][0];
          return initials;
        } else {
          throw new Error("Tên giáo viên không đủ dài");
        }
      } catch (error) {
        console.error("Lỗi xảy ra: ", error.message);
        return ""; // Hoặc giá trị mặc định khác tùy theo trường hợp
      }
    },
    nameStu() {
      try {
        const teacherName = this.userData.StudentName;
        const words = teacherName.split(" ");

        if (words.length >= 2) {
          const initials = words[0][0] + words[1][0];
          return initials;
        } else {
          throw new Error("Tên học sinh không đủ dài");
        }
      } catch (error) {
        console.error("Lỗi xảy ra: ", error.message);
        return ""; // Hoặc giá trị mặc định khác tùy theo trường hợp
      }
    },
  },
  methods: {
    ...mapActions(["updateIteminform", "getStudentIDinform"]),
    ...mapMutations(["HANDLEBACKGROUND"]),
    onSubmitUpdate() {
      try {
        this.getstudentidinform.forEach((item) => {
          item.Isread = true;
        });
        this.updateIteminform(this.getstudentidinform);
        return false;
      } catch (error) {
        console.log(error);
      }
    },

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
    ClickLoadDataInform() {
      try {
        this.handleInform();
        this.getStudentIDinform(this.dataInform);
        console.log(123);
      } catch (error) {
        console.log(error);
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
<template>
  <div class="datainfomation">
    <div className="information_left">
      <video autoPlay loop muted>
        <source src="../assets/astronauts_Dribbble.mp4" />
      </video>
      <h3>@Brilliant</h3>
    </div>
    <div class="infomation_right">
      <router-link to="/admin/student" class="information_icon">
        <i class="bx bx-chevron-left"></i>
      </router-link>
      <div class="information_des">
        <h2>Thông tin cá nhân của bạn</h2>
        <p>
          Hiển thị đầy đủ thông tin về tài khoản và có quyền chỉnh sửa các thông
          tin cần thiết
        </p>
      </div>
      <form @submit.prevent="onSubmitUpdate" novalidate="true">
        <label class="slabel">
          Mã giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="mã giáo viên"
            v-model="userData.TeacherCode"
            disabled
          />
        </label>
        <label class="slabel">
          Tên giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="tên giáo viên"
            v-model="userData.TeacherName"
          />
        </label>
        <label class="slabel">
          Ngày sinh
          <input
            type="date"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="mã giáo viên"
            v-model="formattedDateOfBirth"
          />
        </label>
        <label class="slabel">
          Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 400px; height: 56px; border-radius: 12px"
            placeholder="email"
            v-model="userData.Email"
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="nam"
                @click="userData.Gender = 1"
                :checked="userData.Gender == 1"
              />
              <label for="nam" @click="userData.Gender = 1">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="women"
                @click="userData.Gender = 0"
                :checked="userData.Gender == 0"
              />
              <label for="women" @click="userData.Gender = 0">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="khac"
                @click="userData.Gender = 2"
                :checked="userData.Gender == 2"
              />
              <label for="khac" @click="userData.Gender = 2">Khác</label>
            </div>
          </div>
        </div>
        <label class="slabel">
          Chuyên môn dạy
          <input
            type="text"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="chuyên môn dạy"
            v-model="userData.SubjectName"
            disabled
          />
        </label>
        <label class="slabel">
          Tình trạng công tác
          <input
            type="text"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="Tình trạng công tác"
            v-model="userData.Collaborate"
            disabled
          />
        </label>
        <label class="slabel">
          Bằng cấp
          <input
            type="text"
            class="sinput"
            style="width: 250px; height: 56px; border-radius: 12px"
            placeholder="Tình trạng công tác"
            v-model="userData.Standard"
            disabled
          />
        </label>
        <label class="slabel">
          Địa chỉ
          <input
            type="text"
            class="sinput"
            style="width: 840px; height: 56px; border-radius: 12px"
            placeholder="địa chỉ"
            v-model="userData.Address"
          />
        </label>
        <div class="information_btn">
          <VButton
            text="Cập nhật thông tin"
            class="btn_info"
            leftIcon="bx bx-check-circle remove_icon"
            style="
              height: 56px;
              width: 200px;
              border-radius: 30px;
              background-color: #0d0c22;
              color: aliceblue;
            "
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import VButton from "../components/Button/VButton.vue";
import VRadio from "../components/Input/VRadio.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Information",
  setup() {
    const userData = ref([]);
    const toastUpdate = () => {
      createToast(
        {
          title: "Thông tin cá nhân",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 5000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      userData,
      toastUpdate,
    };
  },
  computed: {
    ...mapGetters(["idloginteacher", "teacher"]),
    formattedDateOfBirth: {
      get() {
        // Chuyển đổi từ ISO 8601 sang "yyyy-MM-dd"
        const isoDate = new Date(this.userData.DateOfBirth);
        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        // Khi người dùng thay đổi giá trị trong input, chuyển đổi lại định dạng
        this.userData.DateOfBirth = value;
      },
    },
  },
  methods: {
    ...mapActions(["updateItemteacher"]),
    async loadUserDataFromSessionStorage() {
      const userDataString = sessionStorage.getItem("idloginteacherData");

      if (userDataString) {
        try {
          this.userData = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    setDataSession() {
      const idloginteacherData = this.idloginteacher; // Đảm bảo bạn đã có dữ liệu từ idloginteacher
      sessionStorage.setItem(
        "idloginteacherData",
        JSON.stringify(idloginteacherData)
      );
    },
    validateFormUpdate() {
      try {
        let isValid = true;
        switch (true) {
          case this.userData.TeacherName.trim() === "":
            isValid = false;
            this.error.push("Tên giáo viên không được để trống");
            break;
          case this.userData.TeacherName.length < 5:
            isValid = false;
            this.error.push("Tên giáo viên phải lớn hơn 5 kí tự");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitUpdate() {
      try {
        if (this.validateFormUpdate()) {
          this.userData.IsChecked = false;
          this.updateItemteacher(this.userData);
          this.toastUpdate();
          const idloginteacherData = this.userData; // Đảm bảo bạn đã có dữ liệu từ idloginteacher
          sessionStorage.setItem(
            "idloginteacherData",
            JSON.stringify(idloginteacherData)
          );
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.loadUserDataFromSessionStorage();
  },
  watch: {
    idloginteacher(newVal) {
      if (newVal && newVal.length !== null) {
        const idloginteacherData = newVal;
        sessionStorage.setItem(
          "idloginteacherData",
          JSON.stringify(idloginteacherData)
        );
      }
      this.loadUserDataFromSessionStorage();
    },
  },
  components: {
    VButton,
    VRadio,
  },
};
</script>

<style scoped>
@import "../style/components/information.css";
</style>
<template>
  <div class="authuser">
    <div class="circle img_blur"></div>
    <img src="../../assets/circle.png" class="img_blur" style="left: 0" />
    <div class="auth_wrapper">
      <div class="auth_text">
        <img src="../../assets/logosvg1.svg" alt="" class="logo" />
        <h1>Khám phá tri thức cùng chúng tôi - Đăng kí ngay để bắt đầu!</h1>
        <p>
          Nếu bạn đã có tài khoản bạn có thể
          <router-link class="color_signin" to="/">Đăng nhập</router-link>
        </p>
        <img src="../../assets/qr-login-34.png" alt="" class="img_qr" />
      </div>
      <img src="../../assets/bg34-1.png" class="hh_icon" />
      <form class="form_wrapper" novalidate="true">
        <div class="form_signin">
          <div class="signin_item">
            <label
              :class="
                validateemail || checkformatemail
                  ? 'label bd_error mb_0'
                  : 'label'
              "
              v-if="isSendEmail"
            >
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input
                type="text"
                name="input"
                placeholder="Vui lòng nhập email"
                v-model="emailtext"
                @change="EMAILCHECK(emailtext)"
              />
            </label>
            <p v-if="validateemail">Vui lòng nhập địa chỉ email</p>
            <p v-if="checkformatemail">Email nhập không đúng định dạng</p>
          </div>

          <div class="verify_form" v-if="isCodeVerify">
            <h3>Kiểm tra hộp thư của bạn</h3>
            <div class="verify_container">
              <input
                type="text"
                :class="
                  checkcodefromEmail ? 'label input bd_error mb_0 ' : 'label'
                "
                style="width: 40px"
                v-model="codeData.code1"
              />
              <input
                type="text"
                :class="
                  checkcodefromEmail ? 'label input bd_error mb_0 ' : 'label'
                "
                style="width: 40px"
                v-model="codeData.code2"
              />
              <input
                type="text"
                :class="
                  checkcodefromEmail ? 'label input bd_error mb_0 ' : 'label'
                "
                style="width: 40px"
                v-model="codeData.code3"
              />
              <input
                type="text"
                :class="
                  checkcodefromEmail ? 'label input bd_error mb_0 ' : 'label'
                "
                style="width: 40px"
                v-model="codeData.code4"
              />
            </div>
            <p v-if="checkcodefromEmail">Mã xác nhập bị sai</p>
          </div>
          <div class="changepass_form" v-if="isChangepassword">
            <div class="signin_item">
              <label :class="validatenewpass ? 'label bd_error mb_0' : 'label'">
                <i class="fa fa-link" aria-hidden="true"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  name="input"
                  placeholder="Vui lòng nhập mật khẩu mới"
                  v-model="newPassword"
                />
                <i
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  aria-hidden="true"
                  style="margin-right: 0"
                  @click="togglePasswordVisibility"
                ></i>
              </label>

              <p v-if="validatenewpass">Vui lòng nhập mật khẩu mới</p>
            </div>
            <div class="signin_item">
              <label :class="validateconfirm ? 'label bd_error mb_0' : 'label'">
                <i class="fa fa-flickr" aria-hidden="true"></i>
                <input
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  name="input"
                  placeholder="Xác nhân mật khẩu"
                  v-model="confirmPassword"
                />
                <i
                  :class="showPasswordConfirm ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  aria-hidden="true"
                  style="margin-right: 0"
                  @click="toggleConfirmPasswordVisibility"
                ></i>
              </label>
              <p v-if="validateconfirm">Vui lòng xác nhận mật khẩu</p>
              <p v-if="passwordjoint">Mật khẩu không khớp</p>
            </div>
          </div>
        </div>
        <button v-if="isSendEmail" @click.prevent="sendEmail()">Gửi mã</button>
        <button v-if="isCodeVerify" @click.prevent="checkcodeEmail()">
          Xác minh mã
        </button>
        <button v-if="isChangepassword" @click.prevent="ResetPassword()">
          Cập nhật mật khẩu
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "ForgotPassword",
  setup() {
    const changeAuth = ref("login");
    const isSendEmail = ref(true);
    const isCodeVerify = ref(false);
    const isChangepassword = ref(false);
    const emailtext = ref("");
    const checkcodefromEmail = ref(false);
    const newPassword = ref("");
    const confirmPassword = ref("");
    const validateemail = ref(false);
    const checkformatemail = ref(false);
    const validatenewpass = ref(false);
    const validateconfirm = ref(false);
    const passwordjoint = ref(false);
    const showPassword = ref(false);
    const showPasswordConfirm = ref(false);
    const codeData = reactive({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
    });
    const handleAuth = () => {
      if (changeAuth.value === "login") {
        changeAuth.value = "signup";
      } else if (changeAuth.value === "signup") {
        changeAuth.value = "login";
      }
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Quên mật khẩu",
          description: "Đổi mật khẩu thành công",
        },
        {
          type: "warning",
          timeout: 3000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      codeData,
      changeAuth,
      isSendEmail,
      isCodeVerify,
      isChangepassword,
      checkcodefromEmail,
      showPasswordConfirm,
      emailtext,
      validateemail,
      checkformatemail,
      newPassword,
      confirmPassword,
      validatenewpass,
      validateconfirm,
      passwordjoint,
      showPassword,
      handleAuth,
      toastUpdate,
    };
  },
  computed: {
    ...mapGetters(["codeCheck", "getByEmail"]),
    updateResult() {
      return (
        this.codeData.code1 +
        this.codeData.code2 +
        this.codeData.code3 +
        this.codeData.code4
      );
    },
  },
  methods: {
    ...mapMutations(["EMAILCHECK"]),
    ...mapActions(["sendEmailCode", "getbyemail", "updateItemaccount"]),
    togglePasswordVisibility() {
      // Khi người dùng nhấp vào biểu tượng "eye", thay đổi trạng thái hiển thị mật khẩu
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      // Khi người dùng nhấp vào biểu tượng "eye", thay đổi trạng thái hiển thị mật khẩu
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    isValidEmailFormat(email) {
      // Sử dụng biểu thức chính quy để kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateInputs() {
      let isValid = true;
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.emailtext.trim() === "") {
        isValid = false;
        this.validateemail = true;
      } else if (!this.isValidEmailFormat(this.emailtext)) {
        isValid = false;
        this.checkformatemail = true;
        this.validateemail = false;
      } else {
        this.validateemail = false;
        this.checkformatemail = false;
      }
      return isValid;
    },
    validateCheckCodeFromEmail() {
      let isValid = true;
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.updateResult !== this.codeCheck) {
        isValid = false;
        this.checkcodefromEmail = true;
      } else if (this.updateResult === this.codeCheck) {
        this.checkcodefromEmail = false;
      }
      return isValid;
    },
    validatePassword() {
      let isValid = true;
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.newPassword.trim() === "") {
        isValid = false;
        this.validatenewpass = true;
      } else if (this.newPassword !== "") {
        this.validatenewpass = false;
      }
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.confirmPassword.trim() === "") {
        isValid = false;
        this.validateconfirm = true;
      } else if (this.confirmPassword !== "") {
        this.validateconfirm = false;
      }
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.confirmPassword !== this.newPassword) {
        isValid = false;
        this.passwordjoint = true;
      } else if (this.confirmPassword == this.newPassword) {
        this.passwordjoint = false;
      }
      return isValid;
    },
    checkcodeEmail() {
      try {
        if (this.validateCheckCodeFromEmail()) {
          this.isChangepassword = true;
          this.isCodeVerify = false;
          this.getbyemail({
            recordId: this.emailtext,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async ResetPassword() {
      try {
        if (this.validatePassword()) {
          this.getByEmail.PassWord = this.confirmPassword;
          this.getByEmail.IsChecked = false;
          this.updateItemaccount(this.getByEmail);
          this.toastUpdate();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async sendEmail() {
      try {
        if (this.validateInputs()) {
          this.isSendEmail = false;
          this.checkformatemail = false;
          this.isCodeVerify = true;
          this.sendEmailCode({
            emailInput: this.emailtext,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.codeCheck;
  },
};
</script>
  
  <style scoped>
@import "../../style/components/authuser.css";
.bxl-google {
  background: conic-gradient(
      from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg
    )
    73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.bxl-instagram-alt {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  -webkit-background-clip: text;
  /* Also define standard property for compatibility */
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: 24px;
}
.bxl-facebook-circle {
  color: #285aeb;
}
</style>
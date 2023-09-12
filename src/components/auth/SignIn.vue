<template>
  <div class="authuser">
    <div class="circle img_blur"></div>
    <img src="../../assets/circle.png" class="img_blur" style="left: 0" />
    <div class="auth_wrapper">
      <div class="auth_text">
        <img src="../../assets/logosvg1.svg" alt="" class="logo" />
        <h1>
          Chào mừng bạn trở lại! Hãy cùng tiếp tục hành trình khám phá tri thức.
        </h1>
        <p>
          Nếu bạn muốn sử dụng phần mềm trên điện thoại hãy quét mã
          <router-link class="color_signin" to="/forgot">Tại đây</router-link>
        </p>
        <img src="../../assets/qr-login-34.png" alt="" class="img_qr" />
      </div>
      <img src="../../assets/bg34-1.png" class="hh_icon" />
      <form
        class="form_wrapper"
        @submit.prevent="loginform()"
        novalidate="true"
      >
        <div class="form_signin">
          <div class="signin_item">
            <label
              :class="validateaccountcode ? 'label bd_error mb_0' : 'label'"
            >
              <i class="bx bx-user-circle"></i>
              <input
                type="text"
                name="input"
                placeholder="Vui lòng nhập tên đăng nhập..."
                v-model="formData.accountCode"
                @change="SET_USERNAME(formData.accountCode)"
              />
            </label>
            <p v-if="validateaccountcode">Vui lòng nhập tên đăng nhập</p>
          </div>
          <div class="signin_item">
            <label :class="validatepassword ? 'label bd_error mb_0' : 'label'">
              <i class="bx bx-lock"></i>
              <input
                name="input"
                placeholder="Vui lòng nhập mật khẩu..."
                v-model="formData.passWood"
                :type="showPassword ? 'text' : 'password'"
                @change="SET_PASSWORD(formData.passWood)"
              />
              <i
                :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                aria-hidden="true"
                style="margin-right: 0"
                @click="togglePasswordVisibility"
              ></i>
            </label>
            <p v-if="validatepassword">Vui lòng nhập mật khẩu</p>
          </div>
        </div>
        <router-link to="/forgot">Quên mật khẩu ?</router-link>
        <button>Đăng nhập</button>
        <div class="social">
          <div class="social_line">
            <h3>Or Continue with</h3>
          </div>
          <div class="social_list">
            <div class="social_item">
              <i class="bx bxl-google"></i>
            </div>
            <div class="social_item">
              <i class="bx bxl-facebook-circle"></i>
            </div>
            <div class="social_item">
              <i class="bx bxl-instagram-alt"></i>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "SignIn",
  setup() {
    const showPassword = ref(false);
    const changeAuth = ref("login");
    const formData = reactive({
      accountCode: "",
      passWood: "",
    });
    const validateaccountcode = ref(false);
    const validatepassword = ref(false);
    const handleAuth = () => {
      if (changeAuth.value === "login") {
        changeAuth.value = "signup";
      } else if (changeAuth.value === "signup") {
        changeAuth.value = "login";
      }
    };
    return {
      formData,
      showPassword,
      changeAuth,
      handleAuth,
      validateaccountcode,
      validatepassword,
    };
  },
  computed: {
    ...mapGetters(["login"]),
  },
  methods: {
    validateInputs() {
      let isValid = true;
      // Kiểm tra điều kiện cho tên đăng nhập
      if (this.formData.accountCode.trim() === "") {
        isValid = false;
        this.validateaccountcode = true;
      } else if (this.formData.accountCode !== "") {
        this.validateaccountcode = false;
      }
      if (this.formData.passWood.trim() === "") {
        isValid = false;
        this.validatepassword = true;
      } else if (this.formData.passWood !== "") {
        this.validatepassword = false;
      }
      return isValid;
    },
    togglePasswordVisibility() {
      // Khi người dùng nhấp vào biểu tượng "eye", thay đổi trạng thái hiển thị mật khẩu
      this.showPassword = !this.showPassword;
    },
    async loginform() {
      try {
        if (this.validateInputs()) {
          this.Loginaccount({
            username: this.formData.accountCode,
            password: this.formData.passWood,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["SET_USERNAME", "SET_PASSWORD"]),
    ...mapActions(["Loginaccount", "IDloginstudent"]),
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
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
          Nếu bạn chưa có tài khoản thì bạn hãy
          <router-link class="color_signin" to="/signup">Đăng kí</router-link>
        </p>
        <img src="../../assets/qr-login-34.png" alt="" class="img_qr" />
      </div>
      <img src="../../assets/bg34-1.png" class="hh_icon" />
      <form class="form_wrapper">
        <div class="form_signin">
          <label>
            <i class="bx bx-user-circle"></i>
            <input
              type="text"
              name="input"
              placeholder="Vui lòng nhập tên đăng nhập..."
            />
          </label>
          <label>
            <i class="bx bx-lock"></i>
            <input
              type="password"
              name="input"
              placeholder="Vui lòng nhập mật khẩu..."
            />
            <i class="bx bx-low-vision" style="margin-right: 0"></i>
          </label>
        </div>
        <a href="#">Quên mật khẩu ?</a>
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
import { ref } from "vue";

export default {
  name: "SignIn",
  setup() {
    const changeAuth = ref("login");
    const handleAuth = () => {
      if (changeAuth.value === "login") {
        changeAuth.value = "signup";
      } else if (changeAuth.value === "signup") {
        changeAuth.value = "login";
      }
    };
    return {
      changeAuth,
      handleAuth,
    };
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
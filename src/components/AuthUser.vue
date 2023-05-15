<template>
  <div class="authuser">
    <div class="circle img_blur"></div>
    <img src="../assets/circle.png" class="img_blur" style="left: 0" />
    <div class="auth_wrapper">
      <div class="auth_text">
        <img src="../assets/logo_main.png" alt="" />
        <h1>Sign In to go to the Homepage</h1>
        <p>
          If you have an account You can <b class="color_signin">Sign In</b>
        </p>
        <img src="../assets/qr-login-34.png" alt="" />
      </div>
      <img src="../assets/bg34-1.png" class="hh_icon" />
      <form class="form_wrapper">
        <div class="form_signin">
          <label
            >Email:
            <input
              type="text"
              name="input"
              placeholder="Vui lòng nhập Email..."
            />
          </label>
          <label
            >Password:
            <input
              type="text"
              name="input"
              placeholder="Vui lòng nhập Password..."
            />
          </label>
        </div>
        <a href="#">Recovery Password</a>
        <button>Sign In</button>
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
    <div class="blur_two"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AuthUser",
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
@import "../style/components/authuser.css";
.circle {
  width: 600px;
  height: 600px;
  top: 0;
  left: 20%;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(
    circle at center,
    rgba(235, 232, 57, 0.5) 0%,
    rgba(218, 224, 134, 0) 70%
  );
}
.color_signin {
  color: #fde68a;
}
.hh_icon {
  margin-left: 40px;
}
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
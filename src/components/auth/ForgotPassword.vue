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
      <form class="form_wrapper">
        <div class="form_signin">
          <label class="label" v-if="isSendEmail">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            <input type="text" name="input" placeholder="Vui lòng nhập email" />
          </label>
          <div class="verify_form" v-if="isCodeVerify">
            <h3>Vui lòng nhập mã gồm 4 chữ số được gửi</h3>
            <div class="verify_container">
              <input type="text" class="label input" style="width: 40px" />
              <input type="text" class="label input" style="width: 40px" />
              <input type="text" class="label input" style="width: 40px" />
              <input type="text" class="label input" style="width: 40px" />
            </div>
          </div>
          <div class="changepass_form" v-if="isChangepassword">
            <label class="label">
              <i class="fa fa-link" aria-hidden="true"></i>
              <input
                type="text"
                name="input"
                placeholder="Vui lòng nhập mật khẩu mới"
              />
            </label>
            <label class="label">
              <i class="fa fa-flickr" aria-hidden="true"></i>
              <input type="text" name="input" placeholder="Xác nhân mật khẩu" />
            </label>
          </div>
        </div>
        <button
          v-if="isSendEmail"
          @click="
            isSendEmail = false;
            isCodeVerify = true;
          "
        >
          Gửi mã
        </button>
        <button
          v-if="isCodeVerify"
          @click="
            isChangepassword = true;
            isCodeVerify = false;
          "
        >
          Xác minh mã
        </button>
        <button v-if="isChangepassword">Cập nhật mật khẩu</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";

export default {
  name: "ForgotPassword",
  setup() {
    const changeAuth = ref("login");
    const isSendEmail = ref(true);
    const isCodeVerify = ref(false);
    const isChangepassword = ref(false);
    const handleAuth = () => {
      if (changeAuth.value === "login") {
        changeAuth.value = "signup";
      } else if (changeAuth.value === "signup") {
        changeAuth.value = "login";
      }
    };
    return {
      changeAuth,
      isSendEmail,
      isCodeVerify,
      isChangepassword,
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
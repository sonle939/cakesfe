<template>
  <div class="footer">
    <img src="../assets/footer.png" alt="" class="bgr_animation" />
    <ul class="footer_container">
      <li class="footer_first">
        <img src="../assets/logonavbarxoaphong.png" alt="" />
        <ul>
          <li>
            <i class="bx bx-current-location"></i>
            <p>Hoằng Quỳ Hoằng Hóa Thanh Hóa</p>
          </li>
          <li>
            <i class="bx bxs-phone-call"></i>
            <p>098 862 43 56</p>
          </li>
          <li>
            <i class="bx bx-envelope"></i>
            <p>thcshoangquyf@gmail.com</p>
          </li>
        </ul>
      </li>
      <li class="footer_text">
        <h3>Truy cập</h3>
        <ul>
          <li>Trang chủ</li>
          <li>Thông tin cá nhân</li>
          <li>Thời khóa biểu</li>
          <li>Bảng điểm</li>
        </ul>
      </li>
      <li class="footer_text">
        <h3>Khám phá</h3>
        <ul>
          <li>Thông tin chúng tôi</li>
          <li>Sự kiện sắp tới</li>
          <li>Câu hỏi thường gặp</li>
          <li>Chính sách bảo mật</li>
        </ul>
      </li>
      <li class="footer_image">
        <img src="../assets/anhtruogn1.jpg" alt="" />
        <img src="../assets/anhtruong2.jpg" alt="" />
        <img src="../assets/hinhanhtruong.jpg" alt="" />
        <img src="../assets/anhtruong3.jpg" alt="" />
        <img src="../assets/anhtruong4.jpg" alt="" />
        <img src="../assets/anhtruong5.jpg" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
};
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 400px;
  background: #1f1944;
  position: relative;
  overflow: hidden;
}
.footer_container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
}
.footer_container li {
  margin-right: 100px;
  text-align: left;
  z-index: 10;
}
.footer_first ul li {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.footer_text {
  width: 300px;
}
.footer_text h3 {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}
.footer_text ul li {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.footer_text ul li {
  color: #b3ade1;
  font-size: 18px;
  line-height: 30px;
  transition: all 0.5s linear;
  transform: translateX(0px);
}
.footer_text ul li:hover {
  color: #f57005;
  transform: translateX(10px);
}
.footer_first {
  margin-left: 20px;
}
.footer_first ul li p {
  color: #b3ade1;
  font-size: 20px;
  line-height: 30px;
}
.footer_first ul li i {
  margin-right: 10px;
  font-size: 24px;
  color: #f57005;
}
.footer_first img {
  width: 280px;
}
.footer .bgr_animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  object-fit: contain;
  animation: moveUpDown 2.6s linear infinite alternate;
}
@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(
      20px
    ); /* Điều chỉnh khoảng cách di chuyển theo ý muốn của bạn */
  }
}
.footer_image {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 400px;
  margin-right: 0 !important;
}
.footer_image img {
  height: 93px;
  width: 93px;
  border-radius: 10px;
  object-fit: cover;
  margin: 5px;
}
</style>
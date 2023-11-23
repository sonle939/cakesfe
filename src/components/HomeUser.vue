<template>
  <div class="homeus">
    <div class="banner_container">
      <div class="banner_icon">
        <img src="../assets/cup.svg" class="cup" />
        <img src="../assets/note.svg" class="note" />
        <img src="../assets/note2.svg" class="note2" />
        <img src="../assets/send2.svg" class="send2" />
        <img src="../assets/send.svg" class="send" />
        <img src="../assets/send.svg" class="send_bottm" />
        <img src="../assets/pen2.svg" class="pen" />
        <img src="../assets/traodoi.svg" class="traodoi" />
        <img src="../assets/lake_multip.svg" class="lake" />
        <img src="../assets/dot-box-2.svg" class="dotbox" />
      </div>
      <div class="home_banner">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
        <div class="banner_logo1">
          <img src="../assets/image1.png" alt="" />
        </div>
      </div>
      <img class="image_fix image_fix_left" src="../assets/image2.png" />
      <img class="image_fix" src="../assets/image3.png" />
      <div class="home_slogan">
        <h1>
          Nơi học hành trở nên tuyệt vời - Nâng cao bản thân thách thức giới
          hạn!
        </h1>
        <p>
          Trường học của chúng tôi là nơi thú vị để học, giúp bạn nâng cao bản
          thân và vượt qua mọi giới hạn. Chúng tôi luôn đồng hành cùng học viên
          trên hành trình phát triển cá nhân.
        </p>
        <button class="btn-17">
          <span class="text-container">
            <span class="text" style="color: white !important"
              >Khám phá ngay</span
            >
          </span>
        </button>
      </div>
    </div>
    <div class="home_facility">
      <h1>Cơ sở vật chất trường phong cách và tiện nghi</h1>
      <p class="text1_facility">
        Cơ sở vật chất chất lượng giúp tối ưu hóa trải nghiệm học tập bằng cách
        cung cấp không gian hiện đại và thiết bị tiên tiến, tạo điều kiện thuận
        lợi cho sự phát triển toàn diện của học sinh
      </p>
      <div class="facility_list">
        <div class="facility_item">
          <i class="bx bxs-devices" style="color: #c026d3"></i>
          <b>Thiết bị</b>
          <p>Trang bị các thiết bị hiện đại cho quá trình học tập</p>
        </div>
        <div class="facility_item">
          <i class="bx bx-home-alt" style="color: #4f46e5"></i>
          <b>Lớp học</b>
          <p>Thiết kế rộng rãi hiện đại, tối ưu không gian học tập</p>
        </div>
        <div class="facility_item">
          <i class="bx bxs-leaf" style="color: #2ecc71"></i>
          <b>Môi trường</b>
          <p>Không gian mở, đẩy đủ tiện nghi cho việc học tập</p>
        </div>
        <div class="facility_item">
          <i class="bx bxs-party" style="color: #e74c3c"></i>
          <b>Giải trí</b>
          <p>Có các khu vui chơi cho những phút học tập căng thẳng</p>
        </div>
      </div>
    </div>
    <div class="home_adward">
      <div class="adward_image">
        <div class="adward_amount">
          <h1>{{ teacherAll.length }}+</h1>
          <p>Giáo viên nhiệt huyết</p>
        </div>
        <div class="adwrad_cup icon_award">
          <i class="fa fa-trophy" aria-hidden="true"></i>
        </div>
        <div class="adward_light icon_award">
          <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
        </div>
        <div class="image_one">
          <img src="../assets/image7.jpg" alt="" />
        </div>
        <img src="../assets/image6.jpg" class="image_two" />
        <img src="../assets/about-2-shape-2.png" class="image_three" />
        <img src="../assets/about-2-shape-3.png" class="image_four" />
        <img src="../assets/about-2-shape-4.png" class="image_five" />
      </div>
      <div class="adward_description">
        <span
          >Về giáo viên
          <svg
            class="arrow-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 55 13"
          >
            <g clip-path="url(#clip0_324_36194)">
              <path
                d="M10.5406 6.49995L0.700562 12.1799V8.56995L4.29056 6.49995L0.700562 4.42995V0.819946L10.5406 6.49995Z"
              ></path>
              <path
                d="M25.1706 6.49995L15.3306 12.1799V8.56995L18.9206 6.49995L15.3306 4.42995V0.819946L25.1706 6.49995Z"
              ></path>
              <path
                d="M39.7906 6.49995L29.9506 12.1799V8.56995L33.5406 6.49995L29.9506 4.42995V0.819946L39.7906 6.49995Z"
              ></path>
              <path
                d="M54.4206 6.49995L44.5806 12.1799V8.56995L48.1706 6.49995L44.5806 4.42995V0.819946L54.4206 6.49995Z"
              ></path>
            </g>
          </svg>
        </span>
        <h3>
          Đội ngũ giáo viên chúng tôi là những người nhiệt huyết và kinh nghiệm
          hỗ trợ cho sự phát triển của học sinh.
        </h3>
        <p class="ad_desone">
          Với sự sáng tạo và tâm huyết, giáo viên của chúng tôi không chỉ là
          người hướng dẫn mà còn là nguồn động viên, tạo điều kiện cho môi
          trường học tập thú vị và đầy cảm hứng.
        </p>
        <div class="adward_svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="width: 295px; fill: #f97316"
            viewBox="0 0 295 125"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M86 0.0805664H58C25.9675 0.0805664 0 26.048 0 58.0806V79.5806C0 104.157 19.9233 124.081 44.5 124.081H46.5C69.9721 124.081 89 105.053 89 81.5806C89 58.1085 108.028 39.0806 131.5 39.0806H268C282.912 39.0806 295 26.9923 295 12.0806C295 5.45315 289.627 0.0805664 283 0.0805664H89H86Z"
            ></path>
          </svg>
          <b>Lớp học sôi động</b>
          <i class="fa fa-graduation-cap" aria-hidden="true"></i>
          <p>
            Chúng tôi hân hạnh chia sẻ không gian học tập độc đáo này, nơi mà sự
            sáng tạo và ý kiến đóng góp được đánh giá cao, khuyến khích mỗi học
            viên phát triển toàn diện.
          </p>
        </div>
        <div class="adward_list">
          <div class="adward_item">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <p>Phương pháp đào tạo chuyên nghiệp</p>
          </div>
          <div class="adward_item">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <p>Hỗ trợ tốt nhất cho học sinh</p>
          </div>
          <div class="adward_item">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <p>Đội ngũ giáo viên kinh nghiệm</p>
          </div>
          <div class="adward_item">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <p>Thiết bị dạy học tiên tiến</p>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FooterVue from "./Footer.vue";
export default {
  name: "HomeUser",
  data() {
    return {
      windowScrollY: 0,
    };
  },
  computed: {
    ...mapGetters(["teacherAll"]),
  },
  methods: {
    ...mapActions(["getteacherAll"]),
    handleScroll() {
      this.windowScrollY = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getteacherAll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    FooterVue,
  },
};
</script>

<style scoped>
@import "../style/components/homeuser.css";
</style>
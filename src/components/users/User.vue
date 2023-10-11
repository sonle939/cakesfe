<template>
  <div class="user">
    <Navbar
      style="
        box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
          rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
      "
    />
    <div class="tabusers">
      <ul class="tabs">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          @click="
            changeTab(index);
            getIDCLS(userData);
            getpointstudentid(userData);
            getconductstudentid(userData);
          "
          class="tab-button"
          :class="{ active: activeTab === index }"
        >
          <i class="bx iconuser" :class="tab.icon"></i> {{ tab.label }}
        </li>
      </ul>
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
      >
        <template v-if="activeTab === index">
          <div v-if="tab.type === 'table'">
            <div class="info_wrapper">
              <div class="info_left">
                <video autoPlay loop muted>
                  <source src="../../assets/astronauts_Dribbble.mp4" />
                </video>
                <h3>@Brilliant</h3>
              </div>
              <div class="info_right">
                <div class="information_des">
                  <h2>Thông tin cá nhân của bạn</h2>
                  <p>
                    Hiển thị đầy đủ thông tin về tài khoản và có quyền chỉnh sửa
                    các thông tin cần thiết
                  </p>
                </div>
                <form @submit.prevent="onSubmitUpdate" novalidate="true">
                  <label class="slabel">
                    Mã học sinh
                    <input
                      type="text"
                      class="sinput"
                      style="width: 250px; height: 56px; border-radius: 12px"
                      v-model="userData.StudentCode"
                      placeholder="mã học sinh"
                      disabled
                    />
                  </label>
                  <label class="slabel">
                    Tên giáo viên
                    <input
                      type="text"
                      class="sinput"
                      style="width: 250px; height: 56px; border-radius: 12px"
                      placeholder="tên học sinh"
                      v-model="userData.StudentName"
                    />
                  </label>
                  <label class="slabel">
                    Ngày sinh
                    <input
                      type="date"
                      class="sinput"
                      style="width: 250px; height: 56px; border-radius: 12px"
                      v-model="formattedDateOfBirth"
                    />
                  </label>
                  <label class="slabel">
                    Địa chỉ email
                    <input
                      type="text"
                      class="sinput"
                      style="width: 400px; height: 56px; border-radius: 12px"
                      placeholder="email..."
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
                        <label for="nam" @click="userData.Gender = 1"
                          >Nam</label
                        >
                      </div>
                      <div class="sex_item">
                        <VRadio
                          name="sex"
                          class="mr-6"
                          id="women"
                          @click="userData.Gender = 0"
                          :checked="userData.Gender == 0"
                        />
                        <label for="women" @click="userData.Gender = 0"
                          >Nữ</label
                        >
                      </div>
                      <div class="sex_item">
                        <VRadio
                          name="sex"
                          class="mr-6"
                          id="khac"
                          @click="userData.Gender = 2"
                          :checked="userData.Gender == 2"
                        />
                        <label for="khac" @click="userData.Gender = 2"
                          >Khác</label
                        >
                      </div>
                    </div>
                  </div>
                  <label class="slabel">
                    Học sinh của lớp
                    <input
                      type="text"
                      class="sinput"
                      style="width: 840px; height: 56px; border-radius: 12px"
                      placeholder="học sinh lớp"
                      v-model="userData.ClassRoomName"
                      disabled
                    />
                  </label>
                  <label class="slabel">
                    Địa chỉ của bạn
                    <input
                      type="text"
                      class="sinput"
                      style="width: 840px; height: 56px; border-radius: 12px"
                      placeholder="địa chỉ học sinh"
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
          </div>
          <div v-else-if="tab.type === 'input'">
            <div class="user_point">
              <div class="point_wrapper">
                <div
                  class="point_item"
                  v-for="schoolYear in filteredSchoolYears"
                  :key="schoolYear"
                >
                  <div class="point_container">
                    <div class="point_schoolyear">
                      <i class="bx bxl-gitlab bx-spin"></i>
                      <p>Năm học: {{ schoolYear }}</p>
                    </div>
                    <ul>
                      <li>
                        <div>Môn học</div>
                        <div>Điểm trung bình môn kì 1</div>
                        <div>Điểm trung bình môn kì 2</div>
                        <div>Điểm trung bình cả năm</div>
                      </li>
                      <li
                        v-for="subject in filteredSubjects(schoolYear)"
                        :key="subject.SubjectId"
                      >
                        <div>{{ subject.SubjectName }}</div>
                        <div class="mr_tbmk1">{{ subject.ĐTBMK1 }}</div>
                        <div>{{ subject.ĐTBMK2 }}</div>
                        <div>{{ subject.ĐTBMONCANAM }}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="point_conductandavg">
                    <div class="point_conduct">
                      <h3>Điểm hạnh kiểm</h3>
                      <div class="us_conductlist">
                        <div
                          v-for="(conductData,index) in filteredConduct(schoolYear)"
                          :key="index"
                        >
                          <span>{{ conductData.Hanhkiemki1 }}</span>
                          <p>Hạnh kiểm kì 1</p>
                        </div>
                        <div
                          v-for="(conductData,index)  in filteredConduct(schoolYear)"
                          :key="index"
                        >
                          <span>{{ conductData.Hanhkiemki2 }}</span>
                          <p>Hạnh kiểm kì 2</p>
                        </div>
                        <div
                          v-for="(conductData,index)  in filteredConduct(schoolYear)"
                          :key="index"
                        >
                          <span>{{ conductData.ConductGradeALL }}</span>
                          <p>Hạnh kiểm cả năm</p>
                        </div>
                      </div>
                    </div>
                    <div class="pointavgyear">
                      <h3>Điểm trung bình cả năm {{ schoolYear }}</h3>
                      <span> {{ averageOverallScore }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="daylearn_wapper">
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>2</b>
                </div>
                <div class="daylearn_right">
                  <div
                    v-for="item in filteredDataT2"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                  <div
                    class="dl_right_item"
                    style="border-left: #22c55e !important"
                  >
                    <h3>Chào cờ</h3>
                    <p>7h00p-7h45p</p>
                  </div>
                </div>
              </div>
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>3</b>
                </div>
                <div class="daylearn_right">
                  <div
                    v-for="item in filteredDataT3"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                </div>
              </div>
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>4</b>
                </div>
                <div class="daylearn_right">
                  <div
                    v-for="item in filteredDataT4"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                </div>
              </div>
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>5</b>
                </div>
                <div class="daylearn_right">
                  <div
                    v-for="item in filteredDataT5"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                </div>
              </div>
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>6</b>
                </div>
                <div class="daylearn_right">
                  <div
                    v-for="item in filteredDataT6"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                </div>
              </div>
              <div class="daylearn">
                <div class="daylearn_left">
                  Thứ
                  <b>7</b>
                </div>
                <div class="daylearn_right">
                  <div class="dl_right_item" style="border-left: #ef4444">
                    <h3>SInh hoạt lớp</h3>
                    <p>10h45p-11h40p</p>
                  </div>
                  <div
                    v-for="item in filteredDataT7"
                    :key="item.TimeTableId"
                    class="dl_right_item"
                    :style="{
                      'border-left':
                        '3px solid ' + timeStartColor(item.TimeStart),
                    }"
                  >
                    <h3>{{ item.SubjectName }}</h3>
                    <p>{{ item.TimeStart }}-{{ item.TimeEnd }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="daylearn_note">
              <p>Ghi chú:</p>
              <div class="note_list">
                <div class="note_item">
                  <div class="item_box"></div>
                  Tiết 1
                </div>
                <div class="note_item">
                  <div class="item_box tiet2"></div>
                  Tiết 2
                </div>
                <div class="note_item">
                  <div class="item_box tiet3"></div>
                  Tiết 3
                </div>
                <div class="note_item">
                  <div class="item_box tiet4"></div>
                  Tiết 4
                </div>
                <div class="note_item">
                  <div class="item_box tiet5"></div>
                  Tiết 5
                </div>
                <div class="note_item">
                  <div class="item_box buoichieu"></div>
                  Lịch học chiều
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div :class="activeMessage ? 'user_feedback active' : 'user_feedback'">
      <i
        class="bx bx-chat"
        v-if="activeMessage === false"
        @click="activeMessage = true"
      ></i>
      <form
        class="feedback_form"
        novalidate="true"
        v-if="activeMessage === true"
        @submit.prevent="onSubmitAdd"
      >
        <div class="fb_container">
          <div class="feedback_title">
            <h3>Phản hồi</h3>
            <div class="fb_icon" @click="handleClickMessage()">
              <i class="bx bx-exit-fullscreen"></i>
            </div>
          </div>
          <div class="fb_name">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <p>{{ userData.StudentName }}</p>
          </div>
          <div class="feedback_des">
            <div class="fb_desinfo">
              <i class="fa fa-podcast" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="Tiêu đề"
                v-model="formData.Subject"
              />
            </div>
            <textarea
              class="textares"
              placeholder="Nhập nội dung phản hồi..."
              rows="7"
              cols="41"
              v-model="formData.Content"
            ></textarea>
          </div>
        </div>
        <div class="fb_btn">
          <button
            @click.prevent="handleClickMessage()"
            style="margin-right: 10px"
          >
            Hủy
          </button>
          <button>
            Gửi phản hồi <i class="fa fa-telegram" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import Navbar from "../Navbar.vue";
import { mapActions, mapGetters } from "vuex";
import VRadio from "../Input/VRadio.vue";
import VButton from "../Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { v4 as uuidv4 } from "uuid";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  setup() {
    const activeTab = ref(0);
    const userData = ref([]);
    const activeMessage = ref(false);
    const tabs = ref([
      { label: "Thông tin cá nhân", type: "table", icon: "bx-badge-check" },
      {
        label: "Kết quả điểm",
        type: "input",
        inputValue: "",
        icon: "bx-medal",
      },
      {
        label: "Thời khóa biểu",
        type: "text",
        content: "This is some text content.",
        icon: "bx-book",
      },
    ]);
    const toastUpdate = () => {
      createToast(
        {
          title: "Thông tin cá nhân",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 2500,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastMessage = () => {
      createToast(
        {
          title: "Phản hồi",
          description: "Gửi phản hồi thành công",
        },
        {
          type: "success",
          timeout: 2500,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const changeTab = (index) => {
      activeTab.value = index;
    };
    const formData = reactive({
      FeedbackCode: "",
      StudentId: "",
      Subject: "",
      Content: "",
      Handle: "Đang chờ xử lý",
    });
    return {
      activeTab,
      toastUpdate,
      toastMessage,
      tabs,
      changeTab,
      userData,
      activeMessage,
      formData,
    };
  },
  computed: {
    filteredSchoolYears() {
      // Define the school years you want to display
      const selectedSchoolYears = ["2021-2022", "2022-2023"];

      // Filter and return unique school years that match the selected ones
      return [
        ...new Set(
          this.pointStudentId.map((subject) => subject.SchoolYearName)
        ),
      ].filter((schoolYear) => selectedSchoolYears.includes(schoolYear));
    },
    ...mapGetters([
      "idloginstudent",
      "student",
      "getidcls",
      "pointStudentId",
      "conductgetstudentid",
      "feedbackmaxcode",
      "feedback",
    ]),
    filteredDataT2() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 2");
    },
    filteredDataT3() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 3");
    },
    filteredDataT4() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 4");
    },
    filteredDataT5() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 5");
    },
    filteredDataT6() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 6");
    },
    filteredDataT7() {
      // Thay thế 'dataList' bằng tên biến chứa dữ liệu của bạn
      return this.getidcls.filter((item) => item.DayLearn === "Thứ 7");
    },
    timeStartColor() {
      return (timeStart) => {
        switch (timeStart) {
          case "7h00p":
            return "#22c55e";
          case "7h50p":
            return "#84cc16";
          case "9h05p":
            return "#facc15";
          case "9h55p":
            return "#f97316";
          case "10h45p":
            return "#ef4444";
          default:
            return ""; // Trường hợp mặc định không có màu sắc
        }
      };
    },
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
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        FeedbackCode: this.feedbackmaxcode,
      });
    },
    averageOverallScore() {
      if (this.pointStudentId.length === 0) {
        return 0; // Trường hợp mảng rỗng hoặc không tồn tại dữ liệu
      }

      // Sử dụng reduce để tính tổng của tất cả ĐTBMONCANAM
      const totalScore = this.pointStudentId.reduce((acc, student) => {
        return acc + student.ĐTBMONCANAM;
      }, 0);

      // Tính điểm trung bình cộng
      const averageScore = totalScore / this.pointStudentId.length;

      return averageScore.toFixed(1);
    },
  },
  methods: {
    filteredSubjects(schoolYear) {
      // Filter subjects based on the selected school year
      return this.pointStudentId.filter(
        (subject) => subject.SchoolYearName === schoolYear
      );
    },
    filteredConduct(schoolYear) {
      // Filter subjects based on the selected school year
      return this.conductgetstudentid.filter(
        (subject) => subject.SchoolYearName === schoolYear
      );
    },
    ...mapActions([
      "getIDCLS",
      "getpointstudentid",
      "getconductstudentid",
      "addfeedback",
      "getMaxCodefeedback",
      "getFeedback",
      "pointStudentId",
    ]),
    validateFormUpdate() {
      try {
        let isValid = true;
        switch (true) {
          case this.userData.StudentName.trim() === "":
            isValid = false;
            this.error.push("Tên học sinh không được để trống");
            break;
          case this.userData.StudentName.length < 5:
            isValid = false;
            this.error.push("Tên học sinh phải lớn hơn 5 kí tự");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    handleClickMessage() {
      try {
        this.activeMessage = !this.activeMessage;
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions(["updateItemstudent", "IDloginstudent"]),
    async loadUserDataFromSessionStorage() {
      const userDataString = sessionStorage.getItem("idloginstudentData");

      if (userDataString) {
        try {
          this.userData = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    setDataSession() {
      const idloginstudentData = this.idloginstudent; // Đảm bảo bạn đã có dữ liệu từ idloginstudent
      sessionStorage.setItem(
        "idloginstudentData",
        JSON.stringify(idloginstudentData)
      );
    },
    onSubmitAdd() {
      try {
        this.addfeedback({
          FeedbackId: uuidv4(),
          FeedbackCode: this.formData.FeedbackCode,
          StudentId: this.userData.StudentId,
          Subject: this.formData.Subject,
          Content: this.formData.Content,
          Handle: this.formData.Handle,
          isChecked: false,
        });
        // reset formData
        this.formData = { FeedbackCode: this.feedbackmaxcode };
        this.formData.Content = "";
        this.formData.Subject = "";
        this.formData.Handle = "Đang chờ xử lý";
        this.toastMessage();
        this.handleClickMessage();
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitUpdate() {
      try {
        if (this.validateFormUpdate()) {
          this.userData.IsChecked = false;
          this.updateItemstudent(this.userData);
          this.toastUpdate();
          const idloginstudentData = this.userData; // Đảm bảo bạn đã có dữ liệu từ idloginstudent
          sessionStorage.setItem(
            "idloginstudentData",
            JSON.stringify(idloginstudentData)
          );
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    VRadio,
    VButton,
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    //this.getstudent();
    this.loadUserDataFromSessionStorage();
    this.getMaxCodefeedback();
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
  },
};
</script>

<style scoped>
@import "../../style/components/user.css";
</style>

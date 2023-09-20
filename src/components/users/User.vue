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
          @click="changeTab(index)"
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
            <!-- Nội dung tab kiểu input -->
            bang diem
          </div>
          <div v-else>
            <table class="timetable">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Thứ 2</th>
                  <th>Thứ 3</th>
                  <th>Thứ 4</th>
                  <th>Thứ 5</th>
                  <th>Thứ 6</th>
                  <th>Thứ 7</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(time, index) in timimgtable" :key="index">
                  <td>{{ time }}</td>
                  <td>{{ scheduleTable[0][index] }}</td>
                  <td>{{ scheduleTable[1][index] }}</td>
                  <td>{{ scheduleTable[2][index] }}</td>
                  <td>{{ scheduleTable[3][index] }}</td>
                  <td>{{ scheduleTable[4][index] }}</td>
                  <td>{{ scheduleTable[5][index] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </div>
    <div class="user_feedback">
      <i class="bx bx-chat"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "../Navbar.vue";
import { mapActions, mapGetters } from "vuex";
import VRadio from "../Input/VRadio.vue";
import VButton from "../Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  setup() {
    const activeTab = ref(0);
    const userData = ref([]);
    const timimgtable = ref([
      "7:00 - 7:45",
      "7:50 - 8:35",
      "9:05 - 9:50",
      "9:55 - 10:40",
      "10:45 - 11:40",
      "14:00 - 16:40",
    ]);
    const scheduleTable = ref([
      ["Toán học", "Ngữ văn", "Tiếng anh", "Vật lý", "Hóa học"],
      ["Lịch sử", "Địa lý", "Âm nhạc", "Mĩ thuật", "Thể dục"],
      ["Toán học", "Ngữ văn", "Tiếng anh", "Vật lý", "Hóa học"],
      ["Lịch sử", "Địa lý", "Âm nhạc", "Mĩ thuật", "Thể dục"],
      ["Toán học", "Ngữ văn", "Tiếng anh", "Vật lý", "Hóa học"],
      ["Lịch sử", "Địa lý", "Âm nhạc", "Mĩ thuật", "Thể dục"],
      ["Tiếng anh", "Ngữ văn", "Ngữ văn", "Toán học", "Toán học"],
    ]);
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
    const changeTab = (index) => {
      activeTab.value = index;
    };

    return {
      activeTab,
      timimgtable,
      scheduleTable,
      toastUpdate,
      tabs,
      changeTab,
      userData,
    };
  },
  computed: {
    ...mapGetters(["idloginstudent", "student"]),
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
    ...mapActions(["updateItemstudent", "IDloginstudent", "getstudent"]),
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
  mounted() {
    this.getstudent();
    this.loadUserDataFromSessionStorage();
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

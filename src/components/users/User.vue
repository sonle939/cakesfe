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
              <img src="../../assets/eduis-rocket.png" alt="" />
              <form class="student_form">
                <div class="info_title" style="margin-bottom: 0px">
                  <div class="title_left">
                    <h1>Thông tin của bạn</h1>
                  </div>
                </div>
                <div class="info_property">
                  <label class="slabel"
                    >Mã học sinh
                    <input
                      type="text"
                      class="sinput"
                      style="width: 315px"
                      placeholder="mã học sinh"
                      v-model="userData.StudentCode"
                      disabled
                    />
                  </label>
                  <label class="slabel"
                    >Tên học sinh
                    <input
                      type="text"
                      class="sinput"
                      style="width: 315px"
                      placeholder="tên học sinh"
                      v-model="userData.StudentName"
                    />
                  </label>
                  <label class="slabel"
                    >Ngày sinh
                    <input
                      type="date"
                      class="sinput"
                      style="width: 315px"
                      v-model="formattedDateOfBirth"
                    />
                  </label>
                  <label class="slabel"
                    >Địa chỉ email
                    <input
                      type="text"
                      class="sinput"
                      style="width: 315px"
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
                  <label class="slabel" style="margin-left: 110px">
                    Thông tin lớp học
                    <div class="dropdown" style="margin-top: 8px">
                      <input
                        type="text"
                        v-model="userData.ClassRoomName"
                        placeholder="Chọn lớp học"
                        disabled
                      />
                    </div>
                  </label>
                  <label class="slabel" style="width: 100%"
                    >Địa chỉ học sinh
                    <input
                      type="text"
                      class="sinput"
                      style="width: 100%"
                      placeholder="địa chỉ học sinh"
                      v-model="userData.Address"
                    />
                  </label>
                </div>
                <div class="info_btn" style="margin-bottom: 20px">
                  <div class="btn_wp">
                    <VButton text="Hủy" class="btn_phu" />
                    <VButton type="submit" class="ml-8" text="Cập nhật" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div v-else-if="tab.type === 'input'">
            <!-- Nội dung tab kiểu input -->
            <input type="text" v-model="tab.inputValue" />
          </div>
          <div v-else>
            {{ userData.StudentName }}
            <!-- Nội dung tab kiểu văn bản -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "../Navbar.vue";
import { mapActions, mapGetters } from "vuex";
import VRadio from "../Input/VRadio.vue";
import VButton from "../Button/VButton.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  setup() {
    const activeTab = ref(0);
    const userData = ref([]);
    const tabs = ref([
      { label: "Thông tin cá nhân", type: "table", icon: "bx-badge-check" },
      {
        label: "Kết quả điểm",
        type: "input",
        inputValue: "",
        icon: "bx-medal",
      },
      {
        label: "Thông tin lớp học",
        type: "text",
        content: "This is some text content.",
        icon: "bx-book",
      },
    ]);

    const changeTab = (index) => {
      activeTab.value = index;
    };

    return {
      activeTab,
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
    ...mapActions(["updateItemstudent", "IDloginstudent", "getstudent"]),
    async loadUserDataFromSessionStorage() {
      const userDataString = sessionStorage.getItem("idloginstudentData");
      console.log(userDataString);

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

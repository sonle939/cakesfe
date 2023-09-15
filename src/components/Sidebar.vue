<template>
  <div :class="hide ? 'sidebar' : 'sidebar active'">
    <ul :class="hide ? '' : 'sidebar ul active'">
      <li
        v-for="item in filteredSideBar"
        :key="item.id"
        :class="hide ? 'sidebar ul li' : 'sidebar ul li active'"
      >
        <router-link :to="item.nameRouter">
          <div :class="item.classIcon"></div>
          <p :class="hide ? 'p' : 'p active'">
            {{ item.name }}
          </p>
        </router-link>
      </li>
    </ul>
    <div :class="hide ? 'sidebar_control' : 'sidebar_control active'">
      <div class="switch_wrapper">
        <div :class="hide ? 'switch' : 'switch active'">
          <input
            type="checkbox"
            id="switchButton"
            v-model="switchValue"
            @click="toggleSwitch"
          />
          <label for="switchButton"></label>
        </div>
        <label
          for="switchButton"
          :class="hide ? 'switch_wrapper text' : 'switch_wrapper text active'"
          >Chế độ tối</label
        >
      </div>
      <div class="switch_wrapper">
        <div :class="hide ? 'switch' : 'switch active'">
          <input
            type="checkbox"
            id="switchButton1"
            v-model="switchValue1"
            @click="toggleSwitch1"
          />
          <label for="switchButton1"></label>
        </div>
        <label
          for="switchButton1"
          :class="hide ? 'switch_wrapper text' : 'switch_wrapper text active'"
          >Điều hướng thẻ</label
        >
      </div>
      <div class="collapse">
        <img
          src="../assets/bubble-left.svg"
          alt=""
          @click="handleHide"
          :class="hide ? 'collapse img ' : 'collapse img active'"
        />
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
  data() {
    return {
      hide: true,
      selectedItemId: 2,
      switchValue: false,
      switchValue1: false,
      dataRole: "",
      dataSideBar: [
        {
          id: 1,
          name: "Tài khoản",
          classIcon: "bx bx-user-circle",
          nameRouter: "/admin/account",
        },
        {
          id: 2,
          name: "Lớp học",
          classIcon: "bx bx-building-house",
          nameRouter: "/admin/classroom",
        },
        {
          id: 3,
          name: "Khối lớp",
          classIcon: "bx bxs-bookmarks",
          nameRouter: "/admin/grade",
        },
        {
          id: 4,
          name: "Bảng điểm",
          classIcon: "bx bx-table",
          nameRouter: "/admin/point",
        },
        {
          id: 5,
          name: "Năm học",
          classIcon: "bx bxs-star",
          nameRouter: "/admin/schoolyear",
        },
        {
          id: 6,
          name: "Học kì",
          classIcon: "bx bxs-drink",
          nameRouter: "/admin/semester",
        },
        {
          id: 7,
          name: "Học sinh",
          classIcon: "bx bxs-user-detail",
          nameRouter: "/admin/student",
        },
        {
          id: 8,
          name: "Môn học",
          classIcon: "bx bxs-book-alt",
          nameRouter: "/admin/subject",
        },
        {
          id: 9,
          name: "Giáo viên",
          classIcon: "bx bxs-group",
          nameRouter: "/admin/teacher",
        },
        {
          id: 10,
          name: "Thời gian",
          classIcon: "bx bx-calendar",
          nameRouter: "/admin/timetable",
        },
      ],
    };
  },
  computed: {
    filteredSideBar() {
      if (this.dataRole === "admin") {
        return this.dataSideBar; // Trả về tất cả các mục cho admin
      } else if (this.dataRole === "teacher") {
        // Lọc mục thời gian, điểm và lớp học cho giáo viên
        return this.dataSideBar.filter(
          (item) =>
            item.name === "Học sinh" ||
            item.name === "Bảng điểm" ||
            item.name === "Lớp học"
        );
      } else {
        return []; // Trả về mảng rỗng cho các vai trò khác
      }
    },
  },
  methods: {
    toggleSwitch() {
      this.switchValue = !this.switchValue;
    },
    toggleSwitch1() {
      this.switchValue1 = !this.switchValue1;
    },
    //TẠO 1 HÀM DÙNG ĐỂ ĐÓNG MỞ SIDEBAR
    handleHide() {
      try {
        this.hide = !this.hide;
      } catch (error) {
        console.log(error);
      }
    },
    loadDataRole() {
      const userDataString = sessionStorage.getItem("roleData");
      console.log(userDataString);

      if (userDataString) {
        try {
          this.dataRole = userDataString;
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    /**
     * 
     * @param {NGƯỜI COMMENT(GHI CHÚ CODE): LÊ XUÂN SƠN(MF1589)
    NGÀY 06/04/2023} 
    TẠO 1 HÀM DÙNG ĐỂ PHỤ TRỌ CHO VIỆC ĐỔI BACKGRONUD KHI CLICK VÀO SIDEBAR
     */
    selectItem(item) {
      try {
        this.selectedItemId = item.id;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.loadDataRole();
  },
};
</script>

<style scoped>
@import "../style/components/sidebar.css";
</style>
<template>
  <div class="classroom">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý lớp học" :showform="authenClickInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input type="text" placeholder="Tìm kiếm trong danh sách" />
              </div>
              <div class="checked_data" v-show="trueCheckedclassroom">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountclassroom }}</p>
                </h3>
                <h3 @click="uncheckItemsclassroom">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="authenClickDelMulp()"
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="dropdown">
                <input
                  type="text"
                  v-model="selectedOption"
                  placeholder="Chọn giá trị lọc"
                  @click="toggleDropdown"
                />
                <i
                  @click="toggleDropdown"
                  :class="
                    isOpen ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
                  "
                ></i>
                <div class="overlaylist" v-show="isOpen">
                  <ul ref="list">
                    <li
                      v-for="data in filteredGrade"
                      :key="data.GradeId"
                      @click="selectOption(data.GradeName)"
                    >
                      {{ data.GradeName }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelClasroom"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="getClassRoom()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="loadingclassroom ? 'table-wrapper active' : 'table-wrapper'"
            style="height: auto"
          >
            <table style="width: 100%; height: auto">
              <thead>
                <tr>
                  <th
                    style="
                      min-width: 150px;
                      border-top: 0px solid;
                      border-left: 0px solid;
                    "
                  >
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="checkAllclassroom"
                      @change="toggleAllSelectionclassroom"
                    />
                    Mã lớp học
                  </th>
                  <th style="min-width: 155px">Tên lớp học</th>
                  <th style="min-width: 170px">Khối lớp</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in classroom" :key="data.EmployeeId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDCLASSROOM(data.ClassRoomId)"
                    />
                    {{ data.ClassRoomCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.ClassRoomName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.ClassRoomName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.GradeName">
                      {{ data.GradeName }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        @click="authenClickUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span content="Xóa" v-tippy @click="authenClickDel(data)"
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="classroom.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingclassroom" style="margin-top: -310px" />
          </div>
        </div>
      </div>
    </div>
    <FClassroom />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FClassroom from "../components/Form/FClassroom.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Classroom",
  data() {
    const toast = () => {
      createToast(
        {
          title: "Lớp học",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
          timeout: 2000,
        }
      );
    };
    const toastAuthen = () => {
      createToast(
        {
          title: "Quyền hạn",
          description: "Bạn không đủ quyền để chỉnh sửa",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
          timeout: 2000,
        }
      );
    };
    const teaadmin = ref([]);
    const selectedOption = ref("");
    const isOpen = ref(false);
    return {
      toast,
      isOpen,
      selectedOption,
      toastAuthen,
      teaadmin,
    };
  },
  computed: {
    ...mapGetters([
      "classroom",
      "checkAllclassroom",
      "checkAmountclassroom",
      "trueCheckedclassroom",
      "gradeclassroom",
      "loadingclassroom",
      "selectedItemsclassroom",
      "idloginteacher",
    ]),
    filteredGrade() {
      const keyword = this.selectedOption.toLowerCase();
      return this.gradeclassroom.filter((data) =>
        data.GradeName.toLowerCase().includes(keyword)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    async loadAdminAndTeacher() {
      const userDataString = sessionStorage.getItem("idloginteacherData");
      const userDataString1 = sessionStorage.getItem("roleData");
      console.log(userDataString);
      console.log(userDataString1);

      if (userDataString) {
        try {
          this.teaadmin = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    ...mapActions([
      "getClassRoom",
      "toggleAllSelectionclassroom",
      "getGradeclassroom",
      "uncheckItemsclassroom",
      "deleteclassroom",
      "deleteMultipleclassroom",
      "getIDclassroom",
      "exportExcelClasroom",
    ]),
    ...mapMutations([
      "SELECTCHECKEDCLASSROOM",
      "SHOW_FORM_CLASSROOM",
      "ADD_MODE_CLASSROOM",
      "UPDATE_MODE_CLASSROOM",
    ]),
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_CLASSROOM();
        this.getIDclassroom(data);
        this.SHOW_FORM_CLASSROOM();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_CLASSROOM();
        this.SHOW_FORM_CLASSROOM();
      } catch (error) {
        console.log(error);
      }
    },
    authenClickUpdate(data) {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.modeFormUpdate(data);
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickDel(data) {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.deleteclassroom(data.ClassRoomId);
          this.toast();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickDelMulp() {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.deleteMultipleclassroom(this.selectedItemsclassroom);
          this.toast();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickInsert() {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.modeFormInsert();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FClassroom,
    Loading,
    VButton,
  },
  mounted() {
    this.getClassRoom();
    this.getGradeclassroom();
    this.loadAdminAndTeacher();
  },
  watch: {
    idloginteacher(newVal) {
      if (newVal && newVal.length !== null) {
        const idloginteacherData = newVal;
        sessionStorage.setItem(
          "idloginteacherData",
          JSON.stringify(idloginteacherData)
        );
      }
      this.loadAdminAndTeacher();
    },
  },
};
</script>

<style scoped>
</style>
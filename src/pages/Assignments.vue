<template>
  <div class="classroom">
    <Navbar />
    <div
      :class="[
        backgroundWeb ? 'background-black d-flex' : 'background-white d-flex',
        directiondiv && 'navigate_div',
      ]"
    >
      <Sidebar />
      <div
        :class="directiondiv ? 'page_content border_design' : 'page_content '"
      >
        <HeaderContent text="Quản lý phân công" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input type="text" placeholder="Tìm kiếm trong danh sách" />
              </div>
              <div class="checked_data" v-show="trueCheckedassignment">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountassignment }}</p>
                </h3>
                <h3 @click="uncheckItemsassignment">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="
                    deleteMultipleassignment(selectedItemsassignment);
                    toast();
                  "
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
                      v-for="data in classroom"
                      :key="data.ClassRoomId"
                      @click="
                        selectOption(data.ClassRoomId, data.ClassRoomName)
                      "
                    >
                      {{ data.ClassRoomName }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelAssignment"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="getAssignment()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingassignment ? 'table-wrapper active' : 'table-wrapper'
            "
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
                      v-model="checkAllassignment"
                      @change="toggleAllSelectionassignment"
                    />
                    Mã phân phối
                  </th>
                  <th style="min-width: 155px">Tên lớp học</th>
                  <th style="min-width: 155px">Môn học</th>
                  <th style="min-width: 170px">Giáo viên dạy</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in assignment" :key="data.AssignmentId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDASSIGNMENT(data.AssignmentId)"
                    />
                    {{ data.AssignmentCode }}
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
                    <tippy :content="data.SubjectName">
                      {{ data.SubjectName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.TeacherName">
                      {{ data.TeacherName }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        @click="modeFormUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span
                        content="Xóa"
                        v-tippy
                        @click="
                          deleteassignment(data.AssignmentId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="assignment.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingassignment" />
          </div>
          <AdminPaginnation
            :HIDE="HIDEASSIGNMENT"
            :showIsHide="showIsHideassignment"
            :totalRecords="totalRecordsassignment"
            :pageNumber="pageNumberassignment"
            :pageSize="pageSizeassignment"
            :totalPages="totalPagesassignment"
            :setPageNumber="setPageNumberassignment"
            :setSize="setSizeassignment"
          />
        </div>
      </div>
    </div>
    <FAssignment />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FAssignment from "../components/Form/FAssignment.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Assignments",
  setup() {
    const isOpen = ref(false);
    const selectedOption = ref("");
    const toast = () => {
      createToast(
        {
          title: "Phân công",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      toast,
      isOpen,
      selectedOption,
    };
  },
  computed: {
    ...mapGetters([
      "assignment",
      "classroom",
      "teacherAll",
      "checkAllassignment",
      "checkAmountassignment",
      "trueCheckedassignment",
      "loadingassignment",
      "selectedItemsassignment",
      "showIsHideassignment",
      "totalRecordsassignment",
      "pageSizeassignment",
      "pageNumberassignment",
      "totalPagesassignment",
      "backgroundWeb",
      "directiondiv",
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.filteridclassroomassignment(id);
      this.selectedOption = options;
      this.isOpen = false;
    },
    ...mapActions([
      "getAssignment",
      "toggleAllSelectionassignment",
      "uncheckItemsassignment",
      "deleteassignment",
      "deleteMultipleassignment",
      "getIDassignment",
      "exportExcelAssignment",
      "getClassRoom",
      "getteacherAll",
      "setPageNumberassignment",
      "setSizeassignment",
      "filteridclassroomassignment",
      "filterassignmentcode",
    ]),
    ...mapMutations([
      "SELECTCHECKEDASSIGNMENT",
      "SHOW_FORM_ASSIGNMENT",
      "ADD_MODE_ASSIGNMENT",
      "UPDATE_MODE_ASSIGNMENT",
      "SET_PAGE_ASSIGNMENT",
      "HIDEASSIGNMENT",
    ]),
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_ASSIGNMENT();
        this.getIDassignment(data);
        this.SHOW_FORM_ASSIGNMENT();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_ASSIGNMENT();
        this.SHOW_FORM_ASSIGNMENT();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FAssignment,
    Loading,
    VButton,
    AdminPaginnation,
  },
  mounted() {
    this.getAssignment();
    this.getClassRoom();
    this.getteacherAll();
  },
};
</script>

<style scoped>
</style>
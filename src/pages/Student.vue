<template>
  <div class="student">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý học sinh" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách"
                  v-model="searchtext"
                  @keydown.enter="setFilterstudentcodestudent(searchtext)"
                />
              </div>
              <div class="checked_data" v-show="trueCheckedstudent">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountstudent }}</p>
                </h3>
                <h3 @click="uncheckItemsstudent">Bỏ chọn</h3>
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
                    deleteMultiplestudent(selectedItemsstudent);
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
                      v-for="data in classroomstudent"
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
                <div class="excel" @click="exportExcelStudent"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="clearFilterCondition()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingstudent
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
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
                      v-model="checkAllstudent"
                      @change="toggleAllSelectionstudent"
                    />
                    Mã học sinh
                  </th>
                  <th style="min-width: 155px">Tên học sinh</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 155px">Email</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">Địa chỉ</th>
                  <th style="min-width: 170px">Thuộc về lớp</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in student" :key="data.StudentId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDSTUDENT(data.StudentId)"
                    />
                    {{ data.StudentCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.StudentName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.StudentName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="formattedDate(data.DateOfBirth)">
                      {{ formattedDate(data.DateOfBirth) }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Email">
                      {{ data.Email }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="
                        data.Gender == 1
                          ? 'Nam'
                          : data.Gender == 2
                          ? 'Khác'
                          : 'Nữ'
                      "
                    >
                      {{
                        data.Gender == 1
                          ? "Nam"
                          : data.Gender == 2
                          ? "Khác"
                          : "Nữ"
                      }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Address">
                      {{ data.Address }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ClassRoomName">
                      {{ data.ClassRoomName }}
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
                          deletestudent(data.StudentId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="student.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingstudent" />
          </div>
          <AdminPaginnation
            :showIsHide="showIsHidestudent"
            :totalRecords="totalRecordsstudent"
            :pageNumber="pageNumberstudent"
            :pageSize="pageSizestudent"
            :totalPages="totalPagesstudent"
            :setPageNumber="setPageNumberstudent"
            :setSize="setSizestudent"
            :HIDE="HIDESTUDENT"
          />
        </div>
      </div>
    </div>
    <FStudentVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { format } from "date-fns";
import FStudentVue from "../components/Form/FStudent.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Student",
  data() {
    const toast = () => {
      createToast(
        {
          title: "Học sinh",
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
      isOpen: false,
      selectedOption: null,
      searchtext: "",
    };
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FStudentVue,
    Loading,
    VButton,
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.selectedOption = options;
      this.setFilterclassroomidstudent(id);
      this.isOpen = false;
    },
    clearFilterCondition() {
      try {
        this.getstudent();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_STUDENT",
      "HIDESTUDENT",
      "SELECTCHECKEDSTUDENT",
      "SHOW_FORM_STUDENT",
      "UPDATE_MODE_STUDENT",
      "ADD_MODE_STUDENT",
    ]),
    ...mapActions([
      "setPageNumberstudent",
      "setSizestudent",
      "getstudent",
      "toggleAllSelectionstudent",
      "getclassroomstudent",
      "setFilterstudentcodestudent",
      "setFilterclassroomidstudent",
      "getIDstudent",
      "uncheckItemsstudent",
      "deleteMultiplestudent",
      "deletestudent",
      "exportExcelStudent",
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_STUDENT();
        this.getIDstudent(data);
        this.SHOW_FORM_STUDENT();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_STUDENT();
        this.SHOW_FORM_STUDENT();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters([
      "student",
      "allStudent",
      "showIsHidestudent",
      "totalRecordsstudent",
      "pageSizestudent",
      "pageNumberstudent",
      "totalPagesstudent",
      "checkAllstudent",
      "checkAmountstudent",
      "trueCheckedstudent",
      "classroomstudent",
      "loadingstudent",
      "selectedItemsstudent",
    ]),
  },
  mounted() {
    this.getclassroomstudent();
    this.getstudent();
  },
};
</script>

<style>
</style>
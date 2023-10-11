<template>
  <div class="teacher">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý giáo viên" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách"
                  v-model="searchText"
                  @keydown.enter="filterteachercode(searchText)"
                />
              </div>
              <div class="checked_data" v-show="trueCheckedteacher">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountteacher }}</p>
                </h3>
                <h3 @click="uncheckItemsteacher">Bỏ chọn</h3>
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
                    deleteMultipleteacher(selectedItemsteacher);
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
                      v-for="data in filteredSubject"
                      :key="data.SubjectId"
                      @click="selectOption(data.SubjectId, data.SubjectName)"
                    >
                      {{ data.SubjectName }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelteacher"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="clearFilterCondition"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingteacher
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
            style="width: 750px"
          >
            <table>
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
                      v-model="checkAllteacher"
                      @change="toggleAllSelectionteacher"
                    />
                    Mã giáo viên
                  </th>
                  <th style="min-width: 155px">Tên giáo viên</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 155px">Email</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">Chuyên môn</th>
                  <th style="min-width: 155px">Loại giáo viên</th>
                  <th style="min-width: 155px">Tình trạng công tác</th>
                  <th style="min-width: 155px">Trình độ</th>
                  <th style="min-width: 170px">Địa chỉ</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in teacher" :key="data.TeacherId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDTEACHER(data.TeacherId)"
                    />
                    {{ data.TeacherCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.TeacherName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.TeacherName }}
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
                    <tippy :content="data.SubjectName">
                      {{ data.SubjectName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Duty">
                      {{ data.Duty }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Collaborate">
                      {{ data.Collaborate }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Standard">
                      {{ data.Standard }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Address">
                      {{ data.Address }}
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
                          deleteteacher(data.TeacherId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="teacher.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingteacher" />
          </div>
          <AdminPaginnation
            :HIDE="HIDETEACHER"
            :showIsHide="showIsHideteacher"
            :totalRecords="totalRecordsteacher"
            :pageNumber="pageNumberteacher"
            :pageSize="pageSizeteacher"
            :totalPages="totalPagesteacher"
            :setPageNumber="setPageNumberteacher"
            :setSize="setSizeteacher"
          />
        </div>
      </div>
    </div>
    <FTeacher />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { format } from "date-fns";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FTeacher from "../components/Form/FTeacher.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Teacher",
  data() {
    const toast = () => {
      createToast(
        {
          title: "Giáo viên",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const selectedOption = ref("");
    const searchText = ref("");
    const isOpen = ref(false);
    return {
      toast,
      isOpen,
      selectedOption,
      searchText,
    };
  },
  computed: {
    ...mapGetters([
      "subjectteacher",
      "teacher",
      "allTeacher",
      "showIsHideteacher",
      "totalRecordsteacher",
      "pageSizeteacher",
      "pageNumberteacher",
      "totalPagesteacher",
      "checkAllteacher",
      "checkAmountteacher",
      "trueCheckedteacher",
      "subjectteacher",
      "loadingteacher",
      "selectedItemsteacher",
    ]),
    filteredSubject() {
      const keyword = this.selectedOption.toLowerCase();
      return this.subjectteacher.filter((data) =>
        data.SubjectName.toLowerCase().includes(keyword)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.selectedOption = options;
      this.filterteachersubject(id);
      this.isOpen = false;
    },
    clearFilterCondition() {
      try {
        this.getteacher();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_TEACHER",
      "SELECTCHECKEDTEACHER",
      "HIDETEACHER",
      "SHOW_FORM_TEACHER",
      "ADD_MODE_TEACHER",
      "UPDATE_MODE_TEACHER",
    ]),
    ...mapActions([
      "setPageNumberteacher",
      "setSizeteacher",
      "getteacher",
      "toggleAllSelectionteacher",
      "getsubjectteacher",
      "filterteachersubject",
      "filterteachercode",
      "uncheckItemsteacher",
      "deleteMultipleteacher",
      "deleteteacher",
      "getIDteacher",
      "exportExcelteacher",
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_TEACHER();
        this.getIDteacher(data);
        this.SHOW_FORM_TEACHER();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_TEACHER();
        this.SHOW_FORM_TEACHER();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FTeacher,
    Loading,
    VButton,
  },
  mounted() {
    this.getteacher();
    this.getsubjectteacher();
  },
};
</script>

<style>
</style>
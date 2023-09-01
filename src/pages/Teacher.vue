<template>
  <div class="teacher">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý giáo viên" :showform="SHOW_FORM_TEACHER" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
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
                      v-for="data in subjectList"
                      :key="data.id"
                      @click="selectOption(data.name)"
                    >
                      {{ data.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div class="table-wrapper mg-bot">
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
                    <tippy :content="data.Address">
                      {{ data.Address }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span content="Xóa" v-tippy
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Teacher",
  data() {
    return {
      subjectList: [
        { id: 1, name: "Toán học" },
        { id: 2, name: "Ngữ Văn" },
        { id: 3, name: "Sinh học" },
        { id: 4, name: "Nghệ thuật" },
        { id: 5, name: "Lịch sử" },
        { id: 6, name: "Địa Lý" },
        { id: 7, name: "Hóa học" },
        { id: 8, name: "Tiếng Anh" },
        { id: 9, name: "Vật lý" },
      ],
      isOpen: false,
      selectedOption: null,
    };
  },
  computed: {
    ...mapGetters([
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
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    ...mapMutations([
      "SET_PAGE_TEACHER",
      "HIDETEACHER",
      "SELECTCHECKEDTEACHER",
      "HIDETEACHER",
      "SHOW_FORM_TEACHER",
    ]),
    ...mapActions([
      "setPageNumberteacher",
      "setSizeteacher",
      "getteacher",
      "toggleAllSelectionteacher",
      "getsubjectteacher",
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FTeacher,
  },
  mounted() {
    this.getteacher();
    this.getsubjectteacher();
  },
};
</script>

<style>
</style>
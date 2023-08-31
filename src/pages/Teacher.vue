<template>
  <div class="teacher">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý giáo viên" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
            </div>
            <div class="filter_item">
              <Dropdown text="Chọn điều kiện lọc" :options="subject" />
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { format } from "date-fns";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ref } from "vue";
import Dropdown from "../components/Dropdown/Dropdown.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Teacher",
  data() {
    const text = ref("le son");
    return {
      text,
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
    ...mapMutations([
      "SET_PAGE_TEACHER",
      "HIDETEACHER",
      "SELECTCHECKEDTEACHER",
      "HIDETEACHER",
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
    Dropdown,
    AdminPaginnation,
  },
  mounted() {
    this.getteacher();
    this.getsubjectteacher();
  },
};
</script>

<style>
</style>
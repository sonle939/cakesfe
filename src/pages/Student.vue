<template>
  <div class="student">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý học sinh" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
            </div>
            <div class="filter_item">
              <Dropdown
                text="Chọn điều kiện lọc"
                :options="dropdownOptions"
                @option-selected="handleOptionSelected"
              />
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
                      v-model="checkAll"
                      @change="toggleAllSelection"
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
                      @click="delItemCheck(data.StudentId)"
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
            :showIsHide="showIsHidestudent"
            :totalRecords="totalRecordsstudent"
            :pageNumber="pageNumberstudent"
            :pageSize="pageSizestudent"
            :totalPages="totalPagesstudent"
            :setPageNumber="setPageNumberstudent"
            :setSize="setSizestudent"
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
import Dropdown from "../components/Dropdown/Dropdown.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { format } from "date-fns";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Student",
  data() {
    return {};
  },
  components: {
    Navbar,
    Sidebar,
    Dropdown,
    HeaderContent,
    AdminPaginnation,
  },
  methods: {
    ...mapMutations(["SET_PAGE", "HIDE", "SELECTCHECKED"]),
    ...mapActions([
      "setPageNumberstudent",
      "setSizestudent",
      "getstudent",
      "toggleAllSelection",
      "getclassroom",
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
  },
  computed: {
    ...mapGetters([
      "student",
      "allStudent",
      "showIsHidestudent",
      "totalRecordsstudent",
      "pageSizestudent",
      "hasMoreItems",
      "pageNumberstudent",
      "totalPagesstudent",
      "checkAll",
      "checkAmount",
      "trueChecked",
      "classroom",
    ]),
  },
  mounted() {
    this.getclassroom();
    this.getstudent();
  },
};
</script>

<style>
</style>
<template>
  <div class="ttimetable">
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
        <HeaderContent
          text="Quản lý thời khóa biểu"
          :showform="modeFormInsert"
        />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div
                class="sear_item_text"
                style="display: flex; align-items: center; margin-right: 10px"
              >
                <p style="margin-right: 5px; font-size: 17px; font-weight: 700">
                  Lớp học
                </p>
                <div class="dropdown" style="width: 200px">
                  <input
                    type="text"
                    v-model="selectedOption"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdown"
                  />
                  <i
                    @click="toggleDropdown"
                    :class="
                      isOpen
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div class="overlaylist" v-show="isOpen" style="width: 200px">
                    <ul ref="list">
                      <li
                        v-for="data in filteredClassroom"
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
              </div>
              <div
                class="sear_item_text"
                style="display: flex; align-items: center; margin-right: 10px"
              >
                <p style="margin-right: 5px; font-size: 17px; font-weight: 700">
                  Giáo viên
                </p>
                <div class="dropdown" style="width: 200px">
                  <input
                    type="text"
                    v-model="selectedOptionTeacher"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdownTeacher"
                  />
                  <i
                    @click="toggleDropdownTeacher"
                    :class="
                      isOpenTeacher
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div
                    class="overlaylist"
                    v-show="isOpenTeacher"
                    style="width: 200px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in filteredTeacher"
                        :key="data.ClassRoomId"
                        @click="
                          selectOptionTeacher(data.TeacherId, data.TeacherName)
                        "
                      >
                        {{ data.TeacherName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="sear_item_text"
                style="display: flex; align-items: center; margin-right: 10px"
              >
                <p style="margin-right: 5px; font-size: 17px; font-weight: 700">
                  Môn học
                </p>
                <div class="dropdown" style="width: 200px">
                  <input
                    type="text"
                    v-model="selectedOptionSubject"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdownSubject"
                  />
                  <i
                    @click="toggleDropdownSubject"
                    :class="
                      isOpenSubject
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div
                    class="overlaylist"
                    v-show="isOpenSubject"
                    style="width: 200px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in filteredSubject"
                        :key="data.SubjectId"
                        @click="
                          selectOptionSubject(data.SubjectId, data.SubjectName)
                        "
                      >
                        {{ data.SubjectName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="checked_data" v-show="trueCheckedtimetable">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmounttimetable }}</p>
                </h3>
                <h3 @click="uncheckItemstimetable">Bỏ chọn</h3>
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
                    deleteMultipletimetable(selectedItemstimetable);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelTimetable"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingtimetable
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
                      v-model="checkAlltimetable"
                      @change="toggleAllSelectiontimetable"
                    />
                    Mã khóa biểu
                  </th>
                  <th style="min-width: 155px">Môn học</th>
                  <th style="min-width: 170px">Ngày học</th>
                  <th style="min-width: 170px">Buổi học</th>
                  <th style="min-width: 155px">Giờ bắt đầu</th>
                  <th style="min-width: 170px">Giờ kết thúc</th>
                  <th style="min-width: 155px">Thời gian biểu của lớp</th>
                  <th style="min-width: 170px">Giáo viên dạy</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in timetable" :key="data.TimeTableId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDTIMETABLE(data.TimeTableId)"
                    />
                    {{ data.TimeTableCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.SubjectName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.SubjectName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.DayLearn"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.DayLearn }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.TimeType"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.TimeType }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.TimeStart">
                      {{ data.TimeStart }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.TimeEnd">
                      {{ data.TimeEnd }}
                    </tippy>
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
                    <tippy
                      :content="data.TeacherName"
                      v-tippy="{ interactive: true }"
                    >
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
                          deletetimetable(data.TimeTableId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="timetable.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingtimetable" />
          </div>
          <AdminPaginnation
            :showIsHide="showIsHidetimetable"
            :totalRecords="totalRecordstimetable"
            :pageNumber="pageNumbertimetable"
            :pageSize="pageSizestimetable"
            :totalPages="totalPagestimetable"
            :setPageNumber="setPageNumbertimetable"
            :setSize="setSizetimetable"
            :HIDE="HIDETIMETABLE"
          />
        </div>
      </div>
    </div>
    <FTimetableVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import FTimetableVue from "../components/Form/FTimetable.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import Loading from "../components/Loading.vue";
import { ref } from "vue";
export default {
  name: "TimeTable",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const isOpen = ref(false);
    const isOpenTeacher = ref(false);
    const selectedOption = ref("");
    const selectedOptionTeacher = ref("");
    const isOpenSubject = ref(false);
    const selectedOptionSubject = ref("");
    const searchtext = ref("");
    return {
      toast,
      isOpen,
      isOpenSubject,
      isOpenTeacher,
      selectedOption,
      selectedOptionTeacher,
      selectedOptionSubject,
      searchtext,
    };
  },
  computed: {
    filteredClassroom() {
      const keyword = this.selectedOption.toLowerCase();
      return this.classroomtimetable.filter((data) =>
        data.ClassRoomName.toLowerCase().includes(keyword)
      );
    },
    filteredTeacher() {
      const keyword = this.selectedOptionTeacher.toLowerCase();
      return this.teacherAll.filter((data) =>
        data.TeacherName.toLowerCase().includes(keyword)
      );
    },
    filteredSubject() {
      const keyword = this.selectedOptionSubject.toLowerCase();
      return this.subjecttimetable.filter((data) =>
        data.SubjectName.toLowerCase().includes(keyword)
      );
    },
    ...mapGetters([
      "timetable",
      "showIsHidetimetable",
      "totalRecordstimetable",
      "pageSizestimetable",
      "pageNumbertimetable",
      "totalPagestimetable",
      "checkAlltimetable",
      "checkAmounttimetable",
      "trueCheckedtimetable",
      "classroomtimetable",
      "teachertimetable",
      "subjecttimetable",
      "loadingtimetable",
      "selectedItemstimetable",
      "backgroundWeb",
      "directiondiv",
      "teacherAll",
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.setFilterclassroomidtimetable(id);
      this.selectedOption = options;
      this.isOpen = false;
    },
    toggleDropdownSubject() {
      this.isOpenSubject = !this.isOpenSubject;
    },
    selectOptionSubject(id, options) {
      this.setFiltersubjectidtimetable(id);
      this.selectedOptionSubject = options;
      this.isOpenSubject = false;
    },
    toggleDropdownTeacher() {
      this.isOpenTeacher = !this.isOpenTeacher;
    },
    selectOptionTeacher(id, options) {
      this.setFilterteacheridtimetable(id);
      this.selectedOptionTeacher = options;
      this.isOpenTeacher = false;
    },
    clearFilterCondition() {
      try {
        this.gettimetable();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_TIMETABLE",
      "HIDETIMETABLE",
      "SELECTCHECKEDTIMETABLE",
      "SHOW_FORM_TIMETABLE",
      "UPDATE_MODE_TIMETABLE",
      "ADD_MODE_TIMETABLE",
    ]),
    ...mapActions([
      "setPageNumbertimetable",
      "setSizetimetable",
      "gettimetable",
      "toggleAllSelectiontimetable",
      //LAY RA DU LIEU THEO KHOA NGOAI
      "getclassroomtimetable",
      "getteachertimetable",
      "getsubjecttimetable",
      //DUNG DE PHAN TRANG
      "setFilterteacheridtimetable",
      "setFiltersubjectidtimetable",
      "setFilterclassroomidtimetable",
      //KET THUC PHAN TRANG ID
      "getIDtimetable",
      "uncheckItemstimetable",
      "deleteMultipletimetable",
      "deletetimetable",
      "exportExcelTimetable",
      "getteacherAll",
    ]),
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_TIMETABLE();
        this.getIDtimetable(data);
        this.SHOW_FORM_TIMETABLE();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_TIMETABLE();
        this.SHOW_FORM_TIMETABLE();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.gettimetable();
    this.getclassroomtimetable();
    this.getsubjecttimetable();
    this.getteachertimetable();
    this.getteacherAll();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FTimetableVue,
    VButton,
    Loading,
  },
};
</script>

<style>
</style>
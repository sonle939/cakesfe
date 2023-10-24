<template>
  <div class="form_container" v-if="isshowtimetable">
    <div class="notify_error" v-if="checkForm">
      <div class="error_wrapper">
        <div class="error_text">
          <h1>Dữ liệu không hợp lệ</h1>
          <i class="bx bx-x" @click="handleClose"></i>
        </div>
        <ul>
          <li v-for="(erro, index) in error" :key="index">
            <i class="bx bxs-error"></i>
            {{ erro }}
          </li>
        </ul>
        <div class="error_btn">
          <button @click="handleClose">Đồng ý</button>
        </div>
      </div>
    </div>
    <form
      class="timetable_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModetimetable === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới thời khóa biểu</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TIMETABLE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã thời khóa biểu
          <input
            type="text"
            class="sinput"
            placeholder="mã thời khóa biểu"
            v-model="formData.TimeTableCode"
            style="width: 150px"
          />
        </label>
        <label class="slabel" @click="toggleDropdowndaylearn">
          Ngày học
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="selectedOptiondaylearn"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdowndaylearn"
              :class="
                isOpendaylearn
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpendaylearn"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionDayLearn"
                  :key="data.id"
                  @click="selectOptiondaylearn(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownlearntype">
          Buổi học
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="selectedOptionlearntype"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownlearntype"
              :class="
                isOpenlearntype
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenlearntype"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionlearntype"
                  :key="data.id"
                  @click="selectOptionlearntype(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdowntimestart">
          Giờ bắt đầu
          <div class="dropdown" style="margin-top: 8px; width: 150px">
            <input
              type="text"
              v-model="selectedOptiontimestart"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdowntimestart"
              :class="
                isOpentimestart
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpentimestart"
              style="width: 150px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredOptionTime"
                  :key="data.id"
                  @click="selectOptiontimestart(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel"
          >Giờ kết thúc
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="filterTimeEnd"
            placeholder="giờ kết thúc"
            disabled
          />
        </label>
        <label class="slabel" @click="toggleDropdownsubject">
          Thông tin môn học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionsubject"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsubject"
              :class="
                isOpenssubject
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenssubject">
              <ul ref="list">
                <li
                  v-for="data in filteredSubject"
                  :key="data.SubjectId"
                  @click="selectOptionsubject(data.SubjectId, data.SubjectName)"
                >
                  {{ data.SubjectName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label
          class="slabel"
          @click="toggleDropdownclassroom"
          style="margin-left: 24px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px; width: 345px">
            <input
              type="text"
              v-model="selectedOptionclassroom"
              placeholder="Chọn lớp học"
            />
            <i
              @click="toggleDropdownclassroom"
              :class="
                isOpenclassroom
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenclassroom"
              style="width: 345px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredClassroom"
                  :key="data.ClassRoomId"
                  @click="
                    selectOptionclassroom(data.ClassRoomId, data.ClassRoomName)
                  "
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacher">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionteacher"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacher"
              :class="
                isOpensteacher
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpensteacher">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacher"
                  :key="data.TeacherId"
                  @click="selectOptionteacher(data.TeacherId, data.TeacherName)"
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TIMETABLE" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu"  @click="build = true"/>
          <VButton type="submit" class="ml-8" text="Cất và thêm"  @click="build = false"/>
        </div>
      </div>
    </form>
    <form
      class="timetable_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModetimetable === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật thời khóa biểu</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TIMETABLE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã thời khóa biểu
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="getByIdtimetable.TimeTableCode"
            style="width: 150px"
          />
        </label>
        <label class="slabel" @click="toggleDropdowndaylearnUpdate">
          Ngày học
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="getByIdtimetable.DayLearn"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdowndaylearnUpdate"
              :class="
                isOpendaylearnUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpendaylearnUpdate"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionDayLearn"
                  :key="data.id"
                  @click="selectOptiondaylearnUpdate(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownlearntypeUpdate">
          Buổi học
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="getByIdtimetable.TimeType"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownlearntypeUpdate"
              :class="
                isOpenlearntypeUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenlearntypeUpdate"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionlearntype"
                  :key="data.id"
                  @click="selectOptionlearntypeUpdate(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdowntimestartUpdate">
          Giờ bắt đầu
          <div class="dropdown" style="margin-top: 8px; width: 150px">
            <input
              type="text"
              v-model="getByIdtimetable.TimeStart"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdowntimestartUpdate"
              :class="
                isOpentimestartUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpentimestartUpdate"
              style="width: 150px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredOptionTime"
                  :key="data.id"
                  @click="selectOptiontimestartUpdate(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel"
          >Giờ kết thúc
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="filterTimeEndUpdate"
            disabled
          />
        </label>
        <label class="slabel" @click="toggleDropdownsubjectUpdate">
          Thông tin môn học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdtimetable.SubjectName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsubjectUpdate"
              :class="
                isOpenssubjectUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenssubjectUpdate">
              <ul ref="list">
                <li
                  v-for="data in filteredSubjectUpate"
                  :key="data.SubjectId"
                  @click="
                    selectOptionsubjectUpdate(data.SubjectId, data.SubjectName)
                  "
                >
                  {{ data.SubjectName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label
          class="slabel"
          @click="toggleDropdownclassroomUpdate"
          style="margin-left: 24px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px; width: 345px">
            <input
              type="text"
              v-model="getByIdtimetable.ClassRoomName"
              placeholder="Chọn lớp học"
            />
            <i
              @click="toggleDropdownclassroomUpdate"
              :class="
                isOpenclassroomUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenclassroomUpdate"
              style="width: 345px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredClassroomUpdate"
                  :key="data.ClassRoomId"
                  @click="
                    selectOptionclassroomUpdate(
                      data.ClassRoomId,
                      data.ClassRoomName
                    )
                  "
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacherUpdate">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdtimetable.TeacherName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacherUpdate"
              :class="
                isOpensteacherUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpensteacherUpdate">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacherUpdate"
                  :key="data.TeacherId"
                  @click="
                    selectOptionteacherUpdate(data.TeacherId, data.TeacherName)
                  "
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TIMETABLE" />
        <div class="btn_wp">
          <VButton text="Cập nhật" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>
    
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { reactive } from "vue";
export default {
  name: "FTimetable",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 2000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 5000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = reactive({
      TimeTableCode: "",
      SubjectId: "",
      TeacherId: "",
      ClassRoomId: "",
      DayLearn: "",
      TimeType: "",
      TimeStart: "",
      TimeEnd: "",
    });
    const isOpentimestart = ref(false);
    const isOpentimestartUpdate = ref(false);
    const isOpendaylearn = ref(false);
    const isOpendaylearnUpdate = ref(false);
    const isOpenlearntype = ref(false);
    const isOpenlearntypeUpdate = ref(false);
    const isOpenclassroom = ref(false);
    const isOpenssubject = ref(false);
    const isOpensteacher = ref(false);
    const isOpenclassroomUpdate = ref(false);
    const isOpenssubjectUpdate = ref(false);
    const isOpensteacherUpdate = ref(false);
    const selectedOptionsubject = ref("");
    const selectedOptionteacher = ref("");
    const selectedOptionclassroom = ref("");
    const selectedOptiontimestart = ref("");
    const selectedOptiondaylearn = ref("");
    const selectedOptionlearntype = ref("");
    const optionTime = ref([
      { id: 1, name: "7h00p" },
      { id: 2, name: "7h50p" },
      { id: 3, name: "9h05p" },
      { id: 4, name: "9h55p" },
      { id: 5, name: "10h45p" },
      { id: 6, name: "14h00p" },
    ]);
    const optionDayLearn = ref([
      { id: 1, name: "Thứ 2" },
      { id: 2, name: "Thứ 3" },
      { id: 3, name: "Thứ 4" },
      { id: 4, name: "Thứ 5" },
      { id: 5, name: "Thứ 6" },
      { id: 5, name: "Thứ 7" },
    ]);
    const optionlearntype = ref([
      { id: 1, name: "Buổi sáng" },
      { id: 2, name: "Buổi chiều" },
    ]);
    return {
      toast,
      toastUpdate,
      checkForm,
      optionDayLearn,
      optionlearntype,
      error,
      build,
      formData,
      isOpentimestart,
      isOpenclassroom,
      isOpenssubject,
      isOpensteacher,
      isOpenclassroomUpdate,
      isOpentimestartUpdate,
      isOpenssubjectUpdate,
      isOpensteacherUpdate,
      selectedOptionsubject,
      selectedOptionteacher,
      selectedOptionclassroom,
      selectedOptiontimestart,
      optionTime,
      isOpendaylearn,
      isOpendaylearnUpdate,
      selectedOptiondaylearn,
      isOpenlearntype,
      isOpenlearntypeUpdate,
      selectedOptionlearntype,
    };
  },
  computed: {
    filteredOptionTime() {
      if (
        this.selectedOptionlearntype == "Buổi sáng" ||
        this.getByIdtimetable.TimeType == "Buổi sáng"
      ) {
        return this.optionTime.slice(0, 5); // Trả về thời gian buổi sáng
      } else if (
        this.selectedOptionlearntype == "Buổi chiều" ||
        this.getByIdtimetable.TimeType == "Buổi chiều"
      ) {
        return this.optionTime.slice(5); // Trả về thời gian buổi chiều
      } else {
        return []; // Trả về một mảng rỗng nếu không có buổi học nào được chọn hoặc buổi học không tồn tại
      }
    },
    // filteredTeacher() {
    //   if (this.selectedOptionteacher) {
    //     const teacherKeyword = this.selectedOptionteacher.toLowerCase();
    //     return this.teachertimetable.filter(
    //       (data) =>
    //         data.TeacherName &&
    //         data.TeacherName.toLowerCase().includes(teacherKeyword)
    //     );
    //   } else if (this.selectedOptionsubject) {
    //     const subjectKeyword = this.selectedOptionsubject.toLowerCase();
    //     return this.teachertimetable.filter(
    //       (data) =>
    //         data.SubjectName &&
    //         data.SubjectName.toLowerCase().includes(subjectKeyword)
    //     );
    //   } else {
    //     // Trả về toàn bộ danh sách sinh viên nếu cả hai selectedOptionteacher và selectedOptionsubject đều là null
    //     return this.teachertimetable;
    //   }
    // },
    filteredTeacher() {
      const teacherNames = new Set();

      if (this.selectedOptionteacher) {
        const teacherKeyword = this.selectedOptionteacher.toLowerCase();
        return this.assignmentAll.filter((data) => {
          if (
            data.TeacherName &&
            data.TeacherName.toLowerCase().includes(teacherKeyword) &&
            !teacherNames.has(data.TeacherName)
          ) {
            teacherNames.add(data.TeacherName);
            return true;
          }
          return false;
        });
      } else if (this.selectedOptionsubject && this.selectedOptionclassroom) {
        const subjectKeyword = this.selectedOptionsubject.toLowerCase();
        const teacherKeyword = this.selectedOptionclassroom.toLowerCase();
        return this.assignmentAll.filter((data) => {
          if (
            data.SubjectName &&
            data.ClassRoomName &&
            data.SubjectName.toLowerCase().includes(subjectKeyword) &&
            data.ClassRoomName.toLowerCase().includes(teacherKeyword) &&
            !teacherNames.has(data.TeacherName)
          ) {
            teacherNames.add(data.TeacherName);
            return true;
          }
          return false;
        });
      } else {
        // Trả về toàn bộ danh sách nhiệm vụ (assignments) nếu cả hai selectedOptionteacher và selectedOptionsubject đều là null
        return this.assignmentAll;
      }
    },
    filteredTeacherUpdate() {
      if (this.getByIdtimetable.TeacherName) {
        const teacherKeyword = this.getByIdtimetable.TeacherName.toLowerCase();
        return this.filterAssignment.filter(
          (data) =>
            data.TeacherName &&
            data.TeacherName.toLowerCase().includes(teacherKeyword)
        );
      } else if (
        this.getByIdtimetable.SubjectName &&
        this.getByIdtimetable.ClassRoomName
      ) {
        const subjectKeyword = this.getByIdtimetable.SubjectName.toLowerCase();
        const classroomKeyword =
          this.getByIdtimetable.ClassRoomName.toLowerCase();
        return this.filterAssignment.filter(
          (data) =>
            data.SubjectName &&
            data.ClassRoomName &&
            data.SubjectName.toLowerCase().includes(subjectKeyword) &&
            data.ClassRoomName.toLowerCase().includes(classroomKeyword)
        );
      } else {
        // Trả về toàn bộ danh sách sinh viên nếu cả hai selectedOptionteacher và selectedOptionsubject đều là null
        return this.filterAssignment;
      }
    },
    filterTimeEnd() {
      if (this.selectedOptiontimestart == "7h00p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "7h45p");
      } else if (this.selectedOptiontimestart == "7h50p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "8h35p");
        // eslint-disable-next-line no-dupe-else-if
      } else if (this.selectedOptiontimestart == "9h05p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "9h50p");
      } else if (this.selectedOptiontimestart == "9h55p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "10h40p");
      } else if (this.selectedOptiontimestart == "10h45p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "11h40p");
      } else if (this.selectedOptiontimestart == "14h00p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "16h40p");
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.formData.TimeEnd = "giờ kết thúc");
      }
    },
    filterTimeEndUpdate() {
      if (this.getByIdtimetable.TimeStart == "7h00p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "7h45p");
      } else if (this.getByIdtimetable.TimeStart == "7h50p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "8h35p");
        // eslint-disable-next-line no-dupe-else-if
      } else if (this.getByIdtimetable.TimeStart == "9h05p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "9h50p");
      } else if (this.getByIdtimetable.TimeStart == "9h55p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "10h40p");
      } else if (this.getByIdtimetable.TimeStart == "10h45p") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "11h40p");
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.getByIdtimetable.TimeEnd = "16h40p");
      }
    },
    filteredSubject() {
      if (this.selectedOptionsubject) {
        const keyword = this.selectedOptionsubject.toLowerCase();
        return this.subjecttimetable.filter((data) =>
          data.SubjectName.toLowerCase().includes(keyword)
        );
      } else {
        return this.subjecttimetable;
      }
    },
    filteredSubjectUpate() {
      if (this.getByIdtimetable.SubjectName) {
        const keyword = this.getByIdtimetable.SubjectName.toLowerCase();
        return this.subjecttimetable.filter((data) =>
          data.SubjectName.toLowerCase().includes(keyword)
        );
      } else {
        return this.subjecttimetable;
      }
    },
    filteredClassroom() {
      if (this.selectedOptionclassroom) {
        const keyword = this.selectedOptionclassroom.toLowerCase();
        return this.classroomtimetable.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroomtimetable;
      }
    },
    filteredClassroomUpdate() {
      if (this.getByIdtimetable.ClassRoomName) {
        const keyword = this.getByIdtimetable.ClassRoomName.toLowerCase();
        return this.classroomtimetable.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroomtimetable;
      }
    },
    filterAssignment() {
      const teacherNames = new Set();
      return this.assignmentAll.filter((item) => {
        if (!teacherNames.has(item.TeacherName)) {
          teacherNames.add(item.TeacherName);
          return true;
        }
        return false;
      });
    },
    ...mapGetters([
      "subjecttimetable",
      "teachertimetable",
      "classroomtimetable",
      "isshowtimetable",
      "timetable",
      "timetablemaxcode",
      "formModetimetable",
      "getByIdtimetable",
      "assignmentAll",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        TimeTableCode: this.timetablemaxcode,
      });
    },
    TimetableList() {
      return this.timetable
        .filter(
          (item) => item.TimeTableId !== this.getByIdtimetable.TimeTableId
        )
        .map((employee) => {
          return employee.TimeTableCode;
        });
    },
  },
  methods: {
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    toggleDropdownsubject() {
      this.isOpenssubject = !this.isOpenssubject;
    },
    toggleDropdownteacher() {
      this.isOpensteacher = !this.isOpensteacher;
    },
    toggleDropdownclassroomUpdate() {
      this.isOpenclassroomUpdate = !this.isOpenclassroomUpdate;
    },
    toggleDropdownsubjectUpdate() {
      this.isOpenssubjectUpdate = !this.isOpenssubjectUpdate;
    },
    toggleDropdownteacherUpdate() {
      this.isOpensteacherUpdate = !this.isOpensteacherUpdate;
    },
    toggleDropdowntimestart() {
      this.isOpentimestart = !this.isOpentimestart;
    },
    toggleDropdowntimestartUpdate() {
      this.isOpentimestartUpdate = !this.isOpentimestartUpdate;
    },
    toggleDropdowndaylearn() {
      this.isOpendaylearn = !this.isOpendaylearn;
    },
    toggleDropdowndaylearnUpdate() {
      this.isOpendaylearnUpdate = !this.isOpendaylearnUpdate;
    },
    toggleDropdownlearntype() {
      this.isOpenlearntype = !this.isOpenlearntype;
    },
    toggleDropdownlearntypeUpdate() {
      this.isOpenlearntypeUpdate = !this.isOpenlearntypeUpdate;
    },
    selectOptiontimestart(options) {
      this.formData.TimeStart = options;
      this.selectedOptiontimestart = options;
      this.isOpentimestart = false;
    },
    selectOptiontimestartUpdate(options) {
      this.getByIdtimetable.TimeStart = options;
      this.isOpentimestartUpdate = false;
    },
    selectOptionlearntype(options) {
      this.formData.TimeType = options;
      this.selectedOptionlearntype = options;
      this.isOpenlearntype = false;
    },
    selectOptionlearntypeUpdate(options) {
      this.getByIdtimetable.TimeType = options;
      this.isOpenlearntypeUpdate = false;
    },
    selectOptiondaylearn(options) {
      this.formData.DayLearn = options;
      this.selectedOptiondaylearn = options;
      this.isOpendaylearn = false;
    },
    selectOptiondaylearnUpdate(options) {
      this.getByIdtimetable.DayLearn = options;
      this.isOpendaylearnUpdate = false;
    },
    selectOptionclassroom(id, options) {
      this.formData.ClassRoomId = id;
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    selectOptionsubject(id, options) {
      this.formData.SubjectId = id;
      this.selectedOptionsubject = options;
      this.isOpenssubject = false;
    },
    selectOptionteacher(id, options) {
      this.formData.TeacherId = id;
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
    },
    selectOptionclassroomUpdate(id, options) {
      this.getByIdtimetable.ClassRoomId = id;
      this.getByIdtimetable.ClassRoomName = options;
      this.isOpenclassroom = false;
    },
    selectOptionsubjectUpdate(id, options) {
      this.getByIdtimetable.SubjectId = id;
      this.getByIdtimetable.SubjectName = options;
      this.isOpenssubject = false;
    },
    selectOptionteacherUpdate(id, options) {
      this.getByIdtimetable.TeacherId = id;
      this.getByIdtimetable.TeacherName = options;
      this.isOpensteacher = false;
    },
    checkCodeTimetable(code) {
      try {
        if (this.TimetableList.includes(code)) {
          console.log(code);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleClose() {
      try {
        this.checkForm = !this.checkForm;
        this.error = [];
      } catch (error) {
        console.log(error);
      }
    },
    validateFormAdd() {
      try {
        let isValid = true;
        switch (true) {
          case this.timetable.findIndex(
            (ele) => ele.TimeTableCode === this.formData.TimeTableCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã thời khóa biểu nhập bị trùng");
            break;
          case this.formData.TimeTableCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã thời khóa biểu");
            break;
          case this.formData.DayLearn.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập ngày học");
            break;
          case this.formData.TimeStart === "":
            isValid = false;
            this.error.push("Vui lòng nhập giờ bắt đầu");
            break;
          case this.formData.TimeEnd === "":
            isValid = false;
            this.error.push("Vui lòng nhập giờ kết thúc");
            break;
          case this.selectedOptionclassroom === "":
            isValid = false;
            this.error.push("Vui lòng chọn lớp học");
            break;
          case this.selectedOptionsubject === "":
            isValid = false;
            this.error.push("Vui lòng chọn môn học");
            break;
          case this.selectedOptionteacher === "":
            isValid = false;
            this.error.push("Vui lòng chọn giáo viên dạy");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    validateFormUpdate() {
      try {
        let isValid = true;
        switch (true) {
          case this.checkCodeTimetable(this.getByIdtimetable.TimeTableCode):
            isValid = false;
            this.error.push("Mã thời khóa biểu bị trùng");
            break;
          case this.getByIdtimetable.TimeTableCode.trim() === "":
            isValid = false;
            this.error.push("Mã thời khóa biểu không được để trống");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitAdd() {
      try {
        this.checkForm = true;
        if (this.validateFormAdd()) {
          this.addtimetable({
            TimeTableId: uuidv4(),
            TimeTableCode: this.formData.TimeTableCode,
            SubjectId: this.formData.SubjectId,
            TeacherId: this.formData.TeacherId,
            ClassRoomId: this.formData.ClassRoomId,
            DayLearn: this.formData.DayLearn,
            TimeType: this.formData.TimeType,
            TimeStart: this.formData.TimeStart,
            TimeEnd: this.formData.TimeEnd,
            isChecked: false,
          });
          // reset formData
          this.formData = { TimeTableCode: this.timetablemaxcode };
          this.selectedOptionclassroom = "";
          this.selectedOptionsubject = "";
          this.selectedOptionteacher = "";
          this.selectedOptiondaylearn = "";
          this.selectedOptionlearntype = "";
          this.selectedOptiontimestart = "";
          if (this.build === true) {
            this.SHOW_FORM_TIMETABLE();
            this.formData = { TimeTableCode: this.timetablemaxcode };
          }

          this.toast();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitUpdate() {
      try {
        this.checkForm = true;
        if (this.validateFormUpdate()) {
          this.getByIdtimetable.IsChecked = false;
          this.updateItemtimetable(this.getByIdtimetable);
          this.SHOW_FORM_TIMETABLE();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getsubjecttimetable",
      "getteachertimetable",
      "getclassroomtimetable",
      "getMaxCodetimetable",
      "updateItemtimetable",
      "addtimetable",
      "getassignmentAll",
    ]),
    ...mapMutations(["SHOW_FORM_TIMETABLE"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getsubjecttimetable();
    this.getteachertimetable();
    this.getclassroomtimetable();
    this.getMaxCodetimetable();
    this.getassignmentAll();
  },
  components: {
    VButton,
  },
};
</script>
    
<style scoped>
.form_container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in;
}
.info_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}
.title_close {
  display: flex;
  align-items: center;
  position: absolute;
  right: -22px;
  top: -22px;
}
.title_close i {
  font-size: 24px;
  color: #666666;
  margin-right: 10px;
}
.title_close i:nth-child(2) {
  margin-right: 0;
  font-size: 34px;
}
.timetable_form {
  height: 40%;
  width: 60%;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  padding-bottom: 20px;
  animation: aniForm 0.6s linear;
  position: relative;
}
.info_property {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
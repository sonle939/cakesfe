<template>
  <div class="form_container" v-if="isshowpoint">
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
      class="point_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModepoint === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới điểm học sinh</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_POINT"></i>
        </div>
      </div>
      <div class="point_wrapper">
        <div class="point_review">
          <label class="slabel"
            >ĐĐGTX1
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX1"
              style="width: 75px"
              v-model="formData.ĐĐGTX1"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX2
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX2"
              style="width: 75px"
              v-model="formData.ĐĐGTX2"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX3
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX3"
              style="width: 75px"
              v-model="formData.ĐĐGTX3"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX4
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX4"
              style="width: 75px"
              v-model="formData.ĐĐGTX4"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐĐGGK
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGGK"
              style="width: 200px"
              v-model="formData.ĐĐGGK"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐĐGCK
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGCK"
              style="width: 200px"
              v-model="formData.ĐĐGCK"
              @change="calculateResult"
            />
          </label>
          <label class="slabel"
            >ĐTBMKI
            <input
              type="text"
              class="sinput"
              placeholder="ĐTBMKI"
              style="width: 450px"
              v-model="formData.ĐTBMK"
              @change="calculateResult"
              disabled
            />
          </label>
        </div>
        <div class="info_property">
          <label class="slabel">
            Mã điểm
            <input
              type="text"
              class="sinput"
              placeholder="mã nhập điểm"
              style="width: 200px"
              v-model="formData.PointCode"
            />
          </label>
          <label class="slabel" @click="toggleDropdownsubject">
            Thông tin môn học
            <div class="dropdown" style="margin-top: 8px; width: 200px">
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
              <div
                class="overlaylist"
                v-show="isOpenssubject"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSubject"
                    :key="data.SubjectId"
                    @click="
                      selectOptionsubject(data.SubjectId, data.SubjectName)
                    "
                  >
                    {{ data.SubjectName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label class="slabel" @click="toggleDropdownsemester">
            Thông tin học kì
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="selectedOptionsemester"
                placeholder="Chọn giá trị lọc"
              />
              <i
                @click="toggleDropdownsemester"
                :class="
                  isOpensteachersemester
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpensteachersemester"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSemester"
                    :key="data.SemesterId"
                    @click="
                      selectOptionsemester(data.SemesterId, data.SemesterName)
                    "
                  >
                    {{ data.SemesterName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label class="slabel" @click="toggleDropdownschoolyear">
            Thông tin năm học
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="selectedOptionSchoolyear"
                placeholder="Chọn giá trị lọc"
              />
              <i
                @click="toggleDropdownschoolyear"
                :class="
                  isOpenSchoolyear
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpenSchoolyear"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSchoolyear"
                    :key="data.SchoolYearId"
                    @click="
                      selectOptionschoolyear(
                        data.SchoolYearId,
                        data.SchoolYearName
                      )
                    "
                  >
                    {{ data.SchoolYearName }}
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
            <div class="dropdown" style="margin-top: 8px; width: 200px">
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
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredClassroom"
                    :key="data.ClassRoomId"
                    @click="selectOptionclassroom(data.ClassRoomName)"
                  >
                    {{ data.ClassRoomName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label
            class="slabel"
            @click="toggleDropdownsstudent"
            style="margin-left: 24px"
          >
            Thông tin học sinh
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="selectedOptionstudent"
                placeholder="Chọn lớp học"
              />
              <i
                @click="toggleDropdownsstudent"
                :class="
                  isOpenstudent
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpenstudent"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredStudent"
                    :key="data.StudentId"
                    @click="
                      selectOptionstudent(data.StudentId, data.StudentName)
                    "
                  >
                    {{ data.StudentName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
        </div>
      </div>
      <label class="slabel">
        Nhận xét
        <input
          type="text"
          class="sinput"
          placeholder="nhận xét học sinh"
          style="width: 97%"
          v-model="formData.Comment"
        />
      </label>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_POINT" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="point_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModepoint === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật điểm học sinh</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_POINT"></i>
        </div>
      </div>
      <div class="point_wrapper">
        <div class="point_review">
          <label class="slabel"
            >ĐĐGTX1
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX1"
              style="width: 75px"
              v-model="getByIdpoint.ĐĐGTX1"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX2
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX2"
              style="width: 75px"
              v-model="getByIdpoint.ĐĐGTX2"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX3
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX3"
              style="width: 75px"
              v-model="getByIdpoint.ĐĐGTX3"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐĐGTX4
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGTX4"
              style="width: 75px"
              v-model="getByIdpoint.ĐĐGTX4"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐĐGGK
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGGK"
              style="width: 200px"
              v-model="getByIdpoint.ĐĐGGK"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐĐGCK
            <input
              type="text"
              class="sinput"
              placeholder="ĐĐGCK"
              style="width: 200px"
              v-model="getByIdpoint.ĐĐGCK"
              @change="calculateResultUpdate"
            />
          </label>
          <label class="slabel"
            >ĐTBMKI
            <input
              type="text"
              class="sinput"
              placeholder="ĐTBMKI"
              style="width: 450px"
              v-model="getByIdpoint.ĐTBMK"
              @change="calculateResultUpdate"
            />
          </label>
        </div>
        <div class="info_property">
          <label class="slabel">
            Mã điểm
            <input
              type="text"
              class="sinput"
              placeholder="mã nhập điểm"
              style="width: 200px"
              v-model="getByIdpoint.PointCode"
            />
          </label>
          <label class="slabel" @click="toggleDropdownsubjectUpdate">
            Thông tin môn học
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="getByIdpoint.SubjectName"
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
              <div
                class="overlaylist"
                v-show="isOpenssubjectUpdate"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSubject"
                    :key="data.SubjectId"
                    @click="
                      selectOptionsubjectUpdate(
                        data.SubjectId,
                        data.SubjectName
                      )
                    "
                  >
                    {{ data.SubjectName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label class="slabel" @click="toggleDropdownsemesterUpdate">
            Thông tin học kì
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="getByIdpoint.SemesterName"
                placeholder="Chọn giá trị lọc"
              />
              <i
                @click="toggleDropdownsemesterUpdate"
                :class="
                  isOpensteachersemesterUpdate
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpensteachersemesterUpdate"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSemester"
                    :key="data.SemesterId"
                    @click="
                      selectOptionsemesterUpdate(
                        data.SemesterId,
                        data.SemesterName
                      )
                    "
                  >
                    {{ data.SemesterName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label class="slabel" @click="toggleDropdownschoolyearUpdate">
            Thông tin năm học
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="getByIdpoint.SchoolYearName"
                placeholder="Chọn giá trị lọc"
              />
              <i
                @click="toggleDropdownschoolyearUpdate"
                :class="
                  isOpenSchoolyearUpdate
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpenSchoolyearUpdate"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredSchoolyear"
                    :key="data.SchoolYearId"
                    @click="
                      selectOptionschoolyearUpdate(
                        data.SchoolYearId,
                        data.SchoolYearName
                      )
                    "
                  >
                    {{ data.SchoolYearName }}
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
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="getByIdpoint.ClassRoomName"
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
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredClassroom"
                    :key="data.ClassRoomId"
                    @click="selectOptionclassroomUpdate(data.ClassRoomName)"
                  >
                    {{ data.ClassRoomName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <label
            class="slabel"
            @click="toggleDropdownsstudentUpdate"
            style="margin-left: 24px"
          >
            Thông tin học sinh
            <div class="dropdown" style="margin-top: 8px; width: 200px">
              <input
                type="text"
                v-model="getByIdpoint.StudentName"
                placeholder="Chọn lớp học"
              />
              <i
                @click="toggleDropdownsstudentUpdate"
                :class="
                  isOpenstudentUpdate
                    ? 'bx bx-chevron-down active'
                    : 'bx bx-chevron-down'
                "
              ></i>
              <div
                class="overlaylist"
                v-show="isOpenstudentUpdate"
                style="width: 200px"
              >
                <ul ref="list">
                  <li
                    v-for="data in filteredStudent"
                    :key="data.StudentId"
                    @click="
                      selectOptionstudentUpdate(
                        data.StudentId,
                        data.StudentName
                      )
                    "
                  >
                    {{ data.StudentName }}
                  </li>
                </ul>
              </div>
            </div>
          </label>
        </div>
      </div>
      <label class="slabel">
        Nhận xét
        <input
          type="text"
          class="sinput"
          placeholder="nhận xét học sinh"
          style="width: 97%"
          v-model="getByIdpoint.Comment"
        />
      </label>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_POINT" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
  </div>
</template>
      
      <script>
import { ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "FPoint",
  setup() {
    const isOpenclassroom = ref(false);
    const isOpenstudent = ref(false);
    const isOpenSchoolyear = ref(false);
    const isOpenssubject = ref(false);
    const isOpensteachersemester = ref(false);
    const isOpenclassroomUpdate = ref(false);
    const isOpenstudentUpdate = ref(false);
    const isOpenSchoolyearUpdate = ref(false);
    const isOpenssubjectUpdate = ref(false);
    const isOpensteachersemesterUpdate = ref(false);
    const selectedOptionclassroom = ref("");
    const selectedOptionsemester = ref("");
    const selectedOptionsubject = ref("");
    const selectedOptionSchoolyear = ref("");
    const selectedOptionstudent = ref("");
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = ref({
      PointCode: "",
      StudentId: "",
      SubjectId: "",
      SemesterId: "",
      SchoolYearId: "",
      ĐĐGTX1: 0,
      ĐĐGTX2: 0,
      ĐĐGTX3: 0,
      ĐĐGTX4: 0,
      ĐĐGGK: 0,
      ĐĐGCK: 0,
      ĐTBMK: 0,
      Comment: "",
    });
    const updateĐĐGTX = ref(0);

    // const calculateResult = () => {
    //   // Lấy giá trị từ formData
    //   const { ĐĐGTX1, ĐĐGTX2, ĐĐGTX3, ĐĐGTX4, ĐĐGGK, ĐĐGCK } = formData.value;

    //   // Tính toán ĐTBMKI
    //   const updateĐĐGTX =
    //     parseFloat(ĐĐGTX1) +
    //     parseFloat(ĐĐGTX2) +
    //     parseFloat(ĐĐGTX3) +
    //     parseFloat(ĐĐGTX4);

    //   // Tính điểm trung bình môn học theo học kỳ
    //   const ĐTBMKI = ((updateĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);

    //   // Gán giá trị vào formData
    //   formData.value.ĐTBMKI = ĐTBMKI;
    // };
    // const calculateResultII = () => {
    //   // Lấy giá trị từ formData
    //   const { ĐĐGTX1, ĐĐGTX2, ĐĐGTX3, ĐĐGTX4, ĐĐGGK, ĐĐGCK } = formData.value;

    //   // Tính toán ĐTBMKI
    //   const updateĐĐGTX =
    //     parseFloat(ĐĐGTX1) +
    //     parseFloat(ĐĐGTX2) +
    //     parseFloat(ĐĐGTX3) +
    //     parseFloat(ĐĐGTX4);

    //   // Tính điểm trung bình môn học theo học kỳ
    //   const ĐTBMKII = ((updateĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);

    //   // Gán giá trị vào formData
    //   formData.value.ĐTBMKII = ĐTBMKII;
    // };
    // const calculateResult = () => {
    //   // Lấy giá trị từ formData
    //   const { ĐĐGTX1, ĐĐGTX2, ĐĐGTX3, ĐĐGTX4, ĐĐGGK, ĐĐGCK } = formData.value;

    //   // Tính toán tổng điểm của các môn học
    //   const totalĐĐGTX =
    //     parseFloat(ĐĐGTX1) +
    //     parseFloat(ĐĐGTX2) +
    //     parseFloat(ĐĐGTX3) +
    //     parseFloat(ĐĐGTX4);

    //   // Khai báo biến để lưu điểm trung bình môn học
    //   let ĐTBMK;

    //   // Kiểm tra giá trị của selectedOptionsemester
    //   if (this.selectedOptionsemester === "Học kì 1" || this.getByIdpoint.SemesterName === "Học kì 1") {
    //     // Tính điểm trung bình môn học theo học kỳ 1
    //     ĐTBMK = ((totalĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);

    //     // Gán giá trị vào formData cho ĐTBMKI
    //     formData.value.ĐTBMKI = ĐTBMK;
    //   } else {
    //     // Tính điểm trung bình môn học theo học kỳ 2 (hoặc ngược lại)
    //     ĐTBMK = ((totalĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);

    //     // Gán giá trị vào formData cho ĐTBMKII (hoặc ngược lại)
    //     formData.value.ĐTBMKII = ĐTBMK;
    //   }
    // };

    const toast = () => {
      createToast(
        {
          title: "Điểm",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 3000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Điểm",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 3000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      formData,
      checkForm,
      error,
      build,
      isOpenclassroom,
      isOpenstudent,
      isOpenssubject,
      isOpensteachersemester,
      isOpenSchoolyear,
      isOpenclassroomUpdate,
      isOpenstudentUpdate,
      isOpenssubjectUpdate,
      isOpensteachersemesterUpdate,
      isOpenSchoolyearUpdate,
      selectedOptionsubject,
      selectedOptionsemester,
      selectedOptionstudent,
      selectedOptionclassroom,
      selectedOptionSchoolyear,
      toast,
      toastUpdate,
      updateĐĐGTX,
    };
  },
  computed: {
    filteredSemester() {
      const keyword = this.selectedOptionsemester.toLowerCase();
      return this.semester.filter(
        (data) =>
          data.SemesterName.toLowerCase().includes(keyword) &&
          data.SemesterName !== "Cả năm"
      );
    },

    filteredSubject() {
      const keyword = this.selectedOptionsubject.toLowerCase();
      return this.subject.filter((data) =>
        data.SubjectName.toLowerCase().includes(keyword)
      );
    },
    filteredClassroom() {
      if (this.selectedOptionclassroom) {
        const keyword = this.selectedOptionclassroom.toLowerCase();
        return this.classroom.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroom;
      }
    },
    filteredStudent() {
      if (this.selectedOptionstudent) {
        const teacherKeyword = this.selectedOptionstudent.toLowerCase();
        return this.studentAll.filter((data) =>
          data.StudentName.toLowerCase().includes(teacherKeyword)
        );
      } else if (this.selectedOptionclassroom) {
        const subjectKeyword = this.selectedOptionclassroom.toLowerCase();
        return this.studentAll.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(subjectKeyword)
        );
      } else {
        // Trả về toàn bộ danh sách sinh viên nếu cả hai selectedOptionteacher và selectedOptionsubject đều là null
        return this.studentAll;
      }
    },
    filteredSchoolyear() {
      const keyword = this.selectedOptionSchoolyear.toLowerCase();
      return this.schoolyear.filter((data) =>
        data.SchoolYearName.toLowerCase().includes(keyword)
      );
    },
    ...mapGetters([
      "point",
      "subject",
      "studentAll",
      "classroom",
      "isshowpoint",
      "semester",
      "schoolyear",
      "pointmaxcode",
      "getByIdpoint",
      "formModepoint",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        PointCode: this.pointmaxcode,
      });
    },
    PointList() {
      return this.point
        .filter((item) => item.PointId !== this.getByIdpoint.PointId)
        .map((employee) => {
          return employee.PointCode;
        });
    },
  },
  methods: {
    calculateResultUpdate() {
      // Lấy giá trị từ getByIdpoint
      const { ĐĐGTX1, ĐĐGTX2, ĐĐGTX3, ĐĐGTX4, ĐĐGGK, ĐĐGCK } =
        this.getByIdpoint;

      // Tính toán tổng điểm của các môn học
      const totalĐĐGTX =
        parseFloat(ĐĐGTX1) +
        parseFloat(ĐĐGTX2) +
        parseFloat(ĐĐGTX3) +
        parseFloat(ĐĐGTX4);

      // Khai báo biến để lưu điểm trung bình môn học
      let ĐTBMK;
      // Tính điểm trung bình môn học theo học kỳ 1
      ĐTBMK = ((totalĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);

      // Gán giá trị vào formData cho ĐTBMKI
      this.getByIdpoint.ĐTBMK = ĐTBMK;
    },
    calculateResult() {
      // Lấy giá trị từ formData
      const { ĐĐGTX1, ĐĐGTX2, ĐĐGTX3, ĐĐGTX4, ĐĐGGK, ĐĐGCK } = this.formData;

      // Tính toán tổng điểm của các môn học
      const totalĐĐGTX =
        parseFloat(ĐĐGTX1) +
        parseFloat(ĐĐGTX2) +
        parseFloat(ĐĐGTX3) +
        parseFloat(ĐĐGTX4);

      // Khai báo biến để lưu điểm trung bình môn học
      let ĐTBMK;
      ĐTBMK = ((totalĐĐGTX + 2 * ĐĐGGK + 3 * ĐĐGCK) / 9).toFixed(2);
      // Gán giá trị vào formData cho ĐTBMKI
      this.formData.ĐTBMK = ĐTBMK;
    },
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    toggleDropdownsubject() {
      this.isOpenssubject = !this.isOpenssubject;
    },
    toggleDropdownsemester() {
      this.isOpensteachersemester = !this.isOpensteachersemester;
    },
    toggleDropdownschoolyear() {
      this.isOpenSchoolyear = !this.isOpenSchoolyear;
    },
    toggleDropdownsstudent() {
      this.isOpenstudent = !this.isOpenstudent;
    },
    toggleDropdownclassroomUpdate() {
      this.isOpenclassroomUpdate = !this.isOpenclassroomUpdate;
    },
    toggleDropdownsubjectUpdate() {
      this.isOpenssubjectUpdate = !this.isOpenssubjectUpdate;
    },
    toggleDropdownsemesterUpdate() {
      this.isOpensteachersemesterUpdate = !this.isOpensteachersemesterUpdate;
    },
    toggleDropdownschoolyearUpdate() {
      this.isOpenSchoolyearUpdate = !this.isOpenSchoolyearUpdate;
    },
    toggleDropdownsstudentUpdate() {
      this.isOpenstudentUpdate = !this.isOpenstudentUpdate;
    },
    selectOptionclassroom(options) {
      try {
        this.selectedOptionclassroom = options;
        this.isOpenclassroom = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionclassroomUpdate(id, option) {
      try {
        this.getByIdpoint.ClassRoomId = id;
        this.getByIdpoint.ClassRoomName = option;
        this.isOpenclassroomUpdate;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionsubject(id, options) {
      try {
        this.formData.SubjectId = id;
        this.selectedOptionsubject = options;
        this.isOpenssubject = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionsubjectUpdate(id, option) {
      try {
        this.getByIdpoint.SubjectId = id;
        this.getByIdpoint.SubjectName = option;
        this.isOpenssubjectUpdate;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionsemester(id, options) {
      try {
        this.formData.SemesterId = id;
        this.selectedOptionsemester = options;
        this.isOpensteachersemester = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionsemesterUpdate(id, options) {
      try {
        this.getByIdpoint.SemesterId = id;
        this.getByIdpoint.SemesterName = options;
        this.isOpensteachersemesterUpdate = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionschoolyear(id, options) {
      try {
        this.formData.SchoolYearId = id;
        this.selectedOptionSchoolyear = options;
        this.isOpenSchoolyear = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionschoolyearUpdate(id, option) {
      try {
        this.getByIdpoint.SchoolYearId = id;
        this.getByIdpoint.SchoolYearName = option;
        this.isOpenSchoolyearUpdate;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionstudent(id, options) {
      try {
        this.formData.StudentId = id;
        this.selectedOptionstudent = options;
        this.isOpenstudent = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectOptionstudentUpdate(id, option) {
      try {
        this.getByIdpoint.StudentId = id;
        this.getByIdpoint.StudentName = option;
        this.isOpenstudentUpdate;
      } catch (error) {
        console.log(error);
      }
    },
    checkCodePoint(code) {
      try {
        if (this.PointList.includes(code)) {
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
          case this.point.findIndex(
            (ele) => ele.PointCode === this.formData.PointCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã điểm nhập bị trùng");
            break;
          case this.formData.PointCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã điểm");
            break;
          case this.selectedOptionSchoolyear === "":
            isValid = false;
            this.error.push("Vui lòng chọn năm học");
            break;
          case this.selectedOptionsemester === "":
            isValid = false;
            this.error.push("Vui lòng chọn học kỳ");
            break;
          case this.selectedOptionsubject === "":
            isValid = false;
            this.error.push("Vui lòng chọn môn học");
            break;
          case this.selectedOptionstudent === "":
            isValid = false;
            this.error.push("Vui lòng chọn học sinh");
            break;
          case this.formData.ĐĐGTX1 == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGTX1");
            break;
          case this.formData.ĐĐGTX2 == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGTX2");
            break;
          case this.formData.ĐĐGTX3 == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGTX3");
            break;
          case this.formData.ĐĐGTX4 == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGTX4");
            break;
          case this.formData.ĐĐGGK == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGGK");
            break;
          case this.formData.ĐĐGCK == 0:
            isValid = false;
            this.error.push("Vui lòng nhập ĐĐGCK");
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
          case this.checkCodePoint(this.getByIdpoint.PointCode):
            isValid = false;
            this.error.push("Mã học sinh bị trùng");
            break;
          case this.getByIdpoint.PointCode.trim() === "":
            isValid = false;
            this.error.push("Mã điểm không được để trống");
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
          this.addpoint({
            PointId: uuidv4(),
            PointCode: this.formData.PointCode,
            StudentId: this.formData.StudentId,
            SubjectId: this.formData.SubjectId,
            SemesterId: this.formData.SemesterId,
            SchoolYearId: this.formData.SchoolYearId,
            ĐĐGTX1: this.formData.ĐĐGTX1,
            ĐĐGTX2: this.formData.ĐĐGTX2,
            ĐĐGTX3: this.formData.ĐĐGTX3,
            ĐĐGTX4: this.formData.ĐĐGTX4,
            ĐĐGGK: this.formData.ĐĐGGK,
            ĐĐGCK: this.formData.ĐĐGCK,
            ĐTBMK: this.formData.ĐTBMK,
            Comment: this.formData.Comment,
            isChecked: false,
          });
          // reset formData
          this.formData = { PointCode: this.pointmaxcode };
          this.selectedOptionSchoolyear = "";
          this.selectedOptionsemester = "";
          this.selectedOptionstudent = "";
          this.selectedOptionsubject = "";
          this.selectedOptionSchoolyear = "";
          this.selectedOptionclassroom = "";
          this.SHOW_FORM_POINT();
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
          this.getByIdpoint.IsChecked = false;
          this.updateItempoint(this.getByIdpoint);
          this.SHOW_FORM_POINT();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getsubject",
      "getClassRoom",
      "getsemester",
      "getschoolyear",
      "getStudentAll",
      "addpoint",
      "updateItempoint",
      "getMaxCodepoint",
    ]),
    ...mapMutations(["SHOW_FORM_POINT"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getsubject();
    this.getsemester();
    this.getClassRoom();
    this.getschoolyear();
    this.getStudentAll();
    this.getMaxCodepoint();
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
.point_form {
  height: 62%;
  width: 58%;
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
  width: 50%;
}
.point_review {
  display: flex;
  align-items: center;
  height: 200px;
  flex-wrap: wrap;
  width: 50%;
  margin-bottom: 20px;
}
.point_wrapper {
  display: flex;
  flex-direction: row-reverse;
}
</style>
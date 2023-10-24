<template>
  <div class="form_container" v-if="isshowteacher">
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
      class="teacher_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModeteacher === true"
    >
      <div class="info_title" style="margin-bottom: 0px">
        <div class="title_left">
          <h1>Thêm mới giáo viên</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TEACHER"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="mã giáo viên"
            v-model="formData.TeacherCode"
          />
        </label>
        <label class="slabel"
          >Tên giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="tên giáo viên"
            v-model="formData.TeacherName"
          />
        </label>
        <label class="slabel"
          >Ngày sinh
          <input
            type="date"
            class="sinput"
            style="width: 315px"
            v-model="formData.DateOfBirth"
          />
        </label>
        <label class="slabel"
          >Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="email..."
            v-model="formData.Email"
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="nam"
                v-model="formData.Gender"
                @click="formData.Gender = 1"
              />
              <label for="nam" @click="formData.Gender = 1">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="women"
                v-model="formData.Gender"
                @click="formData.Gender = 0"
              />
              <label for="women" @click="formData.Gender = 0">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="khac"
                v-model="formData.Gender"
                @click="formData.Gender = 2"
              />
              <label for="khac" @click="formData.Gender = 2">Khác</label>
            </div>
          </div>
        </div>
        <label
          class="slabel"
          @click="toggleDropdowns"
          style="margin-left: 95px"
        >
          Thông tin chuyên môn
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="selectedOptions"
              placeholder="Chọn môn học"
            />
            <i
              @click="toggleDropdowns"
              :class="
                isOpens ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpens" style="width: 315px">
              <ul ref="list">
                <li
                  v-for="data in subjectteacher"
                  :key="data.SubjectId"
                  @click="selectOptions(data.SubjectId, data.SubjectName)"
                >
                  {{ data.SubjectName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsDuty">
          Loại giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="selectedOptionsDuty"
              placeholder="Chọn loại giáo viên"
            />
            <i
              @click="toggleDropdownsDuty"
              :class="
                isOpensDuty ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpensDuty" style="width: 315px">
              <ul ref="list">
                <li
                  v-for="data in DutyList"
                  :key="data.id"
                  @click="selectOptionsDuty(data.DutyName)"
                >
                  {{ data.DutyName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsCollaborate">
          Tình trạng công tác
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="selectedOptionsCollaborate"
              placeholder="Chọn thông tin công tác"
            />
            <i
              @click="toggleDropdownsCollaborate"
              :class="
                isOpensCollaborate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensCollaborate"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in Collaborate"
                  :key="data.id"
                  @click="selectOptionsCollaborate(data.CollaborateName)"
                >
                  {{ data.CollaborateName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsStandard">
          Trình độ giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="selectedOptionsStandard"
              placeholder="Chọn bằng cấp"
            />
            <i
              @click="toggleDropdownsStandard"
              :class="
                isOpensStandard
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensStandard"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in Standard"
                  :key="data.id"
                  @click="selectOptionsStandard(data.StandardName)"
                >
                  {{ data.StandardName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" style="width: 100%"
          >Địa chỉ giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 100%"
            placeholder="địa chỉ giáo viên"
            v-model="formData.Address"
          />
        </label>
      </div>
      <div class="info_btn" style="margin-bottom: 20px">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TEACHER" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu"  @click="build = true"/>
          <VButton type="submit" class="ml-8" text="Cất và thêm"  @click="build = false"/>
        </div>
      </div>
    </form>
    <form
      class="teacher_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModeteacher === false"
    >
      <div class="info_title" style="margin-bottom: 0px">
        <div class="title_left">
          <h1>Cập nhật giáo viên</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TEACHER"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="mã giáo viên"
            v-model="getByIdteacher.TeacherCode"
          />
        </label>
        <label class="slabel"
          >Tên giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="tên giáo viên"
            v-model="getByIdteacher.TeacherName"
          />
        </label>
        <label class="slabel"
          >Ngày sinh
          <input
            type="date"
            class="sinput"
            style="width: 315px"
            v-model="formattedDateOfBirth"
          />
        </label>
        <label class="slabel"
          >Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="email..."
            v-model="getByIdteacher.Email"
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="nam"
                @click="getByIdteacher.Gender = 1"
                :checked="getByIdteacher.Gender == 1"
              />
              <label for="nam" @click="getByIdteacher.Gender = 1">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="women"
                @click="getByIdteacher.Gender = 0"
                :checked="getByIdteacher.Gender == 0"
              />
              <label for="women" @click="getByIdteacher.Gender = 0">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="khac"
                @click="getByIdteacher.Gender = 2"
                :checked="getByIdteacher.Gender == 2"
              />
              <label for="khac" @click="getByIdteacher.Gender = 2">Khác</label>
            </div>
          </div>
        </div>
        <label
          class="slabel"
          @click="toggleDropdownsUpdate"
          style="margin-left: 95px"
        >
          Thông tin chuyên môn
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="getByIdteacher.SubjectName"
              placeholder="Chọn môn học"
            />
            <i
              @click="toggleDropdownsUpdate"
              :class="
                isOpensUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensUpdate"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in subjectteacher"
                  :key="data.SubjectId"
                  @click="selectOptionsUpdate(data.SubjectId, data.SubjectName)"
                >
                  {{ data.SubjectName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsDutyUpdate">
          Loại giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="getByIdteacher.Duty"
              placeholder="Chọn loại giáo viên"
            />
            <i
              @click="toggleDropdownsDutyUpdate"
              :class="
                isOpensDutyUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensDutyUpdate"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in DutyList"
                  :key="data.id"
                  @click="selectOptionsDutyUpdate(data.DutyName)"
                >
                  {{ data.DutyName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsCollaborateUpdate">
          Tình trạng công tác
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="getByIdteacher.Collaborate"
              placeholder="Chọn thông tin công tác"
            />
            <i
              @click="toggleDropdownsCollaborateUpdate"
              :class="
                isOpensCollaborateUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensCollaborateUpdate"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in Collaborate"
                  :key="data.id"
                  @click="selectOptionsCollaborateUpdate(data.CollaborateName)"
                >
                  {{ data.CollaborateName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownsStandardUpdate">
          Trình độ giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 315px">
            <input
              type="text"
              v-model="getByIdteacher.Standard"
              placeholder="Chọn bằng cấp"
            />
            <i
              @click="toggleDropdownsStandardUpdate"
              :class="
                isOpensStandardUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpensStandardUpdate"
              style="width: 315px"
            >
              <ul ref="list">
                <li
                  v-for="data in Standard"
                  :key="data.id"
                  @click="selectOptionsStandardUpdate(data.StandardName)"
                >
                  {{ data.StandardName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" style="width: 100%"
          >Địa chỉ giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 100%"
            placeholder="địa chỉ giáo viên"
            v-model="getByIdteacher.Address"
          />
        </label>
      </div>
      <div class="info_btn" style="margin-bottom: 20px">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TEACHER" />
        <div class="btn_wp">
          <VButton text="Cập nhật" type="submit"/>
        </div>
      </div>
    </form>
  </div>
</template>
      
      <script>
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { createToast } from "mosha-vue-toastify";
import VButton from "../Button/VButton.vue";
import VRadio from "../Input/VRadio.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "FClassroom",
  setup() {
    const isOpens = ref(false);
    const isOpensStandard = ref(false);
    const isOpensCollaborate = ref(false);
    const isOpensUpdate = ref(false);
    const isOpensStandardUpdate = ref(false);
    const isOpensClassroomIdUpdate = ref(false);
    const isOpensCollaborateUpdate = ref(false);
    const isOpensDuty = ref(false);
    const isOpensDutyUpdate = ref(false);
    const selectedOptions = ref("");
    const selectedOptionsDuty = ref("");
    const selectedOptionsStandard = ref("");
    const selectedOptionsCollaborate = ref("");
    const Collaborate = reactive([
      { id: 1, CollaborateName: "Hợp đồng" },
      { id: 2, CollaborateName: "Biên chế" },
    ]);
    const Standard = reactive([
      { id: 1, StandardName: "Đại học" },
      { id: 2, StandardName: "Cao đẳng" },
    ]);
    const DutyList = reactive([
      { id: 1, DutyName: "Giáo viên chủ nhiệm" },
      { id: 2, DutyName: "Giáo viên bộ môn" },
    ]);
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = reactive({
      TeacherCode: "",
      TeacherName: "",
      DateOfBirth: new Date(),
      Email: "",
      Gender: "",
      SubjectId: "",
      Address: "",
      Collaborate: "",
      Standard: "",
      Teaching: "",
      Duty: "",
    });
    const toast = () => {
      createToast(
        {
          title: "Giáo viên",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 5000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Giáo viên",
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
    return {
      toast,
      toastUpdate,
      checkForm,
      error,
      build,
      formData,
      Collaborate,
      Standard,
      isOpens,
      isOpensCollaborate,
      isOpensStandard,
      isOpensUpdate,
      isOpensClassroomIdUpdate,
      isOpensCollaborateUpdate,
      isOpensStandardUpdate,
      selectedOptions,
      selectedOptionsCollaborate,
      selectedOptionsStandard,
      selectedOptionsDuty,
      DutyList,
      isOpensDuty,
      isOpensDutyUpdate,
    };
  },
  computed: {
    ...mapGetters([
      "subjectteacher",
      "classroomteacher",
      "isshowteacher",
      "teachermaxcode",
      "teacher",
      "formModeteacher",
      "getByIdteacher",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        TeacherCode: this.teachermaxcode,
      });
    },
    TeacherList() {
      return this.teacher
        .filter((item) => item.TeacherId !== this.getByIdteacher.TeacherId)
        .map((employee) => {
          return employee.TeacherCode;
        });
    },
    formattedDateOfBirth: {
      get() {
        // Chuyển đổi từ ISO 8601 sang "yyyy-MM-dd"
        const isoDate = new Date(this.getByIdteacher.DateOfBirth);
        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        // Khi người dùng thay đổi giá trị trong input, chuyển đổi lại định dạng
        this.getByIdteacher.DateOfBirth = value;
      },
    },
  },
  methods: {
    toggleDropdowns() {
      this.isOpens = !this.isOpens;
    },
    toggleDropdownsUpdate() {
      this.isOpensUpdate = !this.isOpensUpdate;
    },
    toggleDropdownsDuty() {
      this.isOpensDuty = !this.isOpensDuty;
    },
    toggleDropdownsDutyUpdate() {
      this.isOpensDutyUpdate = !this.isOpensDutyUpdate;
    },
    toggleDropdownsStandard() {
      this.isOpensStandard = !this.isOpensStandard;
    },
    toggleDropdownsStandardUpdate() {
      this.isOpensStandardUpdate = !this.isOpensStandardUpdate;
    },
    toggleDropdownsCollaborate() {
      this.isOpensCollaborate = !this.isOpensCollaborate;
    },
    toggleDropdownsCollaborateUpdate() {
      this.isOpensCollaborateUpdate = !this.isOpensCollaborateUpdate;
    },
    selectOptions(id, options) {
      this.formData.SubjectId = id;
      this.selectedOptions = options;
      this.isOpens = false;
    },
    selectOptionsUpdate(id, options) {
      this.getByIdteacher.SubjectId = id;
      this.getByIdteacher.SubjectName = options;
      this.isOpensUpdate = false;
    },
    selectOptionsDuty(options) {
      this.formData.Duty = options;
      this.selectedOptionsDuty = options;
      this.isOpensDuty = false;
    },
    selectOptionsDutyUpdate(options) {
      this.getByIdteacher.Duty = options;
      this.isOpensDutyUpdate = false;
    },
    selectOptionsStandard(options) {
      this.formData.Standard = options;
      this.selectedOptionsStandard = options;
      this.isOpensStandard = false;
    },
    selectOptionsStandardUpdate(options) {
      this.getByIdteacher.Standard = options;
      this.isOpensStandardUpdate = false;
    },
    selectOptionsCollaborate(options) {
      this.formData.Collaborate = options;
      this.selectedOptionsCollaborate = options;
      this.isOpensCollaborate = false;
    },
    selectOptionsCollaborateUpdate(options) {
      this.getByIdteacher.Collaborate = options;
      this.isOpensCollaborateUpdate = false;
    },
    ...mapActions([
      "getsubjectteacher",
      "getclassroomteacher",
      "addteacher",
      "updateItemteacher",
      "getMaxCodeteacher",
      "getByIdteacher",
    ]),
    ...mapMutations(["SHOW_FORM_TEACHER"]),
    checkCodeteacher(code) {
      try {
        if (this.TeacherList.includes(code)) {
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
          case this.teacher.findIndex(
            (ele) => ele.TeacherCode === this.formData.TeacherCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã giáo viên nhập bị trùng");
            break;
          case this.formData.TeacherCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã giáo viên");
            break;
          case this.formData.TeacherName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên giáo viên");
            break;
          case this.selectedOptions === "":
            isValid = false;
            this.error.push("Vui lòng chọn bộ môn");
            break;
          case this.selectedOptionsCollaborate === "":
            isValid = false;
            this.error.push("Vui lòng chọn tình trạng");
            break;
          case this.selectedOptionsStandard === "":
            isValid = false;
            this.error.push("Vui lòng chọn trình độ");
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
          case this.checkCodeteacher(this.getByIdteacher.TeacherCode):
            isValid = false;
            this.error.push("Mã giáo viên bị trùng");
            break;
          case this.getByIdteacher.TeacherCode.trim() === "":
            isValid = false;
            this.error.push("Mã giáo viên không được để trống");
            break;
          case this.getByIdteacher.TeacherName.trim() === "":
            isValid = false;
            this.error.push("Tên giáo viên không được để trống");
            break;
          case this.getByIdteacher.TeacherName.length < 5:
            isValid = false;
            this.error.push("Tên giáo viên phải lớn hơn 5 kí tự");
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
          this.addteacher({
            TeacherId: uuidv4(),
            TeacherName: this.formData.TeacherName,
            TeacherCode: this.formData.TeacherCode,
            DateOfBirth: this.formData.DateOfBirth,
            Email: this.formData.Email,
            Gender: this.formData.Gender,
            Address: this.formData.Address,
            SubjectId: this.formData.SubjectId,
            Standard: this.formData.Standard,
            Collaborate: this.formData.Collaborate,
            Teaching: this.formData.Teaching,
            Duty: this.formData.Duty,
            isChecked: false,
          });
          // reset formData
          this.formData = { TeacherCode: this.teachermaxcode };
          this.selectedOptions = null;
          this.selectedOptionsClassroomId = null;
          this.toast();
          this.selectedOptionsCollaborate = null;
          this.selectedOptionsStandard = null;
          if(this.build === true){
            this.SHOW_FORM_TEACHER();
            this.formData = { TeacherCode: this.teachermaxcode };
          }
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
          this.getByIdteacher.IsChecked = false;
          this.updateItemteacher(this.getByIdteacher);
          this.SHOW_FORM_TEACHER();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getsubjectteacher();
    this.getclassroomteacher();
    this.getMaxCodeteacher();
  },
  components: {
    VButton,
    VRadio,
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
.teacher_form {
  height: 61%;
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
/**radio button */

.sex_wrapper {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sex_wrapper p {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
.sex_input {
  display: flex;
  align-items: center;
}
.sex_item {
  display: flex;
  align-items: center;
  margin-right: 30px;
  height: 36px;
}
</style>
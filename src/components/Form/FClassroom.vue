<template>
  <div class="form_container" v-if="isshowclassroom">
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
      class="classroom_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModeclassroom === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới lớp học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_CLASSROOM"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã lớp học
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="formData.ClassRoomCode"
          />
        </label>
        <label class="slabel"
          >Tên lớp học
          <input
            type="text"
            class="sinput"
            placeholder="tên lớp học"
            v-model="formData.ClassRoomName"
          />
        </label>
        <label class="slabel" @click="toggleDropdown">
          Khối lớp
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOption"
              placeholder="Chọn giá trị lọc"
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
                  v-for="data in gradeclassroom"
                  :key="data.GradeId"
                  @click="selectOption(data.GradeId, data.GradeName)"
                >
                  {{ data.GradeName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_CLASSROOM" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="classroom_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModeclassroom === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật lớp học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_CLASSROOM"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã lớp học
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="getByIdClassroom.ClassRoomCode"
          />
        </label>
        <label class="slabel"
          >Tên lớp học
          <input
            type="text"
            class="sinput"
            placeholder="tên lớp học"
            v-model="getByIdClassroom.ClassRoomName"
          />
        </label>
        <label class="slabel" @click="toggleDropdownUpdate">
          Khối lớp
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdClassroom.GradeName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownUpdate"
              :class="
                isOpenUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenUpdate">
              <ul ref="list">
                <li
                  v-for="data in gradeclassroom"
                  :key="data.GradeId"
                  @click="selectOptionUpdate(data.GradeId, data.GradeName)"
                >
                  {{ data.GradeName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_CLASSROOM" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { v4 as uuidv4 } from "uuid";
import { reactive, ref } from "vue";
export default {
  name: "FClassroom",
  setup() {
    const formData = reactive({
      ClassRoomCode: "",
      ClassRoomName: "",
      GradeId: "",
    });
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const isOpen = ref(false);
    const isOpenUpdate = ref(false);
    const selectedOption = ref(null);
    return {
      isOpen,
      isOpenUpdate,
      selectedOption,
      formData,
      checkForm,
      error,
      build,
    };
  },
  computed: {
    ...mapGetters([
      "gradeclassroom",
      "isshowclassroom",
      "classroommaxcode",
      "formModeclassroom",
      "getByIdClassroom",
      "classroom",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        ClassRoomCode: this.classroommaxcode,
      });
    },
    ClassRoomList() {
      return this.classroom
        .filter(
          (item) => item.ClassRoomId !== this.getByIdClassroom.ClassRoomId
        )
        .map((employee) => {
          return employee.ClassRoomCode;
        });
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.formData.GradeId = id;
      this.selectedOption = options;
      this.isOpen = false;
    },
    toggleDropdownUpdate() {
      this.isOpenUpdate = !this.isOpenUpdate;
    },
    selectOptionUpdate(id, options) {
      this.getByIdClassroom.GradeId = id;
      this.getByIdClassroom.GradeName = options;
      this.isOpenUpdate = false;
    },
    checkCodeClassRoom(code) {
      try {
        if (this.ClassRoomList.includes(code)) {
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
          case this.classroom.findIndex(
            (ele) => ele.ClassRoomCode === this.formData.ClassRoomCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã lớp học nhập bị trùng");
            break;
          case this.formData.ClassRoomCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã lớp học");
            break;
          case this.formData.ClassRoomName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên lớp học");
            break;
          case this.formData.ClassRoomName.length < 5:
            isValid = false;
            this.error.push("Tên lớp học phải lớn hơn 5 kí tự");
            break;
          case this.selectedOption == null:
            isValid = false;
            this.error.push("Vui lòng chọn khối lớp");
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
          case this.checkCodeClassRoom(this.getByIdClassroom.ClassRoomCode):
            isValid = false;
            this.error.push("Mã lớp học bị trùng");
            break;
          case this.getByIdClassroom.ClassRoomCode.trim() === "":
            isValid = false;
            this.error.push("Mã lớp học không được để trống");
            break;
          case this.getByIdClassroom.ClassRoomName.trim() === "":
            isValid = false;
            this.error.push("Tên lớp học không được để trống");
            break;
          case this.getByIdClassroom.ClassRoomName.length < 5:
            isValid = false;
            this.error.push("Tên lớp học phải lớn hơn 5 kí tự");
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
          this.addSclassromm({
            ClassRoomId: uuidv4(),
            ClassRoomCode: this.formData.ClassRoomCode,
            ClassRoomName: this.formData.ClassRoomName,
            GradeId: this.formData.GradeId,
            isChecked: false,
          });
          // reset formData
          this.formData = { ClassRoomCode: this.classroommaxcode };
          this.selectedOption = null;
          this.SHOW_FORM_CLASSROOM();
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
          this.getByIdClassroom.IsChecked = false;
          this.updateItemclassroom(this.getByIdClassroom);
          this.SHOW_FORM_CLASSROOM();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getMaxCodeclassroom",
      "updateItemclassroom",
      "addSclassromm",
      "getGradeclassroom",
    ]),
    ...mapMutations(["SHOW_FORM_CLASSROOM"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getGradeclassroom();
    this.getMaxCodeclassroom();
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
.classroom_form {
  height: 30%;
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
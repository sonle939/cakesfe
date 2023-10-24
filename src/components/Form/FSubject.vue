<template>
  <div class="form_container" v-if="isshowsubject">
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
      class="subject_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModesubject === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới môn học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SUBJECT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã môn học
          <input
            type="text"
            class="sinput"
            placeholder="mã môn học"
            v-model="formData.SubjectCode"
          />
        </label>
        <label class="slabel"
          >Tên môn học
          <input
            type="text"
            class="sinput"
            placeholder="tên môn học"
            v-model="formData.SubjectName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SUBJECT" />
        <div class="btn_wp">
          <VButton text="Cất" @click="build = true" class="btn_phu" />
          <VButton
            type="submit"
            @click="build = false"
            class="ml-8"
            text="Cất và thêm"
          />
        </div>
      </div>
    </form>
    <form
      class="subject_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-else-if="formModesubject === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật môn học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SUBJECT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã môn học
          <input
            type="text"
            class="sinput"
            placeholder="mã môn học"
            v-model="getByIdsubject.SubjectCode"
          />
        </label>
        <label class="slabel"
          >Tên môn học
          <input
            type="text"
            class="sinput"
            placeholder="tên môn học"
            v-model="getByIdsubject.SubjectName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SUBJECT" />
        <div class="btn_wp">
          <VButton text="Cập nhật" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>
    
<script>
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { v4 as uuidv4 } from "uuid";
import { createToast } from "mosha-vue-toastify";
export default {
  name: "FSubject",
  setup() {
    const formData = reactive({
      SubjectCode: "",
      SubjectName: "",
    });
    const toast = () => {
      createToast(
        {
          title: "Môn học",
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
          title: "Môn học",
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
    return {
      isOpen: false,
      selectedOption: null,
      formData,
      checkForm,
      error,
      build,
      toast,
      toastUpdate,
    };
  },

  computed: {
    ...mapGetters([
      "isshowsubject",
      "subjectmaxCode",
      "formModesubject",
      "getByIdsubject",
      "subject",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        SubjectCode: this.subjectmaxCode,
      });
    },
    subjectList() {
      return this.subject
        .filter((item) => item.SubjectId !== this.getByIdsubject.SubjectId)
        .map((employee) => {
          return employee.SubjectCode;
        });
    },
  },
  methods: {
    checkCodeSubject(code) {
      try {
        if (this.subjectList.includes(code)) {
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
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    validateFormAdd() {
      try {
        let isValid = true;
        switch (true) {
          case this.subject.findIndex(
            (ele) => ele.SubjectCode === this.formData.SubjectCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã nhân viên nhập bị trùng");
            break;
          case this.formData.SubjectCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã môn học");
            break;
          case this.formData.SubjectName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên môn học");
            break;
          case this.formData.SubjectName.length < 5:
            isValid = false;
            this.error.push("Tên môn học phải lớn hơn 5 kí tự");
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
          case this.checkCodeSubject(this.getByIdsubject.SubjectCode):
            isValid = false;
            this.error.push("Mã lớp học bị trùng");
            break;
          case this.getByIdsubject.SubjectCode.trim() === "":
            isValid = false;
            this.error.push("Mã môn học không được để trống");
            break;
          // case this.checkCodeStaff(this.getById.EmployeeCode):
          //   isValid = false;
          //   this.error.push(enumrource.DIALOG_CONTROL.staffCodeForever);
          //   break;
          case this.getByIdsubject.SubjectName.trim() === "":
            isValid = false;
            this.error.push("Tên môn học không được để trống");
            break;
          case this.getByIdsubject.SubjectName.length < 5:
            isValid = false;
            this.error.push("Tên môn học phải lớn hơn 5 kí tự");
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
          this.addsubject({
            SubjectId: uuidv4(),
            SubjectCode: this.formData.SubjectCode,
            SubjectName: this.formData.SubjectName,
            isChecked: false,
          });
          // reset formData
          this.formData = { SubjectCode: this.subjectmaxCode };
          this.toast();
          if (this.build === true) {
            this.SHOW_FORM_SUBJECT();
            this.formData = { SubjectCode: this.subjectmaxCode };
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
          this.getByIdsubject.IsChecked = false;
          this.updateItemsubject(this.getByIdsubject);
          this.SHOW_FORM_SUBJECT();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["SHOW_FORM_SUBJECT"]),
    ...mapActions(["getMaxCodeSubject", "addsubject", "updateItemsubject"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getMaxCodeSubject();
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
.subject_form {
  height: 30%;
  width: 40%;
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
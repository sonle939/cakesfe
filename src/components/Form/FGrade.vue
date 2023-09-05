<template>
  <div class="form_container" v-if="isshowgrade">
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
      class="grade_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModegrade === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới học kỳ</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_GRADE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="mã học kỳ"
            v-model="formData.GradeCode"
          />
        </label>
        <label class="slabel"
          >Tên học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="tên học kì"
            v-model="formData.GradeName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_GRADE" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="grade_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-else-if="formModegrade === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật học kỳ</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_GRADE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="mã học kỳ"
            v-model="getByIdgrade.GradeCode"
          />
        </label>
        <label class="slabel"
          >Tên học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="tên học kì"
            v-model="getByIdgrade.GradeName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_GRADE" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
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
export default {
  name: "FGrade",
  setup() {
    const formData = reactive({
      GradeCode: "",
      GradeName: "",
    });
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
    };
  },
  computed: {
    ...mapGetters([
      "isshowgrade",
      "grademaxcode",
      "formModegrade",
      "getByIdgrade",
      "grade",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        GradeCode: this.grademaxcode,
      });
    },
    gradeList() {
      return this.grade
        .filter((item) => item.GradeId !== this.getByIdgrade.GradeId)
        .map((employee) => {
          return employee.GradeCode;
        });
    },
  },
  methods: {
    checkCodeGrade(code) {
      try {
        if (this.gradeList.includes(code)) {
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
          case this.grade.findIndex(
            (ele) => ele.GradeCode === this.formData.GradeCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã khối nhập bị trùng");
            break;
          case this.formData.GradeCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã khối");
            break;
          case this.formData.GradeName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên khối");
            break;
          case this.formData.GradeName.length < 5:
            isValid = false;
            this.error.push("Tên khối phải lớn hơn 5 kí tự");
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
          case this.checkCodeGrade(this.getByIdgrade.GradeCode):
            isValid = false;
            this.error.push("Mã khối bị trùng");
            break;
          case this.getByIdgrade.GradeCode.trim() === "":
            isValid = false;
            this.error.push("Mã khối không được để trống");
            break;
          case this.getByIdgrade.GradeName.trim() === "":
            isValid = false;
            this.error.push("Tên khối không được để trống");
            break;
          case this.getByIdgrade.GradeName.length < 5:
            isValid = false;
            this.error.push("Tên khối phải lớn hơn 5 kí tự");
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
          this.addGrade({
            GradeId: uuidv4(),
            GradeCode: this.formData.GradeCode,
            GradeName: this.formData.GradeName,
            isChecked: false,
          });
          // reset formData
          this.formData = { GradeCode: this.grademaxcode };
          this.SHOW_FORM_GRADE();
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
          this.getByIdgrade.IsChecked = false;
          this.updateItemgrade(this.getByIdgrade);
          this.SHOW_FORM_GRADE();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["SHOW_FORM_GRADE"]),
    ...mapActions(["getMaxCodeGrade", "addGrade", "updateItemgrade"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getMaxCodeGrade();
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
.grade_form {
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
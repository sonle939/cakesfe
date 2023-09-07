<template>
  <div class="form_container" v-if="isshowsemester">
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
      class="semester_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModesemester === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới học kỳ</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SEMESTER"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="mã học kỳ"
            v-model="formData.SemesterCode"
          />
        </label>
        <label class="slabel"
          >Tên học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="tên học kỳ"
            v-model="formData.SemesterName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SEMESTER" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="semester_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModesemester === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật học kỳ</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SEMESTER"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="mã học kỳ"
            v-model="getByIdsemester.SemesterCode"
          />
        </label>
        <label class="slabel"
          >Tên học kỳ
          <input
            type="text"
            class="sinput"
            placeholder="tên học kỳ"
            v-model="getByIdsemester.SemesterName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SEMESTER" />
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
import { createToast } from "mosha-vue-toastify";
import VButton from "../Button/VButton.vue";
import { v4 as uuidv4 } from "uuid";
import { reactive, ref } from "vue";
export default {
  name: "FSchoolyear",
  setup() {
    const formData = reactive({
      SemesterCode: "",
      SemesterName: "",
    });
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const toast = () => {
      createToast(
        {
          title: "Học kỳ",
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
          title: "Học kỳ",
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
      "isshowsemester",
      "semestermaxcode",
      "formModesemester",
      "getByIdsemester",
      "semester",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        SemesterCode: this.semestermaxcode,
      });
    },
    SemesterList() {
      return this.semester
        .filter((item) => item.SemesterId !== this.getByIdsemester.SemesterId)
        .map((employee) => {
          return employee.SemesterCode;
        });
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    checkCodeSemester(code) {
      try {
        if (this.SemesterList.includes(code)) {
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
          case this.semester.findIndex(
            (ele) => ele.SemesterCode === this.formData.SemesterCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã học kỳ nhập bị trùng");
            break;
          case this.formData.SemesterCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã học kỳ");
            break;
          case this.formData.SemesterName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên học kỳ");
            break;
          case this.formData.SemesterName.length < 5:
            isValid = false;
            this.error.push("Tên học kỳ phải lớn hơn 5 kí tự");
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
          case this.checkCodeSemester(this.getByIdsemester.SemesterCode):
            isValid = false;
            this.error.push("Mã học kỳ bị trùng");
            break;
          case this.getByIdsemester.SemesterCode.trim() === "":
            isValid = false;
            this.error.push("Mã học kỳ không được để trống");
            break;
          case this.getByIdsemester.SemesterName.trim() === "":
            isValid = false;
            this.error.push("Tên học kỳ không được để trống");
            break;
          case this.getByIdsemester.SemesterName.length < 5:
            isValid = false;
            this.error.push("Tên học kỳ phải lớn hơn 5 kí tự");
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
          this.addsemester({
            SemesterId: uuidv4(),
            SemesterCode: this.formData.SemesterCode,
            SemesterName: this.formData.SemesterName,
            isChecked: false,
          });
          // reset formData
          this.formData = { SemesterCode: this.semestermaxcode };
          this.SHOW_FORM_SEMESTER();
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
          this.getByIdsemester.IsChecked = false;
          this.updateItemsemester(this.getByIdsemester);
          this.SHOW_FORM_SEMESTER();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["SHOW_FORM_SEMESTER"]),
    ...mapActions(["getMaxCodesemester", "addsemester", "updateItemsemester"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getMaxCodesemester();
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
.semester_form {
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
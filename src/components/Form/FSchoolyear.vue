<template>
  <div class="form_container" v-if="isshowschoolyear">
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
      class="schoolyear_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModeschoolyear === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới năm học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SCHOOLYEAR"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã năm học
          <input
            type="text"
            class="sinput"
            placeholder="mã năm học"
            v-model="formData.SchoolYearCode"
          />
        </label>
        <label class="slabel"
          >Tên năm học
          <input
            type="text"
            class="sinput"
            placeholder="tên năm học"
            v-model="formData.SchoolYearName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SCHOOLYEAR" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="schoolyear_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-else-if="formModeschoolyear === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật năm học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SCHOOLYEAR"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã năm học
          <input
            type="text"
            class="sinput"
            placeholder="mã năm học"
            v-model="getByIdschoolyear.SchoolYearCode"
          />
        </label>
        <label class="slabel"
          >Tên năm học
          <input
            type="text"
            class="sinput"
            placeholder="tên năm học"
            v-model="getByIdschoolyear.SchoolYearName"
          />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SCHOOLYEAR" />
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
  name: "FSchoolyear",
  setup() {
    const formData = reactive({
      SchoolYearCode: "",
      SchoolYearName: "",
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
      "isshowschoolyear",
      "schoolyearmaxcode",
      "formModeschoolyear",
      "getByIdschoolyear",
      "schoolyear",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        SchoolYearCode: this.schoolyearmaxcode,
      });
    },
    SchoolYearList() {
      return this.schoolyear
        .filter(
          (item) => item.SchoolYearId !== this.getByIdschoolyear.SchoolYearId
        )
        .map((employee) => {
          return employee.SchoolYearCode;
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
    checkCodeSchoolYear(code) {
      try {
        if (this.SchoolYearList.includes(code)) {
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
          case this.schoolyear.findIndex(
            (ele) => ele.SchoolYearCode === this.formData.SchoolYearCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã năm học nhập bị trùng");
            break;
          case this.formData.SchoolYearCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã năm học");
            break;
          case this.formData.SchoolYearName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên năm học");
            break;
          case this.formData.SchoolYearName.length < 5:
            isValid = false;
            this.error.push("Tên năm học phải lớn hơn 5 kí tự");
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
          case this.checkCodeSchoolYear(this.getByIdschoolyear.SchoolYearCode):
            isValid = false;
            this.error.push("Mã năm học bị trùng");
            break;
          case this.getByIdschoolyear.SchoolYearCode.trim() === "":
            isValid = false;
            this.error.push("Mã năm học không được để trống");
            break;
          case this.getByIdschoolyear.SchoolYearName.trim() === "":
            isValid = false;
            this.error.push("Tên năm học không được để trống");
            break;
          case this.getByIdschoolyear.SchoolYearName.length < 5:
            isValid = false;
            this.error.push("Tên năm học phải lớn hơn 5 kí tự");
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
          this.addschoolyear({
            SchoolYearId: uuidv4(),
            SchoolYearCode: this.formData.SchoolYearCode,
            SchoolYearName: this.formData.SchoolYearName,
            isChecked: false,
          });
          // reset formData
          this.formData = { SchoolYearCode: this.schoolyearmaxcode };
          this.SHOW_FORM_SCHOOLYEAR();
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
          this.getByIdschoolyear.IsChecked = false;
          this.updateItemschoolyear(this.getByIdschoolyear);
          this.SHOW_FORM_SCHOOLYEAR();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["SHOW_FORM_SCHOOLYEAR"]),
    ...mapActions([
      "getMaxCodeschoolyear",
      "addschoolyear",
      "updateItemschoolyear",
    ]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getMaxCodeschoolyear();
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
.schoolyear_form {
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
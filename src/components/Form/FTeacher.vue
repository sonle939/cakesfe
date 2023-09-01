<template>
  <div class="form_container" v-if="isshowteacher">
    <form class="teacher_form">
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
          />
        </label>
        <label class="slabel"
          >Tên giáo viên
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="tên giáo viên"
          />
        </label>
        <label class="slabel"
          >Ngày sinh
          <input type="date" class="sinput" style="width: 315px" />
        </label>
        <label class="slabel"
          >Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="email..."
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio name="sex" class="mr-6" id="nam" />
              <label for="nam">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio name="sex" class="mr-6" id="women" />
              <label for="women">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio name="sex" class="mr-6" id="khac" />
              <label for="khac">Khác</label>
            </div>
          </div>
        </div>
        <label
          class="slabel"
          @click="toggleDropdowns"
          style="margin-left: 110px"
        >
          Thông tin chuyên môn
          <div class="dropdown" style="margin-top: 8px">
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
            <div class="overlaylist" v-show="isOpens">
              <ul ref="list">
                <li
                  v-for="data in subjectteacher"
                  :key="data.SubjectId"
                  @click="selectOptions(data.SubjectName)"
                >
                  {{ data.SubjectName }}
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
          />
        </label>
      </div>
      <div class="info_btn" style="margin-bottom: 20px">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TEACHER" />
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
import VRadio from "../Input/VRadio.vue";
export default {
  name: "FClassroom",
  data() {
    return {
      isOpens: false,
      selectedOptions: "",
    };
  },
  computed: {
    ...mapGetters(["subjectteacher", "isshowteacher"]),
  },
  methods: {
    toggleDropdowns() {
      this.isOpens = !this.isOpens;
    },
    selectOptions(options) {
      this.selectedOptions = options;
      this.isOpens = false;
    },
    ...mapActions(["getsubjectteacher"]),
    ...mapMutations(["SHOW_FORM_TEACHER"]),
  },
  mounted() {
    this.getsubjectteacher();
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
  height: 50%;
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
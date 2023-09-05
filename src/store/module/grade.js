import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const grademodule = {
    state: {
        grade: [],
        getByIdgrade: [],
        loadinggrade: false,
        checkAllgrade: false,
        isshowgrade: false,
        selectedItemsgrade: [],
        //dung de chuyen doi tu form them sang form sua
        formModegrade: true,
        grademaxcode: null,
    },
    getters: {
        getByIdgrade: state => state.getByIdgrade,
        isshowgrade: state => state.isshowgrade,
        formModegrade: state => state.formModegrade,
        grade: state => state.grade,
        grademaxcode: state => state.grademaxcode,
        loadinggrade: state => state.loadinggrade,
        checkAllgrade: state => state.checkAllgrade,
        isCheckedgrade: state => state.grade.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmountgrade: state => state.grade.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedgrade: state => state.grade.some((item) => item.isChecked == true),
        selectedItemsgrade: state => state.selectedItemsgrade,
    },
    actions: {
        async addGrade({ commit, dispatch }, newStaff) {
            try {

                const res = await axios.post(`${API_BASE_URL}Grades/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_GRADE', newStaff)
                dispatch("getGrade");
                dispatch('getMaxCodeGrade');
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletegrade({ commit, dispatch }, GradeId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Grades/${GradeId}`)
                commit('DELETE_GRADE', GradeId);
                dispatch('getGrade');
                dispatch('getMaxCodeGrade');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplegrade({ commit, dispatch }, GradeIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Grades`, { data: GradeIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_GRADE', GradeIds);
                    dispatch('getGrade');
                    dispatch('getMaxCodeGrade');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemgrade({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Grades/${updateChild.GradeId}`,
                        updateChild);
                commit('UPDATE_GRADE', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getGrade');
                dispatch('getMaxCodeGrade');
            } catch (error) {
                console.log(error);
            }
        },
        async getGrade({ commit }) {
            try {
                commit('SET_LOADING_GRADE')
                const res = await axios.get(`${API_BASE_URL}Grades`)
                commit('SET_GRADE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getMaxCodeGrade({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Grades/GradeCodeMax`)
                commit('SET_MAXCODE_GRADE', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        //TẠO 1 HÀM ĐỂ LẤY DỮ LIỆU THEO id
        /**
         * 
         * @param {CREATE BY: LXSON-MF1589
         * CREATE DATE: 17/04/2023} param0 
         * @param {*} object 
         */
        async getIDgrade({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Grades/${object.GradeId}`)
                commit('GETBYIDGRADE', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectiongrade({ commit }) {
            try {
                commit('SELECT_ALL_GRADE')
            } catch (error) {
                console.log(error);
            }

        },
        uncheckItemsgrade({ commit }) {
            try {
                commit('UN_CHECK_GRADE')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        GETBYIDGRADE(state, data) {
            try {
                state.getByIdgrade = data
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_GRADE(state, id) {
            try {
                state.grade = state.grade.filter(item => item.GradeId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_GRADE(state, updateItem) {
            try {
                const index = state.grade.findIndex(item => item.GradeId === updateItem.GradeId);
                if (index !== -1) {
                    state.grade.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_GRADE(state, newGrade) {
            try {
                state.grade.unshift(newGrade)
            } catch (error) {
                console.log(error);
            }

        },
        SET_GRADE(state, grade) {
            try {
                state.grade = grade;
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_GRADE(state, grademaxcode) {
            try {
                state.grademaxcode = grademaxcode
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadinggrade DỮ LIỆU
        SET_LOADING_GRADE(state) {
            try {
                state.loadinggrade = true;
                setTimeout(() => {
                    state.loadinggrade = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_GRADE(state) {
            try {
                const allChecked = state.grade.every(item => item.isChecked);
                state.grade.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllgrade = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDGRADE(state, id) {
            try {
                state.selectedItemsgrade.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_GRADE(state) {
            try {
                state.isshowgrade = !state.isshowgrade;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        UPDATE_MODE_GRADE(state) {
            try {
                state.formModegrade = false;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_GRADE(state) {
            try {
                state.formModegrade = true
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_GRADE(state) {
            try {
                state.grade.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default grademodule;
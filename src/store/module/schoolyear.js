import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const schoolyearmodule = {
    state: {
        schoolyear: [],
        getByIdschoolyear: [],
        loadingschoolyear: false,
        checkAllschoolyear: false,
        isshowschoolyear: false,
        selectedItemsschoolyear: [],
    },
    getters: {
        getByIdschoolyear: state => state.getByIdschoolyear,
        schoolyear: state => state.schoolyear,
        isshowschoolyear: state => state.isshowschoolyear,
        loadingschoolyear: state => state.loadingschoolyear,
        checkAllschoolyear: state => state.checkAllschoolyear,
        isCheckedschoolyear: state => state.schoolyear.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmountschoolyear: state => state.schoolyear.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedschoolyear: state => state.schoolyear.some((item) => item.isChecked == true),
        selectedItemsschoolyear: state => state.selectedItemsschoolyear,
    },
    actions: {
        async addschoolyear({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}SchoolYear/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_SCHOOLYEAR', newStaff)
                dispatch("getschoolyear");
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteschoolyear({ commit, dispatch }, SchoolYearId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}SchoolYear/${SchoolYearId}`)
                commit('DELETE_SCHOOLYEAR', SchoolYearId);
                dispatch('getschoolyear');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleschoolyear({ commit, dispatch }, SchoolYearIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}SchoolYear`, { data: SchoolYearIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_SCHOOLYEAR', SchoolYearIds);
                    dispatch('getschoolyear');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemschoolyear({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}SchoolYear/${updateChild.SchoolYearId}`,
                        updateChild);
                commit('UPDATE_SCHOOLYEAR', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getschoolyear');
            } catch (error) {
                console.log(error);
            }
        },
        async getschoolyear({ commit }) {
            try {
                commit('SET_LOADING_SCHOOLYEAR')
                const res = await axios.get(`${API_BASE_URL}SchoolYear`)
                commit('SET_SCHOOLYEAR', res.data)
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
        async getIDschoolyear({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}SchoolYear/${object.SchoolYearId}`)
                commit('GETBYIDSCHOOLYEAR', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionschoolyear({ commit }) {
            try {
                commit('SELECT_ALL_SCHOOLYEAR')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        GETBYIDSCHOOLYEAR(state, data) {
            try {
                state.getByIdschoolyear = data
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_SCHOOLYEAR(state, id) {
            try {
                state.schoolyear = state.schoolyear.filter(item => item.SchoolYearId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_SCHOOLYEAR(state, updateItem) {
            try {
                const index = state.schoolyear.findIndex(item => item.SchoolYearId === updateItem.SchoolYearId);
                if (index !== -1) {
                    state.schoolyear.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_SCHOOLYEAR(state, newGrade) {
            try {
                state.schoolyear.unshift(newGrade)
            } catch (error) {
                console.log(error);
            }

        },
        SET_SCHOOLYEAR(state, schoolyear) {
            try {
                state.schoolyear = schoolyear;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingschoolyear DỮ LIỆU
        SET_LOADING_SCHOOLYEAR(state) {
            try {
                state.loadingschoolyear = true;
                setTimeout(() => {
                    state.loadingschoolyear = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_SCHOOLYEAR(state) {
            try {
                const allChecked = state.schoolyear.every(item => item.isChecked);
                state.schoolyear.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllschoolyear = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDSCHOOLYEAR(state, id) {
            try {
                state.selectedItemsschoolyear.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_SCHOOLYEAR(state) {
            try {
                state.isshowschoolyear = !state.isshowschoolyear;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default schoolyearmodule;
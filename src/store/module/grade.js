import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const grademodule = {
    state: {
        grade: [],
        getById: [],
        loading: false,
        checkAll: false,
        selectedItems: [],
    },
    getters: {
        getById: state => state.getById,
        grade: state => state.grade,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.grade.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.grade.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.grade.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
    },
    actions: {
        async addGrade({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Grades/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_GRADE', newStaff)
                dispatch("getGrade");
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
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleclassroom({ commit, dispatch }, GradeIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Grades`, { data: GradeIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_GRADE', GradeIds);
                    dispatch('getGrade');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItem({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Grades/${updateChild.GradeId}`,
                        updateChild);
                commit('UPDATE_GRADE', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getGrade');
            } catch (error) {
                console.log(error);
            }
        },
        async getGrade({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Grades`)
                commit('SET_GRADE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelection({ commit }) {
            try {
                commit('SELECT_ALL')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        GETBYID(state, data) {
            try {
                state.getById = data
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
        //SET THỜI GIAN HIỂN THỊ LOADING DỮ LIỆU
        SET_LOADING(state) {
            try {
                state.loading = true;
                setTimeout(() => {
                    state.loading = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL(state) {
            try {
                state.classroom.map((item) => {
                    if (item.isChecked == false) {
                        item.isChecked = true;
                        state.checkAll = true
                    }
                    else {
                        item.isChecked = false;
                        state.checkAll = false
                    }
                });
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKED(state, id) {
            try {
                state.selectedItems.push(id);
            } catch (error) {
                console.log(error);
            }

        },
    }
}
export default grademodule;
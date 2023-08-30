import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const classroomModule = {
    state: {
        classroom: [],
        grade: [],
        getById: [],
        loading: false,
        checkAll: false,
        selectedItems: [],
    },
    getters: {
        classroom: state => state.classroom,
        getById: state => state.getById,
        grade: state => state.grade,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.classroom.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.classroom.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.classroom.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
    },
    actions: {
        async getClassRoom({ commit }) {
            try {
                commit('SET_LOADING')
                const res = await axios.get(`${API_BASE_URL}ClassRooms/`)
                commit('SET_CLASSROOM', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addSclassromm({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}ClassRooms/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_CLASSROOM', newStaff)
                dispatch('getClassRoom');
                dispatch("getGrade");
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteclassroom({ commit, dispatch }, ClassRoomId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}ClassRooms/${ClassRoomId}`)
                commit('DELETE_CLASSROOM', ClassRoomId);
                dispatch('getClassRoom');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleclassroom({ commit, dispatch }, ClassRoomIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}ClassRooms`, { data: ClassRoomIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_CLASSROOM', ClassRoomIds);
                    dispatch('getClassRoom');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemclassroom({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}ClassRooms/${updateChild.ClassRoomId}`,
                        updateChild);
                commit('UPDATE_CLASSROOM', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getClassRoom');
                console.log('update', response.data.message);
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
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYID(state, data) {
            try {
                state.getById = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_CLASSROOM(state, classroom) {
            try {
                state.classroom = classroom;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_CLASSROOM(state, id) {
            try {
                state.classroom = state.classroom.filter(item => item.ClassRoomId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_CLASSROOM(state, updateItem) {
            try {
                const index = state.classroom.findIndex(item => item.ClassRoomId === updateItem.ClassRoomId);
                if (index !== -1) {
                    state.classroom.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_CLASSROOM(state, newClassRoom) {
            try {
                state.classroom.unshift(newClassRoom)
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
export default classroomModule;
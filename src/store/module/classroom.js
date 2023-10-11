import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const classroomModule = {
    state: {
        classroom: [],
        gradeclassroom: [],
        getByIdClassroom: [],
        loadingclassroom: false,
        checkAllclassroom: false,
        selectedItemsclassroom: [],
        isshowclassroom: false,
        formModeclassroom: false,
        classroommaxcode: null
    },
    getters: {
        classroom: state => state.classroom,
        getByIdClassroom: state => state.getByIdClassroom,
        gradeclassroom: state => state.gradeclassroom,
        loadingclassroom: state => state.loadingclassroom,
        checkAllclassroom: state => state.checkAllclassroom,
        isChecked: state => state.classroom.isChecked,
        isshowclassroom: state => state.isshowclassroom,
        formModeclassroom: state => state.formModeclassroom,
        classroommaxcode: state => state.classroommaxcode,
        //dùng để đển số checkbox đã được chọn 
        checkAmountclassroom: state => state.classroom.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedclassroom: state => state.classroom.some((item) => item.isChecked == true),
        selectedItemsclassroom: state => state.selectedItemsclassroom,
    },
    actions: {
        async getClassRoom({ commit }) {
            try {
                commit('SET_LOADING_CLASSROOM')
                const res = await axios.get(`${API_BASE_URL}ClassRooms/`)
                commit('SET_CLASSROOM', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelClasroom() {
            try {
                const response = await axios.get(`${API_BASE_URL}ClassRooms/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Classrooms.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async addSclassromm({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}ClassRooms/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_CLASSROOM', newStaff)
                dispatch('getClassRoom');
                dispatch('getMaxCodeclassroom')
                dispatch("getGradeclassroom");
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteclassroom({ commit, dispatch }, ClassRoomId) {
            //commit('DELETE_TODO', id)
            try {
                const response = await axios.delete(`${API_BASE_URL}ClassRooms/${ClassRoomId}`)
                if (response.status === 200) {
                    commit('DELETE_CLASSROOM', ClassRoomId);
                    dispatch('getClassRoom');
                    dispatch('getMaxCodeclassroom');
                }
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
                    dispatch('getMaxCodeclassroom');
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
                dispatch('getMaxCodeclassroom');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getGradeclassroom({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Grades`)
                commit('SET_GRADE_CLASSROOM', res.data)
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
        async getIDclassroom({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}ClassRooms/${object.ClassRoomId}`)
                commit('getByIdClassroom', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionclassroom({ commit }) {
            try {
                commit('SELECT_ALL_CLASSROOM')
            } catch (error) {
                console.log(error);
            }

        },
        async getMaxCodeclassroom({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}ClassRooms/ClassroomCodeMax`)
                commit('SET_MAXCODE_CLASSROOM', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsclassroom({ commit }) {
            try {
                commit('UN_CHECK_CLASSROOM')
            } catch (error) {
                console.log(error);
            }

        },
    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        getByIdClassroom(state, data) {
            try {
                state.getByIdClassroom = data
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
        SET_GRADE_CLASSROOM(state, gradeclassroom) {
            try {
                state.gradeclassroom = gradeclassroom;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingclassroom DỮ LIỆU
        SET_LOADING_CLASSROOM(state) {
            try {
                state.loadingclassroom = true;
                setTimeout(() => {
                    state.loadingclassroom = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        SELECT_ALL_CLASSROOM(state) {
            try {
                const allChecked = state.classroom.every(item => item.isChecked);

                state.classroom.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllclassroom = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDCLASSROOM(state, id) {
            try {
                state.selectedItemsclassroom.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_CLASSROOM(state) {
            try {
                state.isshowclassroom = !state.isshowclassroom;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_CLASSROOM(state) {
            try {
                state.formModeclassroom = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_CLASSROOM(state) {
            try {
                state.formModeclassroom = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_CLASSROOM(state) {
            try {
                state.classroom.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_CLASSROOM(state, classroommaxcode) {
            try {
                state.classroommaxcode = classroommaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default classroomModule;
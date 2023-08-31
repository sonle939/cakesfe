import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const studentModule = {
    state: {
        student: [],
        classroomstudent: [],
        getByIdstudent: [],
        loadingstudent: false,
        checkAllstudent: false,
        isHidestudent: false,
        selectedItemsstudent: [],

        //phan trang
        pageSizestudent: 15, // số lượng item trên một trang
        pageNumberstudent: 1, // số trang đang hiển thị
        classroomId: '',
        studentCode: '',
        totalRecordsstudent: 1,
        totalPagesstudent: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        student: state => state.student,
        getByIdstudent: state => state.getByIdstudent,
        classroomstudent: state => state.classroomstudent,
        loadingstudent: state => state.loadingstudent,
        checkAllstudent: state => state.checkAllstudent,
        isCheckedstudent: state => state.student.isChecked,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allStudent: state => state.student.length,
        showIsHidestudent: state => state.isHidestudent,
        //dùng để đển số checkbox đã được chọn 
        checkAmountstudent: state => state.student.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedstudent: state => state.student.some((item) => item.isChecked == true),
        selectedItemsstudent: state => state.selectedItemsstudent,
        //khai bao getter phan trang
        totalRecordsstudent: state => state.totalRecordsstudent,
        pageNumberstudent: state => state.pageNumberstudent,
        totalPagesstudent: state => state.totalPagesstudent,
        pageSizestudent: state => state.pageSizestudent,
        //ket thuc getter phan trang

    },
    actions: {
        async getstudent({ commit, state }) {
            try {
                commit('SET_LOADING_STUDENT')
                const res = await
                    axios.get(`${API_BASE_URL}Students/Paging?pageSize=${state.pageSizestudent}&pageNumber=${state.pageNumberstudent}&recordId=${state.classroomId}&recordCode=${state.studentCode}`)
                commit('SET_STUDENT', res.data.data)
                commit('SET_TOTAL_PAGES_STUDENT', res.data.totalRecords)
                commit('SET_ALLPAGE_STUDENT', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async getIDstudent({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Students/${object.StudentId}`)
                commit('getByIdstudent', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addstudent({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Students/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_STUDENT', newStaff)
                dispatch('getstudent');
                dispatch("getclassroomstudent");
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletestudent({ commit, dispatch }, StudentId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Students/${StudentId}`)
                commit('DELETE_STUDENT', StudentId);
                dispatch('getstudent');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplestudent({ commit, dispatch }, StudentIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Students`, { data: StudentIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_STUDENT', StudentIds);
                    dispatch('getstudent');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemstudent({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Students/${updateChild.StudentId}`,
                        updateChild);
                commit('UPDATE_STUDENT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getstudent');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getclassroomstudent({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}ClassRooms`)
                commit('SET_CLASSROOM_STUDENT', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionstudent({ commit }) {
            try {
                commit('SELECT_ALL_STUDENT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizestudent({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_STUDENT', name);
                dispatch('getstudent')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberstudent({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_STUDENT', currentPage)
            dispatch('getstudent')
        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        getByIdstudent(state, data) {
            try {
                state.getByIdstudent = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_STUDENT(state, student) {
            try {
                state.student = student;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_STUDENT(state, id) {
            try {
                state.student = state.student.filter(item => item.StudentId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_STUDENT(state, updateItem) {
            try {
                const index = state.student.findIndex(item => item.StudentId === updateItem.StudentId);
                if (index !== -1) {
                    state.student.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_STUDENT(state, newTeacher) {
            try {
                state.student.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        SET_CLASSROOM_STUDENT(state, classroomstudent) {
            try {
                state.classroomstudent = classroomstudent;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingstudent DỮ LIỆU
        SET_LOADING_STUDENT(state) {
            try {
                state.loadingstudent = true;
                setTimeout(() => {
                    state.loadingstudent = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_STUDENT(state) {
            try {
                const allChecked = state.student.every(item => item.isChecked);

                state.student.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllclassroom = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDSTUDENT(state, id) {
            try {
                state.selectedItemsstudent.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_STUDENT(state, totalRecordsstudent) {
            try {
                state.totalRecordsstudent = totalRecordsstudent
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_STUDENT(state, total) {
            try {
                state.totalPagesstudent = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_STUDENT(state, pageNumberstudent) {
            try {
                state.pageNumberstudent = pageNumberstudent
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_STUDENT(state, newPage) {
            try {
                state.isHidestudent = !state.isHidestudent;
                state.pageSizestudent = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDESTUDENT(state) {
            try {
                state.isHidestudent = !state.isHidestudent
            } catch (error) {
                console.log(error);
            }

        },
    }
}
export default studentModule;
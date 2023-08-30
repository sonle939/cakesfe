import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const studentModule = {
    state: {
        student: [],
        classroom: [],
        getById: [],
        loading: false,
        checkAll: false,
        isHide: false,
        selectedItems: [],

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
        getById: state => state.getById,
        classroom: state => state.classroom,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.student.isChecked,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allStudent: state => state.student.length,
        showIsHidestudent: state => state.isHide,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.student.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.student.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
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
                commit('SET_LOADING')
                const res = await
                    axios.get(`${API_BASE_URL}Students/Paging?pageSize=${state.pageSizestudent}&pageNumber=${state.pageNumberstudent}&recordId=${state.classroomId}&recordCode=${state.studentCode}`)
                commit('SET_STUDENT', res.data.data)
                commit('SET_TOTAL_PAGES', res.data.totalRecords)
                commit('SET_ALLPAGE', res.data.totalPages);
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
                dispatch("getclassroom");
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
        async getclassroom({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}ClassRooms`)
                commit('SET_CLASSROOM', res.data)
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
        setSizestudent({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE', name);
                dispatch('getstudent')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberstudent({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER', currentPage)
            dispatch('getstudent')
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
        SET_CLASSROOM(state, classroom) {
            try {
                state.classroom = classroom;
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
                state.student.map((item) => {
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
        //phan trang
        SET_TOTAL_PAGES(state, totalRecordsstudent) {
            try {
                state.totalRecordsstudent = totalRecordsstudent
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE(state, total) {
            try {
                state.totalPagesstudent = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER(state, pageNumberstudent) {
            try {
                state.pageNumberstudent = pageNumberstudent
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE(state, newPage) {
            try {
                state.isHide = !state.isHide;
                state.pageSizestudent = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDE(state) {
            try {
                state.isHide = !state.isHide
            } catch (error) {
                console.log(error);
            }

        },
    }
}
export default studentModule;
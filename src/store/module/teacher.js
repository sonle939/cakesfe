import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const teacherModule = {
    state: {
        teacher: [],
        subject: [],
        getById: [],
        loading: false,
        checkAll: false,
        isHide: false,
        selectedItems: [],

        //phan trang
        pageSize: 13, // số lượng item trên một trang
        pageNumber: 1, // số trang đang hiển thị
        subjectId: '',
        teacherCode: '',
        totalRecords: 1,
        totalPages: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        teacher: state => state.teacher,
        getById: state => state.getById,
        subject: state => state.subject,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.teacher.isChecked,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allTeacher: state => state.teacher.length,
        showIsHide: state => state.isHide,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.teacher.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.teacher.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
        //khai bao getter phan trang
        totalRecords: state => state.totalRecords,
        pageNumber: state => state.pageNumber,
        totalPages: state => state.totalPages,
        pageSize: state => state.pageSize,
        //ket thuc getter phan trang

    },
    actions: {
        async getteacher({ commit, state }) {
            try {
                commit('SET_LOADING')
                const res = await
                    axios.get(`${API_BASE_URL}Teachers/Paging?pageSize=${state.pageSize}&pageNumber=${state.pageNumber}&recordId=${state.subjectId}&recordCode=${state.teacherCode}`)
                commit('SET_TEACHER', res.data.data)
                commit('SET_TOTAL_PAGES', res.data.totalRecords)
                commit('SET_ALLPAGE', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async addteacher({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Teachers/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_TEACHER', newStaff)
                dispatch('getteacher');
                dispatch("getsubject");
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteteacher({ commit, dispatch }, TeacherId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Teachers/${TeacherId}`)
                commit('DELETE_TEACHER', TeacherId);
                dispatch('getteacher');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleteacher({ commit, dispatch }, TeacherIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Teachers`, { data: TeacherIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_TEACHER', TeacherIds);
                    dispatch('getteacher');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItem({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Teachers/${updateChild.TeacherId}`,
                        updateChild);
                commit('UPDATE_TEACHER', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getteacher');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getsubject({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Subjects`)
                commit('SET_SUBJECT', res.data)
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
        setSize({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE', name);
                dispatch('getteacher')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumber({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER', currentPage)
            dispatch('getteacher')
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
        SET_TEACHER(state, teacher) {
            try {
                state.teacher = teacher;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_TEACHER(state, id) {
            try {
                state.teacher = state.teacher.filter(item => item.TeacherId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_TEACHER(state, updateItem) {
            try {
                const index = state.teacher.findIndex(item => item.TeacherId === updateItem.TeacherId);
                if (index !== -1) {
                    state.teacher.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_TEACHER(state, newTeacher) {
            try {
                state.teacher.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        SET_SUBJECT(state, subject) {
            try {
                state.subject = subject;
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
                state.teacher.map((item) => {
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
        SET_TOTAL_PAGES(state, totalRecords) {
            try {
                state.totalRecords = totalRecords
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE(state, total) {
            try {
                state.totalPages = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER(state, pageNumber) {
            try {
                state.pageNumber = pageNumber
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE(state, newPage) {
            try {
                state.isHide = !state.isHide;
                state.pageSize = newPage
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
export default teacherModule;
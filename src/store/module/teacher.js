import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const teacherModule = {
    state: {
        teacher: [],
        subjectteacher: [],
        classroomteacher: [],
        getByIdteacher: [],
        loadingteacher: false,
        checkAllteacher: false,
        isHideteacher: false,
        selectedItemsteacher: [],
        isshowteacher: false,
        formModeteacher: false,
        teachermaxcode: null,

        //phan trang
        pageSizeteacher: 15, // số lượng item trên một trang
        pageNumberteacher: 1, // số trang đang hiển thị
        subjectId: '',
        teacherCode: '',
        totalRecordsteacher: 1,
        totalPagesteacher: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        teacher: state => state.teacher,
        isshowteacher: state => state.isshowteacher,
        getByIdteacher: state => state.getByIdteacher,
        subjectteacher: state => state.subjectteacher,
        loadingteacher: state => state.loadingteacher,
        checkAllteacher: state => state.checkAllteacher,
        isChecked: state => state.teacher.isChecked,
        formModeteacher: state => state.formModeteacher,
        teachermaxcode: state => state.teachermaxcode,
        classroomteacher: state => state.classroomteacher,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allTeacher: state => state.teacher.length,
        showIsHideteacher: state => state.isHideteacher,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.teacher.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.teacher.some((item) => item.isChecked == true),
        selectedItemsteacher: state => state.selectedItemsteacher,
        //khai bao getter phan trang
        totalRecordsteacher: state => state.totalRecordsteacher,
        pageNumberteacher: state => state.pageNumberteacher,
        totalPagesteacher: state => state.totalPagesteacher,
        pageSizeteacher: state => state.pageSizeteacher,
        //ket thuc getter phan trang

    },
    actions: {
        async getteacher({ commit, state }) {
            try {
                commit('SET_LOADING_TEACHER')
                const res = await
                    axios.get(`${API_BASE_URL}Teachers/Paging?pageSize=${state.pageSizeteacher}&pageNumber=${state.pageNumberteacher}&recordId=${state.subjectId}&recordCode=${state.teacherCode}`)
                commit('SET_TEACHER', res.data.data)
                commit('SET_TOTAL_PAGES_TEACHER', res.data.totalRecords)
                commit('SET_ALLPAGE_TEACHER', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async getIDteacher({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Teachers/${object.TeacherId}`)
                commit('GETBYIDTEACHER', response.data)
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
                dispatch("getsubjectteacher");
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
        async updateItemteacher({ commit, dispatch }, updateChild) {
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
        async getsubjectteacher({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Subjects`)
                commit('SET_SUBJECT_TEACHER', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getclassroomteacher({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}ClassRooms`)
                commit('SET_CLASSROOM_TEACHER', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionteacher({ commit }) {
            try {
                commit('SELECT_ALL_TEACHER')
            } catch (error) {
                console.log(error);
            }

        },
        setSizeteacher({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_TEACHER', name);
                dispatch('getteacher')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberteacher({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_TEACHER', currentPage)
            dispatch('getteacher')
        },
        async filterteachersubject({ commit, dispatch }, filter) {
            try {
                commit('FILTER_TEACHER_SUBJECT', filter);
                dispatch('getteacher');
            } catch (error) {
                console.error(error)
            }
        },
        async filterteachercode({ commit, dispatch }, filter) {
            try {
                commit('FILTER_TEACHER_TEACHERCODE', filter);
                dispatch('getteacher');
            } catch (error) {
                console.error(error)
            }
        },
        async getMaxCodeteacher({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Teachers/TeacherCodeMax`)
                commit('SET_MAXCODE_TEACHER', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsteacher({ commit }) {
            try {
                commit('UN_CHECK_TEACHER')
            } catch (error) {
                console.log(error);
            }

        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYIDTEACHER(state, data) {
            try {
                state.getByIdteacher = data
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
        FILTER_TEACHER_SUBJECT(state, subjectId) {
            try {
                state.subjectId = subjectId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_TEACHER_TEACHERCODE(state, teacherCode) {
            try {
                state.teacherCode = teacherCode;
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
        SET_SUBJECT_TEACHER(state, subjectteacher) {
            try {
                state.subjectteacher = subjectteacher;
            } catch (error) {
                console.log(error);
            }
        },
        SET_CLASSROOM_TEACHER(state, classroomteacher) {
            try {
                state.classroomteacher = classroomteacher;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingteacher DỮ LIỆU
        SET_LOADING_TEACHER(state) {
            try {
                state.loadingteacher = true;
                setTimeout(() => {
                    state.loadingteacher = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_TEACHER(state) {
            try {
                const allChecked = state.teacher.every(item => item.isChecked);

                state.teacher.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllclassroom = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDTEACHER(state, id) {
            try {
                state.selectedItemsteacher.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_TEACHER(state, totalRecordsteacher) {
            try {
                state.totalRecordsteacher = totalRecordsteacher
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_TEACHER(state, total) {
            try {
                state.totalPagesteacher = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_TEACHER(state, pageNumberteacher) {
            try {
                state.pageNumberteacher = pageNumberteacher
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_TEACHER(state, newPage) {
            try {
                state.isHideteacher = !state.isHideteacher;
                state.pageSizeteacher = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDETEACHER(state) {
            try {
                state.isHideteacher = !state.isHideteacher
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_TEACHER(state) {
            try {
                state.isshowteacher = !state.isshowteacher
            } catch (error) {
                console.log(error);
            }
        },
        ADD_MODE_TEACHER(state) {
            try {
                state.formModeteacher = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_TEACHER(state) {
            try {
                state.formModeteacher = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_TEACHER(state) {
            try {
                state.teacher.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_TEACHER(state, teachermaxcode) {
            try {
                state.teachermaxcode = teachermaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default teacherModule;
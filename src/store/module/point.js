import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const pointModule = {
    state: {
        point: [],
        studentpoint: [],
        subjectpoint: [],
        teacherpoint: [],
        semesterpoint: [],
        schoolyearpoint: [],
        getByIdpoint: [],
        loadingpoint: false,
        checkAllpoint: false,
        isHidepoint: false,
        isshowpoint: false,
        selectedItemspoint: [],

        //phan trang
        pageSizespoint: 15, // số lượng item trên một trang
        pageNumberpoint: 1, // số trang đang hiển thị
        studentId: '',
        subjectId: '',
        teacherId: '',
        semesterId: '',
        SchoolyearId: '',
        totalRecordspoint: 1,
        totalPagespoint: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        point: state => state.point,
        isshowpoint: state => state.isshowpoint,
        getByIdpoint: state => state.getByIdpoint,
        studentpoint: state => state.studentpoint,
        subjectpoint: state => state.subjectpoint,
        teacherpoint: state => state.teacherpoint,
        semesterpoint: state => state.semesterpoint,
        schoolyearpoint: state => state.schoolyearpoint,
        loadingpoint: state => state.loadingpoint,
        checkAllpoint: state => state.checkAllpoint,
        isCheckedpoint: state => state.point.isChecked,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allPoint: state => state.point.length,
        showIsHidepoint: state => state.isHidepoint,
        //dùng để đển số checkbox đã được chọn 
        checkAmountpoint: state => state.point.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedpoint: state => state.point.some((item) => item.isChecked == true),
        selectedItemspoint: state => state.selectedItemspoint,
        //khai bao getter phan trang
        totalRecordspoint: state => state.totalRecordspoint,
        pageNumberpoint: state => state.pageNumberpoint,
        totalPagespoint: state => state.totalPagespoint,
        pageSizespoint: state => state.pageSizespoint,
        //ket thuc getter phan trang

    },
    actions: {
        async getpoint({ commit, state }) {
            try {
                commit('SET_LOADING_POINT')
                const res = await
                    axios.get(`${API_BASE_URL}Points/Paging?pageSize=${state.pageSizespoint}&pageNumber=${state.pageNumberpoint}&subjectId=${state.subjectId}&teacherId=${state.teacherId}&classroomId=${state.classroomId}`)
                commit('SET_POINT', res.data.data)
                commit('SET_TOTAL_PAGES_POINT', res.data.totalRecords)
                commit('SET_ALLPAGE_POINT', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async getIDpoint({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/${object.PointId}`)
                commit('GETBYIDPOINT', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addpoint({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Points/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_POINT', newStaff)
                dispatch('getpoint');
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletepoint({ commit, dispatch }, PointId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Points/${PointId}`)
                commit('DELETE_POINT', PointId);
                dispatch('getpoint');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplepoint({ commit, dispatch }, PointIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Points`, { data: PointIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_POINT', PointIds);
                    dispatch('getpoint');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItempoint({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Points/${updateChild.PointId}`,
                        updateChild);
                commit('UPDATE_POINT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getpoint');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getstudentpoint({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Students`)
                commit('SET_STUDENT_POINT', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getteachertimetable({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Teachers`)
                commit('SET_TEACHER_TIMETABLE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getsubjecttimetable({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Subjects`)
                commit('SET_SUBJECT_TIMETABLE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getsemesterpoint({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Semesters`)
                commit('SET_SEMESTER_POINT', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getschooltearpoint({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}SchoolYear`)
                commit('SET_SCHOOLYEAR_POINT', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionpoint({ commit }) {
            try {
                commit('SELECT_ALL_POINT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizepoint({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_POINT', name);
                dispatch('getpoint')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberpoint({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_POINT', currentPage)
            dispatch('getpoint')
        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYIDPOINT(state, data) {
            try {
                state.getByIdpoint = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_POINT(state, point) {
            try {
                state.point = point;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_POINT(state, id) {
            try {
                state.point = state.point.filter(item => item.PointId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_POINT(state, updateItem) {
            try {
                const index = state.point.findIndex(item => item.PointId === updateItem.PointId);
                if (index !== -1) {
                    state.point.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_POINT(state, newTeacher) {
            try {
                state.point.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        SET_STUDENT_POINT(state, studentpoint) {
            try {
                state.studentpoint = studentpoint;
            } catch (error) {
                console.log(error);
            }
        },
        SET_TEACHER_POINT(state, teacherpoint) {
            try {
                state.teacherpoint = teacherpoint;
            } catch (error) {
                console.log(error);
            }
        },
        SET_SUBJECT_POINT(state, subjectpoint) {
            try {
                state.subjectpoint = subjectpoint;
            } catch (error) {
                console.log(error);
            }
        },
        SET_SEMESTER_POINT(state, semesterpoint) {
            try {
                state.semesterpoint = semesterpoint;
            } catch (error) {
                console.log(error);
            }
        },
        SET_SCHOOLYEAR_POINT(state, schoolyearpoint) {
            try {
                state.schoolyearpoint = schoolyearpoint;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingpoint DỮ LIỆU
        SET_LOADING_POINT(state) {
            try {
                state.loadingpoint = true;
                setTimeout(() => {
                    state.loadingpoint = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_POINT(state) {
            try {
                const allChecked = state.point.every(item => item.isChecked);

                state.point.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllpoint = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDPOINT(state, id) {
            try {
                state.selectedItemspoint.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_POINT(state, totalRecordspoint) {
            try {
                state.totalRecordspoint = totalRecordspoint
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_POINT(state, total) {
            try {
                state.totalPagespoint = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_POINT(state, pageNumberpoint) {
            try {
                state.pageNumberpoint = pageNumberpoint
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_POINT(state, newPage) {
            try {
                state.isHidepoint = !state.isHidepoint;
                state.pageSizespoint = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDEPOINT(state) {
            try {
                state.isHidepoint = !state.isHidepoint
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_POINT(state) {
            try {
                state.isshowpoint = !state.isshowpoint
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default pointModule;
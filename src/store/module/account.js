import axios from "axios";
import router from '../../routers/index';
import studentModule from "./student";
import teacherModule from "./teacher";
const API_BASE_URL = 'https://localhost:7199/api/v2/';
import { saveAs } from 'file-saver';


const accountModule = {
    state: {
        account: [],
        getById: [],
        getByEmail: [],
        login: [],
        username: '',
        password: '',
        codeCheck: '',
        emailcodecheck: '',
        loadingaccount: false,
        checkAllaccount: false,
        isHide: false,
        isshowaccount: false,
        formModeaccount: false,
        accountmaxcode: null,
        selectedItems: [],
        teacherAll: [],
        studentAll: [],
        //phan trang
        pageSizeaccount: 15, // số lượng item trên một trang
        pageNumberaccount: 1, // số trang đang hiển thị 
        role: '',
        accountCode: '',
        totalRecordsaccount: 1,
        totalPagesaccount: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        account: state => state.account,
        login: state => state.login,
        username: state => state.username,
        password: state => state.password,
        studentAll: state => state.studentAll,
        teacherAll: state => state.teacherAll,
        getById: state => state.getById,
        getByEmail: state => state.getByEmail,
        codeCheck: state => state.codeCheck,
        emailcodecheck: state => state.emailcodecheck,
        /**dung de loc theo dieu kien */
        role: state => state.role,
        accountCode: state => state.accountCode,
        loadingaccount: state => state.loadingaccount,
        checkAllaccount: state => state.checkAllaccount,
        isCheckedaccount: state => state.account.isChecked,
        isshowaccount: state => state.isshowaccount,
        accountmaxcode: state => state.accountmaxcode,
        formModeaccount: state => state.formModeaccount,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allAccount: state => state.account.length,
        showIsHideaccount: state => state.isHide,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.account.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.account.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
        //khai bao getter phan trang
        totalRecordsaccount: state => state.totalRecordsaccount,
        pageNumberaccount: state => state.pageNumberaccount,
        totalPagesaccount: state => state.totalPagesaccount,
        pageSizeaccount: state => state.pageSizeaccount,
        //ket thuc getter phan trang

    },
    actions: {
        async getaccount({ commit, state }) {
            try {
                commit('SET_LOADING_ACCOUNT')
                const res = await
                    axios.get(`${API_BASE_URL}Accounts/Paging?pageSize=${state.pageSizeaccount}&pageNumber=${state.pageNumberaccount}&recordRole=${state.role}&recordCode=${state.accountCode}`)
                commit('SET_ACCOUNT', res.data.data)
                commit('SET_TOTAL_PAGES', res.data.totalRecords)
                commit('SET_ALLPAGE', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelAccount() {
            try {
                const response = await axios.get(`${API_BASE_URL}Accounts/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Accounts.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async getStudentAll({ commit }) {
            try {
                commit('SET_LOADING_ACCOUNT')
                const res = await axios.get(`${API_BASE_URL}Students/`)
                commit('SET_STUDENT_ALL', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getteacherAll({ commit }) {
            try {
                commit('SET_LOADING_ACCOUNT')
                const res = await axios.get(`${API_BASE_URL}Teachers/`)
                commit('SET_TEACHER_ALL', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addaccount({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Accounts/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_ACCOUNT', newStaff)
                dispatch('getaccount');
                dispatch('getMaxCodeaccount');
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        async sendEmailCode({ commit, state }) {
            try {
                const res = await axios.post(`https://localhost:7199/api/SendEmail?emailInput=${state.emailcodecheck}`);
                commit('CODECHECK', res.data.code);
                // Hiển thị thông báo với mã ngẫu nhiên, res.data.code có chứa mã ngẫu nhiên
                console.log('Random Code:', res.data.code);
                // Tiếp tục xử lý tại đây, ví dụ: dispatch('getaccount');
            } catch (error) {
                console.log(error);
            }
        },

        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteaccount({ commit, dispatch }, AccountId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Accounts/${AccountId}`)
                commit('DELETE_ACCOUNT', AccountId);
                dispatch('getaccount');
                dispatch('getMaxCodeaccount');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleaccount({ commit, dispatch }, AccountIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Accounts`, { data: AccountIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_ACCOUNT', AccountIds);
                    dispatch('getaccount');
                    dispatch('getMaxCodeaccount');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemaccount({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Accounts/${updateChild.AccountId}`,
                        updateChild);
                commit('UPDATE_ACCOUNT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getaccount');
                dispatch('getMaxCodeaccount');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        toggleAllSelection({ commit }) {
            try {
                commit('SELECT_ALL_ACCOUNT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizeaccount({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE', name);
                dispatch('getaccount')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberaccount({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER', currentPage)
            dispatch('getaccount')
        },
        async setFilterrole({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_ROLE', filter);
                dispatch('getaccount');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilteraccountcode({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_ACCOUNTCODE', filter);
                dispatch('getaccount');
            } catch (error) {
                console.error(error)
            }
        },
        async getMaxCodeaccount({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Accounts/AccountCodeMax`)
                commit('SET_MAXCODE_ACCOUNT', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsaccount({ commit }) {
            try {
                commit('UN_CHECK_ACCOUNT')
            } catch (error) {
                console.log(error);
            }

        },
        async getIDaccount({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Accounts/${object.AccountId}`)
                commit('GETBYID', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getbyemail({ commit, state }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Accounts/getByEmail?recordId=${state.emailcodecheck}`)
                commit('GETBYEMAIL', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async Loginaccount({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Accounts/Login?AccountCode=${object.username}&PassWord=${object.password}`);

                if (response.data.user.accountId === "00000000-0000-0000-0000-000000000000") {
                    // Display a login failure message or handle it as needed
                    console.log("Login failed");
                    alert('Tài khoản hoặc mật khẩu nhập sai');
                } else {
                    // Commit the user data to your Vuex store
                    commit('GETBYLOGIN', response.data.user);

                    if (response.data.user.studentId === null) {
                        // Redirect to /admin
                        router.push('/admin/student');
                        teacherModule.actions.IDloginteacher({ commit }, response.data.user);
                        sessionStorage.setItem('roleData', response.data.user.role);
                    }
                    if (response.data.user.teacherId === null) {
                        // Redirect to /user
                        router.push('/user');
                        // Chuyển hướng thành công, sau đó gọi action từ module studentModule
                        studentModule.actions.IDloginstudent({ commit }, response.data.user);
                        sessionStorage.setItem('roleData', response.data.user.role);

                    }

                    alert('Đăng nhập thành công');
                }
            } catch (error) {
                console.log(error);
                // Handle network or other errors here
            }
        }

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        CODECHECK(state, text) {
            try {
                state.codeCheck = text;
            } catch (error) {
                console.log(error);
            }
        },
        EMAILCHECK(state, text) {
            try {
                state.emailcodecheck = text;
            } catch (error) {
                console.log(error);
            }
        },
        GETBYID(state, data) {
            try {
                state.getById = data
            } catch (error) {
                console.log(error);
            }

        },
        GETBYEMAIL(state, data) {
            try {
                state.getByEmail = data
            } catch (error) {
                console.log(error);
            }

        },
        GETBYLOGIN(state, login) {
            try {
                state.login = login
            } catch (error) {
                console.log(error);
            }

        },
        SET_USERNAME(state, username) {
            try {
                state.username = username
            } catch (error) {
                console.log(error);
            }

        },
        SET_PASSWORD(state, password) {
            try {
                state.password = password
            } catch (error) {
                console.log(error);
            }

        },
        /**dunfg de loc du lieu theo loai tai khoan */
        SET_FILTER_ROLE(state, role) {
            try {
                state.role = role;
            } catch (error) {
                console.log(error);
            }
        },
        /**dunfg de loc du lieu theo ma tai khoan */
        SET_FILTER_ACCOUNTCODE(state, accountCode) {
            try {
                state.accountCode = accountCode;
            } catch (error) {
                console.log(error);
            }
        },
        SET_ACCOUNT(state, account) {
            try {
                state.account = account;
            } catch (error) {
                console.log(error);
            }
        },
        SET_STUDENT_ALL(state, studentAll) {
            try {
                state.studentAll = studentAll;
            } catch (error) {
                console.log(error);
            }
        },
        SET_TEACHER_ALL(state, teacherAll) {
            try {
                state.teacherAll = teacherAll;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_ACCOUNT(state, id) {
            try {
                state.account = state.account.filter(item => item.AccountId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_ACCOUNT(state, updateItem) {
            try {
                const index = state.account.findIndex(item => item.AccountId === updateItem.AccountId);
                if (index !== -1) {
                    state.account.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_ACCOUNT(state, newAccount) {
            try {
                state.account.unshift(newAccount)
            } catch (error) {
                console.log(error);
            }

        },
        //SET THỜI GIAN HIỂN THỊ loadingaccount DỮ LIỆU
        SET_LOADING_ACCOUNT(state) {
            try {
                state.loadingaccount = true;
                setTimeout(() => {
                    state.loadingaccount = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_ACCOUNT(state) {
            try {
                const allChecked = state.account.every(item => item.isChecked);

                state.account.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllaccount = !allChecked;
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
        SET_TOTAL_PAGES(state, totalRecordsaccount) {
            try {
                state.totalRecordsaccount = totalRecordsaccount
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE(state, total) {
            try {
                state.totalPagesaccount = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER(state, pageNumberaccount) {
            try {
                state.pageNumberaccount = pageNumberaccount
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE(state, newPage) {
            try {
                state.isHide = !state.isHide;
                state.pageSizeaccount = newPage
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
        SHOW_FORM_ACCOUNT(state) {
            try {
                state.isshowaccount = !state.isshowaccount
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_ACCOUNT(state) {
            try {
                state.formModeaccount = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_ACCOUNT(state) {
            try {
                state.formModeaccount = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_ACCOUNT(state) {
            try {
                state.account.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_ACCOUNT(state, accountmaxcode) {
            try {
                state.accountmaxcode = accountmaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default accountModule;
import axios from "axios";

const API_BASE_URL = 'https://localhost:7199/api/v2/';

const accountModule = {
    state: {
        account: [],
        getById: [],
        loading: false,
        checkAll: false,
        isHide: false,
        selectedItems: [],

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
        getById: state => state.getById,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.account.isChecked,
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
                commit('SET_LOADING')
                const res = await
                    axios.get(`${API_BASE_URL}Accounts/Paging?pageSize=${state.pageSizeaccount}&pageNumber=${state.pageNumberaccount}&recordRole=${state.role}&recordCode=${state.accountCode}`)
                commit('SET_ACCOUNT', res.data.data)
                commit('SET_TOTAL_PAGES', res.data.totalRecords)
                commit('SET_ALLPAGE', res.data.totalPages);
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
                console.log('aaa', res.data.notify);
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
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        toggleAllSelection({ commit }) {
            try {
                commit('SELECT_ALL')
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
        SET_ACCOUNT(state, account) {
            try {
                state.account = account;
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
                state.account.map((item) => {
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
    }
}
export default accountModule;
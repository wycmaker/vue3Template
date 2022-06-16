import { createStore } from 'vuex'
import { manager } from '@/services/userDataManager'

export default createStore({
  state: {
    userInfo: null,
    token: null,
    expiryDate: null,
    isAuthenticated: false,
    clientWidth: null,
    msgList: []
  },
  getters: {
    token: state => {
      return state.token;
    },
    isAuthenticated: state => {
      if (!state.token) {
        return false;
      }
      return state.isAuthenticated;
    },
  },
  mutations: {
    /**
     * 設定使用者資訊
     * @param {object} state Vuex state物件
     * @param {object} info 使用者資訊
     */
    setUserInfo(state, info) {
      state.userInfo = Object.assign({}, info);
      state.token = info.token;
      state.expiryDate = info.expiryDate;
      manager.setUserData(info);
    },
    /**
     * 將狀態設為已授權
     * @param {object} state Vuex state物件
     */
    authenticate(state) {
      state.isAuthenticated = true;
    },
    /**
     * 清空state資料
     * @param {object} state Vuex state物件
     */
    clearUserInfo(state) {
      state.token = null;
      state.expiryDate = null;
      state.isAuthenticated = false;
      state.userInfo = null;
      manager.clearData();
    },
    /**
     * 設定當前的clientWidth
     * @param {object} state Vuex state物件
     * @param {number} width 當前的Client Width
     */
    setClientWidth(state, width) {
      state.clientWidth = width
    },
    /**
     * 新增提醒訊息
     * @param {object} state Vuex state物件
     * @param {string} text 訊息文字 
     */
    addmessage(state, text) {
      state.msgList.push(text)
    }
  },
  strict: true
})

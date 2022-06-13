import { useToast } from "vue-toastification"
import { ElMessageBox } from 'element-plus'

const toast = useToast()

let options = {
  timeout: 2000,
  position: 'bottom-center',
  maxToasts: 5,
  draggable: false,
  showCloseButtonOnHover: true,
}
  
/* #region 頁面提醒函數 */

/**
 * 警告視窗
 * @param {String} message 訊息
 */
const alert = (message) => {
  return ElMessageBox.alert(message, '', {
    confirmButtonText: '確定',
    type: 'error',
    callback: () => { },
  })
}


/**
 * 確認視窗
 * @param {String} message 訊息
 */
const confirm = (message) => {
  return ElMessageBox.confirm(message, '',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: false,
    }
  )
}

/**
 * 提醒訊息(成功)
 * @param {Object} target 目標
 * @param {String} message 訊息
 */
const success = (message) => {
  toast.success(message, options)
}

/**
 * 提醒訊息(失敗)
 * @param {String} message 訊息
 */
const error = (message) => {
  toast.error(message, options)
}

/**
 * 提醒訊息(一般)
 * @param {String} message 訊息
 */
const info = (message) => {
  toast.info(message, options)
}

/**
 * 提醒訊息(警告)
 * @param {String} message 訊息
 */
const warning = (message) => {
  toast.warning(message, options)
}

export const infowindow = { alert, confirm, success, error, info, warning }

/* #endregion */

/* #region Axios 錯誤處理 */
  
  /**
   * http失敗處理
   * @param {String} message 
   */
  export const httpError = (message) => {
    toast.error(message, options)
  }
  
  /* #endregion */
  
const CryptoJS = require("crypto-js")

const name = 'user.template'
const key = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse('QEDF$%@_($KLS'))
const iv = CryptoJS.MD5(CryptoJS.enc.Utf8.parse('Q#%@KD*5)7'))

/* #region export function */

/**
 * 將加密後的使用者資訊存至localstorage
 * @param {Object} data 
 */
const setUserData = (data) => {
  const ciphertext = encrypt(JSON.stringify(data), 1)
  if (localStorage.getItem(name) !== ciphertext) localStorage.setItem(name, ciphertext)
}

/**
 * 取得使用者資料
 * @returns {Object} 使用者資訊
 */
const getUserData = () => {
  const ciphertext = localStorage.getItem(name);

  if (ciphertext) {
    try {
      const decryptedStr = decrypt(ciphertext, 1);
      const data = JSON.parse(decryptedStr);
      return data
    } catch (error) {
      return null
    }
  }

  return null
}

/**
 * 從localstorage清除使用者資訊
 */
const clearData = () => {
  localStorage.clear()
}

/**
 * 取得檔案加密網址
 * @param {Object} data 加密的物件 
 * @returns {String} 加密後的網址
 */
const encryptFileUrl = (data) => {
  const ciphertext = encrypt(JSON.stringify(data), 2)
  return ciphertext
}

export const manager = {
  setUserData: setUserData,
  getUserData: getUserData,
  clearData: clearData,
  encryptFileUrl : encryptFileUrl
}

/* #endregion */


/* #region 私有函數 */

/**
 * 加密
 * @param {String} data 來源
 * @param {Number} mode 加密模式
 * @returns {String} 加密後的字串
 */
const encrypt = (data, mode) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let result = (mode === 1) ? encrypted.toString() : encrypted.ciphertext.toString()
  return result;
}

/**
 * 解密
 * @param {String} encrypted 加密字串
 * @param {Number} mode 加密模式
 * @returns {String} 解密後的字串
 */
const decrypt = (encrypted, mode) => {
  const text = (mode === 1) ? encrypted : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypted))
  const decrypted = CryptoJS.AES.decrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/* #endregion */

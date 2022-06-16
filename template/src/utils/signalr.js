import * as signalR from '@microsoft/signalr'

export const useSignalR = () => {
  const store = getStore()

  const hubUrl = process.env.VUE_APP_SIGNALR_HUB
  const connection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(hubUrl).build()

  connection.start().catch(err => console.log(err));

  /* #region SignalR 接收函數 */

  connection.on('Show', msg => {
    store.commit('addmessage', msg)
  })

  /* #endregion */

  /* #region SignalR 傳送函數 */

  const send = () => {
    connection.invoke("SendMsg", "hello");
  }

  /* #endregion */

  return { send }
}
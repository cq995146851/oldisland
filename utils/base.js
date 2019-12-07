import { config } from '../config.js'

class Base {

  request({url, data = {}, method='GET'}) {
    return new Promise((resovle, reject) => {
      this._request(url, data, method, resovle, reject)
    })
  }

  // 发送http请求
  _request(url, data, method, resovle, reject) {
    wx.request({
      url: config.baseurl + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },

      success: (res) => {
        let error_code = res.data.error_code ? res.data.error_code.toString() : '200'
        if (!error_code.startsWith('2')) {
          reject()
          this._showToast(error_code)
        } else {
          resovle(res.data)
        }
      },
      fail: () => {
        reject()
        this._showToast(1)
      }
    })
  }


  // 消息提示框
  showToast(title = '提示框', icon = 'success', duration = 1500) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  }

  // 错误处理
  _showToast(error_code = '1') {
    wx.showToast({
      title: config.tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export { Base }
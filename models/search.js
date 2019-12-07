import { Base } from '../utils/base.js'

class SearchModel extends Base {
  key = "history"
  maxLength = 10

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  addHistory(word) {
    let historyArr = this.getHistory()
    if (!historyArr.includes(word)) {
      if (historyArr.length >= this.maxLength) {
        historyArr.pop()
      }
      historyArr.unshift(word)
      wx.setStorageSync(this.key, historyArr)
    }
    return historyArr
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
}

export { SearchModel }
import { Base } from '../utils/base.js'

class ClassicModel extends Base {
  prefix = 'classic'

  // 获取最新期刊
  getLatest () {
    let params = {
      url: 'classic/latest'
    }
    const latest =  this.request(params)
    latest.then((res) => {
      wx.setStorageSync(`${this.prefix}-latest-index`, res.index)
    })
    return latest
  }

  //获取当前期刊上一期
  getPrevious (index) {
    return this._getByIndex(index, 'next')
  }

  // 获取当前期刊下一期
  getNext (index) {
    return this._getByIndex(index, 'previous')
  }

  // 是否是最新期刊
  isLatest (index) {
    let latestIndex = wx.getStorageSync(`${this.prefix}-latest-index`)
    return index == latestIndex
  }

  // 是否是第一个期刊
  isFirst (index) {
    return index == 1
  }

  _getByIndex (index, previous_or_next) {
    let key = this.prefix + '-' + (previous_or_next == 'next' ? index + 1 : index -1)
    let data = wx.getStorageSync(key)
    if (data) {
      return new Promise((resovle) => {
        resovle(data)
      })
    } else {
      let params = {
        url: 'classic/' + index + '/' + previous_or_next,
      }
      let classic = this.request(params)
      classic.then((res) => {
        wx.setStorageSync(this.prefix + '-' + res.index, res)
      })
      return classic
    }
  }
}

export { ClassicModel }
import { BookModel } from '../../models/book.js'
import { random } from '../../utils/util.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    search: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHot()
  },

  onBookTap(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/book-detail/index?id=${id}`,
    })
  },

  onSearch(event) {
    this.setData({
      search: true
    })
  },

  onCancelTap(event) {
    this.setData({
      search: false
    })
  },

  onReachBottom(event) {
    this.setData({
      more: random(16)
    })
  },

  _getHot() {
    const hotList = bookModel.getHotList()
    hotList.then((res) => {
      this.setData({
        books: res
      })
    })
  },

})
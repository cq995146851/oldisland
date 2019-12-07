import { SearchModel } from '../../models/search.js'
import { BookModel } from '../../models/book.js'

const searchModel = new SearchModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    history: [],
    hot: [],
    books: [],
    word: '',
    total: 0,
    loadMore: false,
    lock: false
  },

  attached() {
    const history = searchModel.getHistory()
    this.setData({
      history
    })
    searchModel.getHot().then(res => {
      this.setData({
        hot: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel')
    },

    onDelete(event) {
      this.setData({
        books: [],
        word: ''
      })
    },

    onConfirm(event) {
      const word = event.detail.value || event.currentTarget.dataset.word
      console.log
      if (!word) 
        return false
      wx.showLoading({
        title: '正在请求...'
      })
      bookModel.getByWord(word).then(res => {
        if (res.books.length > 0) {
          const currHistory = searchModel.addHistory(word)
          this.setData({
            books: res.books,
            total: res.total,
            word: word,
            history: currHistory
          })
        } else {
          this.setData({
            books: []
          })
          wx.showToast({
            title: '未查到任何结果',
            icon: 'none'
          })
        }
        wx.hideLoading()
      })
    },

    onBookTap(event) {
      wx.navigateTo({
        url: '/pages/book-detail/index?id=' + event.currentTarget.dataset.id
      })
    },

    _loadMore(event) {
      if (!this.data.word)
        return false
      if (!this._hasMore()) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return false
      }
      this._getMore() 
    },

    _hasMore() {
      return this.data.books.length < this.data.total
    },

    _getMore() {
      this.setData({
        loadMore: true
      })
      if (this._isLocked()) 
        return false

      this._locked()
      bookModel.getByWord(this.data.word, this.data.books.length)
      .then(res => {
        this.setData({
          books: this.data.books.concat(res.books),
          loadMore: false
        })
        this._unLocked()
      })
    },

    _isLocked() {
      return this.data.lock
    },

    _locked() {
      this.data.lock = true
    },

    _unLocked() {
      this.data.lock = false
    }
  }
})

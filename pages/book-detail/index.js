import { BookModel } from '../../models/book.js'
import { CommentModel } from '../../models/comment.js'
import { Base } from '../../utils/base.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const commentModel = new CommentModel()
const base = new Base()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    likeStatus: {},
    count: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...'
    })
    const detail = bookModel.getDetail(options.id)
    const likeStatus = bookModel.getLikeStatus(options.id)
    const myBookCount = bookModel.getMyBookCount()
    const comments = commentModel.getComment(options.id)
    
    Promise.all([detail, likeStatus, myBookCount, comments])
    .then((res) => {
      this.setData({
        book: res[0],
        likeStatus: res[1].like_status,
        count: res[2].count,
        comments: res[3].comments
      })
      wx.hideLoading()
    })
  },

  onLikeTap(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },

  onPost(event) {
    this.setData({
      posting: true
    })
  },

  onCancle(event) {
    this.setData({
      posting: false
    })
  },

  onConfirm(event) {
    const comment = event.detail.value || event.currentTarget.dataset.comment
    if (comment.length > 12 || comment.length < 2 || comment == '') {
      base.showToast('字数在2-12之间', 'none')
      return false
    }
    const post = commentModel.postComment(this.data.book.id, comment)
    wx.showLoading({
      title: '正在请求...',
    })
    post.then((res) => {
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        posting: false,
        comments: this.data.comments
      })
      wx.hideLoading()
    }, (error) => {
      console.log(error)
      wx.hideLoading()
    })
  }
  

})
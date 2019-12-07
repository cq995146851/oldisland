import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classic = new ClassicModel()
let like = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: {},
    isLatest: true,
    isFirst: false,
    likeStatus: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getLatest()
  },

  onShareAppMessage() {
    console.log(111)
  },

  onLikeTap(event) {
    like.like(event.detail.behavior, 
              this.data.classicData.id,  
              this.data.classicData.type
    )
  },

  onPrevious (event) {
    const classicPromise = classic.getPrevious(this.data.classicData.index)
    classicPromise.then((res) => {
      this._getClassicLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        isLatest: classic.isLatest(res.index),
        isFirst: classic.isFirst(res.index)
      })
    })
  },

  onNext (event) {
    const classicPromise = classic.getNext(this.data.classicData.index)
    classicPromise.then((res) => {
      this._getClassicLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        isLatest: classic.isLatest(res.index),
        isFirst: classic.isFirst(res.index)
      })
    })
  },

  _getClassicLikeStatus (id, type) {
    const likePromise = like.getClassicLikeStatus(id, type)
    likePromise.then((res) => {
      this.setData({
        likeStatus: res.like_status,
        count: res.fav_nums
      })
    }) 
  },

  _getLatest() {
    wx.showLoading({
      title: '正在加载...',
    })
    const latest = classic.getLatest()
    latest.then((res) => {
      this._getClassicLikeStatus(res.id, res.type)
      this.setData({
        classicData: res
      })
      wx.hideLoading()
    })
  }
})
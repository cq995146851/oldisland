import { MyModel } from '../../models/my.js'

const myModel = new MyModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '/images/my/my.png',
    userInfo: {},
    myFavCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this._hasGetUserInfo()
    this._getMyFavCount()
    this._getMyClassics()
  },

  getUserInfo(event) {
    const userInfo = JSON.parse(event.detail.userInfo)
    if (!userInfo) 
      return false
    this._setUserInfo(userInfo)
  },

  onAboutTap(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  _hasGetUserInfo() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this._setUserInfo(JSON.parse(data.rawData))
            }
          })
        }
      }
    })
  },

  _setUserInfo(userInfo) {
    this.setData({
      imageSrc: userInfo.avatarUrl,
      userInfo
    })
  },

  _getMyFavCount() {
    myModel.getMyFavCount().then(res => {
      this.setData({
        myFavCount: res.count
      })
    })
  },

  _getMyClassics() {
    myModel.getMyClassics().then(res => {
      this.setData({
        classics: res
      })
    })
  }
})
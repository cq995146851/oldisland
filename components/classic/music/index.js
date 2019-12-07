import { classicBehavior } from '../classic-behavior.js'
let mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   *引入行为 
   */
  behaviors: [classicBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String
    },
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
    playUrl: './images/player@play.png',
    pauseUrl: './images/player@pause.png'
  },

  attached() {
    this._recoverPlaying()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay (event) {
      if (!this.data.isPlay) {
        this.setData({
          isPlay: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
        mMgr.play()
      } else {
        this.setData({
          isPlay: false
        })
        mMgr.pause()
      }
    },
    // 设置播放状态
    _recoverPlaying () {
      if (mMgr.src == this.properties.src) {
        this.setData ({
          isPlay: true
        })
      } 
    },

      //控制面板
  _monitorSwitch () {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this.setData({
          isPlay: false
        })
      })
      mMgr.onStop(() => {
        this.setData({
          isPlay: false
        })
      }),
        mMgr.onEnded(() => {
          this.setData({
            isPlay: false
          })
        })
    }
  },
})

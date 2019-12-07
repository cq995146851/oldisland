// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImgUrl: 'images/like.png',
    disLikeImgUrl: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLikeTap (event) {
      if (this.properties.readOnly)
        return false
      let count = this.properties.count
      let like = this.properties.like
      let currCount = like ? count - 1 : count + 1
      this.setData({
        count: currCount,
        like: !like
      })
      let behavior = like ? 'cancel' : 'like' 
      this.triggerEvent('like', {behavior: behavior}, {})
    }
  }
})

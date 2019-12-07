// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    isLatest: {
      type: Boolean,
      value: true
    },
    isFirst: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lImgUrl: './images/triangle@left.png',
    rImgUrl: './images/triangle@right.png',
    lDisImgUrl: './images/triangle.dis@left.png',
    rDisImgUrl: './images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeftTap (event) {
      if (!this.properties.isLatest) {
        this.triggerEvent('previous')
      }
    },
    onRightTap (event) {
      if (!this.properties.isFirst) {
        this.triggerEvent('next')
      }
    }
  }
})

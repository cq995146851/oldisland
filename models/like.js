import { Base } from '../utils/base.js'

class LikeModel extends Base {
  like (like_or_cancel, art_id, type) {
    this.request({
      url: like_or_cancel == 'like' ? 'like' : 'like/cancel',
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      }
    })
    .then(res => {
      let msg = like_or_cancel == 'like' ? '点赞成功' : '取消成功'
      this.showToast(msg)
    })
  }

  getClassicLikeStatus(cid, type) {
    var params = {
      url: 'classic/' + type + '/' + cid + '/favor'
    }
    return this.request(params)
  }
}

export { LikeModel}
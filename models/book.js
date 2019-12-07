import { Base } from '../utils/base.js'

class BookModel extends Base {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getDetail(id) {
      return this.request({
        url: 'book/' + id + '/detail'
      })
  }

  getLikeStatus(id) {
    return this.request({
      url: '/book/' + id + '/favor'
    })
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }

  getByWord(word, start = 0) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: word,
        start
      }
    })
  }
}

export { BookModel }


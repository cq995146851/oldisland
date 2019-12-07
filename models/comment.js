import { Base } from '../utils/base.js'

class CommentModel extends Base {
  getComment(id) {
    return this.request({
      url: 'book/' + id + '/short_comment'
    })
  }

  postComment(id, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: id,
        content: comment
      }
    })
  }
}

export { CommentModel }
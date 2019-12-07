import { Base } from '../utils/base.js'

class MyModel extends Base {
  getMyFavCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }

  getMyClassics() {
    return this.request({
      url: 'classic/favor'
    })
  }
}

export { MyModel }
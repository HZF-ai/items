import { makeAutoObservable } from 'mobx'
class SetDate{
    id: string = '';
    title: string = '';
    price: string = '';
    cover: string = '';
    limit: string = '';
    setId(id: string) {
    this.id = id;                                       
  }
  setTitle(title: string) {
    this.title = title
  }
  setPrice(price: string) {
    this.price = price
  }
  setCover(cover: string) {
    this.cover = cover
  }
  setLimit(limit: string) {
    this.limit = limit
  }
    constructor() {
        makeAutoObservable(this)
      }
}
export default new SetDate()

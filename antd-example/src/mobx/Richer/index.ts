import { makeAutoObservable } from 'mobx'

class Richer {
    nickname : string = ''
    worth : number = null
    avatar : string = '/'

    setNickname(str:string){
        this.nickname = str
    }

    setWorth(num:number){
        this.worth = num
    }

    setAvatar(str:string){
        this.avatar = str
    }
    constructor() {
        makeAutoObservable(this)
    }
}

export default new Richer()

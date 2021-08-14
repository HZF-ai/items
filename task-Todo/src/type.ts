export interface iTodo {
    content: string;
    finished: boolean;
}

export class todoObj implements iTodo {
    content: string;
    finished: boolean;
    //el: HTMLElement

    //重写JSON序列化
    toJSON(){
        return {
            content: this.content,
            finished: this.finished
        }
    }
    constructor(obj: iTodo) {
        this.content = obj.content;
        this.finished = obj.finished;
        //this.el = null;
    }
}
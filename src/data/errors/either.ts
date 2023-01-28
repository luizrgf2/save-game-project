
export class Left<L>{
    
    left:L
    right:undefined

    constructor(value:L){
        this.left = value
    }

    static create<L>(value:L){
        return new Left(value)
    }
}

export class Right<R>{
    left:undefined
    right:R

    constructor(value:R){
        this.right = value
    }

    static create<R>(value:R){
        return new Right(value)
    }
}

export type Either <L,R> = Left<L>|Right<R>
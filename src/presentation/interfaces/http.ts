export interface HTTPResponse<T=any,E=any>{
    body?:T,
    error?:E
    status:number
}

export interface HTTPRequest<T=any>{
    body?:T,
}
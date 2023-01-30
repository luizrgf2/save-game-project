export interface ProviderInterface{
    upload:(filePath:string,gameName:string)=>Promise<Error|undefined>
    delete:(id:string)=>Promise<Error|undefined>
}
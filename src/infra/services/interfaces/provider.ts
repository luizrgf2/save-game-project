import fs from 'fs'

export interface ProviderInterface{
    upload:(filePath:string,gameName:string)=>Promise<Error|undefined>
    delete:(id:string)=>Promise<Error|undefined>
    download:(id:string)=>Promise<Error|fs.WriteStream>
}
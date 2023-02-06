import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";

export interface compressRes{
    directoryOfCompressFile:string
}

export interface CompressInterface{
    compress:(directory:string)=>Promise<Either<ErrorBase,compressRes>>
}
import { Either, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { CompressInterface, compressRes } from "../../data/interfaces/comporessfolder";

export class ComporessFake implements CompressInterface{
    async compress (directory: string) : Promise<Either<ErrorBase, compressRes>>{
        return Right.create({directoryOfCompressFile:"/src/file.zip"})
    }

}
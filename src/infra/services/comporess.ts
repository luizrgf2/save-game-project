import { Either, Left, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { CompressInterface, compressRes } from "../../data/interfaces/comporessfolder";
import { zip } from "zip-a-folder";


export class Comporess implements CompressInterface{
    async compress (directory: string) : Promise<Either<ErrorBase, compressRes>>{
        const fileZipped = await zip(directory,"./gameSave.zip")
        if(fileZipped instanceof Error) return Left.create(new ErrorBase(fileZipped.message,400))
        return Right.create({directoryOfCompressFile:"./gameSave.zip"})
    }

}
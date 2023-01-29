import { GameSaveProps } from "../../../app/entities/gameSave";
import { Either } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";
import { Replacer } from "../../helpers/replace";
import { GameSaveInterface } from "../gameSave";





export interface gameSaveRepositoryImp{
    create:(gameSave:Replacer<GameSaveInterface,{id?:string,createdAt?:Date,updatedAt?:Date}>)=>Promise<Either<ErrorBase,GameSaveInterface>>
    removeByGameName:(gameName:string)=>Promise<Either<ErrorBase,void>>
    deleteByGameName:(gameName:string)=>Promise<Either<ErrorBase,void>>
    getAll:() => Promise<Either<ErrorBase,GameSaveInterface[]>>
}
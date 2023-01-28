import { GameSaveProps } from "../../../app/entities/gameSave";
import { Either } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";
import { Replacer } from "../../helpers/replace";
import { GameSaveInterface } from "../gameSave";





export interface gameSaveRepositoryImp{
    create:(gameSave:Replacer<GameSaveInterface,{id?:string,createdAt?:Date,updatedAt?:Date}>)=>Promise<Either<ErrorBase,GameSaveInterface>>
}
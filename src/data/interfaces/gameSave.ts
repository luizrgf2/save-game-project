import { GameSaveProps } from "../../app/entities/gameSave";

export interface GameSaveInterface extends Omit<GameSaveProps,"id">{
    id:string
}
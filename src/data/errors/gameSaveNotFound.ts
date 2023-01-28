import { ErrorBase } from "./errorBase";

export class GameSaveNotFoundError extends ErrorBase{
    constructor(){
        super("Game save não foi encontrado!",404)
    }
}
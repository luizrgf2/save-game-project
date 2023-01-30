import { InvalidDirectoryGameError } from "../errors/invalidDirectoryGame"
import { InvalidGameNameError } from "../errors/invalidGameName"
import { InvalidProviderError } from "../errors/invalidProvider"



export interface GameSaveProps{
    id?:string,
    updatedAt:Date,
    nameGame:string,
    createdAt:Date,
    directorySaveGame:string,
    provider:"drive"|"onedrive"
    idProvider?:string

}

export interface gameSavePropsToCreate extends Omit<GameSaveProps,"createdAt"|"updatedAt">{
    createdAt?:Date,
    updatedAt?:Date
}

export class GameSaveEntity{

    private props:GameSaveProps

    constructor(props:gameSavePropsToCreate){
        this.props = {
            ...props,
            createdAt:props.createdAt === undefined ? new Date():props.createdAt,
            updatedAt:props.updatedAt === undefined ? new Date():props.updatedAt
            
        }
    }

    static createWithValidations(props:gameSavePropsToCreate){
        const gameSave = new GameSaveEntity({
            directorySaveGame:props.directorySaveGame,
            nameGame:props.nameGame,
            provider:props.provider
        })

        if(!gameSave.isValidDirecotory()) return new InvalidDirectoryGameError()
        if(!gameSave.isValidNameGame()) return new InvalidGameNameError()
        if(!gameSave.isValidProvider()) return new InvalidProviderError()

        return gameSave
    }

    get nameGame():string{
        return this.props.nameGame
    }

    set nameGame(name:string){
        this.props.nameGame = name
    }

    get directorySaveGame():string{
        return this.props.directorySaveGame
    }

    set directorySaveGame(direcotry:string){
        this.props.directorySaveGame = direcotry
    }

    get createdAt():Date{
        return this.props.createdAt
    }

    get updatedAt():Date{
        return this.props.updatedAt
    }


    isValidNameGame():boolean{
        const isValid = (this.props.nameGame.length < 4 || this.props.nameGame.length > 200) ? false : true
        return isValid
    }

    isValidDirecotory():boolean{
        const isValid = (this.props.directorySaveGame.length < 0 || this.props.directorySaveGame.length > 300)  ? false : true
        return isValid
    }

    isValidProvider():boolean{
        const isValid = (this.props.provider !== "drive" && this.props.provider !== "onedrive") ? false : true
        return isValid
    }

}
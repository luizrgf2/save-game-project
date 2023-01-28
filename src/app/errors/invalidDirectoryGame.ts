export class InvalidDirectoryGameError extends Error{
    constructor(){
        super("Diretório do game nãe é valido, deve ter de 1 a 300 caracteres!")
    }
}
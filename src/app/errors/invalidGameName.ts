export class InvalidGameNameError extends Error{
    constructor(){
        super("Nome do game inválido, deve ter entre 4 e 200 caracteres!")
    }
}
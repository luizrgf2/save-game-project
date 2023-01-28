export class InvalidProviderError extends Error{
    constructor(){
        super("O provider que foi informado não é válido!")
    }
}
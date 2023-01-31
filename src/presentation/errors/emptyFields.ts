export class EmptyFieldsError extends Error{
    constructor(){
        super("Os campos não podem estar vazios!")
    }
}
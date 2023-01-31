import { ErrorBase } from "./errorBase";

export class OutputFolderNotExistsError extends ErrorBase{
    constructor(){
        super("A pasta para salvar os arquivos de save não existe!",422)
    }
}
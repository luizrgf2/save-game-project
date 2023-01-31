import { HTTPRequest } from "./http";


export interface ControllerImp<>{
    exec:(req:HTTPRequest) =>Promise<HTTPRequest>
}
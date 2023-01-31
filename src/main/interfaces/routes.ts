import { ControllerImp } from "../../presentation/interfaces/controller"

export interface RouteInterface{
    endpoint:string
    controller:ControllerImp,
    method:"GET"|"POST"|"DELETE"|"PUT"
}

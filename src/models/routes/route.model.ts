import { HeaderModel } from './header.model';
import { ParameterModel } from './parameter.model';
import { ResponseModel } from './reponse.model';

export class RouteModel {
    _id: string;
    ProjectId: string;
    IsProtected = false;
    Method: string;
    Path: string;
    Description: string;
    Headers: HeaderModel[] = [];
    Parameters: ParameterModel[] = [];
    ParametersRaw: string;
    ResponseExample: string;
    Responses: ResponseModel[] = [];
}

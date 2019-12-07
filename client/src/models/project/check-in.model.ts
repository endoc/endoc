import { RouteModel } from '../routes/route.model';
import { ProjectModel } from './project.model';

export class CheckInModel {
    _id: string;
    ProjectId: string;
    Title: string;
    Project: ProjectModel;
    Endpoints: RouteModel[];
    CheckInDate: Date;
}

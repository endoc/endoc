
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

// This class is meand to be a communication service
  // between different components
@Injectable({ providedIn: 'root'})
export class CommunicationService {
    // On Endpoint item added
    private endpointListChanged = new Subject<any>();
    endpointListChanged$ = this.endpointListChanged.asObservable();
    newEndpointSaved(endpointId: string) {
        this.endpointListChanged.next(endpointId);
    }

}

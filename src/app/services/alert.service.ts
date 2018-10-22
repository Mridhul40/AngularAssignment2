import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();  //subject can emit data, on top of having the capability to be subscribed to
    private keepAfterNavigationChange = false;
  constructor(private router: Router) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
            
              this.keepAfterNavigationChange = false;
          } else {
              this.subject.next(); // clear the alert 
              //A regular observable does not have the next() method as regular observables are not observers
          }
      }
  });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
}

error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}
}

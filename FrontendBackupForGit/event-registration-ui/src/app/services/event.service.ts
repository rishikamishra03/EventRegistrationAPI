import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://localhost:7077/api/Events';

  // Subject to notify when events change
  private eventsChanged = new Subject<void>();

  // Observable that components can subscribe to
  eventsChanged$ = this.eventsChanged.asObservable();

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  registerParticipant(eventId: number, participant: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/register`, participant);
  }

  // Notify listeners when events list should refresh
  notifyEventsChanged() {
    this.eventsChanged.next();
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: any[] = [];

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Initial load
    this.loadEvents();

    // Subscribe to changes from the service
    this.eventService.eventsChanged$.subscribe(() => {
      this.loadEvents();
    });
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.events = data;
        this.cdr.detectChanges();  // IMPORTANT: make sure Angular updates the UI
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }
}
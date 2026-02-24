import { Component } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-register',
  standalone: false,   // 👈 Add this
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent {

  eventId!: number;
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private eventService: EventService) { }

  registerParticipant() {
    const participant = {
      name: this.name,
      email: this.email
    };

    this.eventService.registerParticipant(this.eventId, participant).subscribe(
      response => {
        this.message = 'Registration successful!';
        // Notify others that events list changed
        this.eventService.notifyEventsChanged();
      },
      err => {
        this.message = 'Registration failed: ' + (err.error?.message || err.statusText);
      }
    );
  }
}
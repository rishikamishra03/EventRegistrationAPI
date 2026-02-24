using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using EventRegistrationAPI.Models;

namespace EventRegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private static List<Event> events = new List<Event>();
        private static int eventIdCounter = 1;
        private static int participantIdCounter = 1;

        [HttpPost]
        public IActionResult CreateEvent(Event newEvent)
        {
            newEvent.Id = eventIdCounter++;
            events.Add(newEvent);
            return Ok(newEvent);
        }

        [HttpGet]
        public IActionResult GetAllEvents()
        {
            return Ok(events);
        }

        [HttpPost("{eventId}/register")]
        public IActionResult RegisterParticipant(int eventId, Participant participant)
        {
            var ev = events.FirstOrDefault(e => e.Id == eventId);

            if (ev == null)
            {
                // ❌ Correct JSON for 404 Not Found
                return NotFound(new { message = "Event not found" });
            }

            // Check available seats
            if (ev.Participants.Count >= ev.MaxSeats)
            {
                // ❌ BadRequest with JSON error message
                return BadRequest(new { message = "Seats are full" });
            }

            // Add participant
            participant.Id = participantIdCounter++;
            ev.Participants.Add(participant);

            // ✔ Success — return updated event + message
            return Ok(new { message = "Registration successful", eventData = ev });
        }
    }
}
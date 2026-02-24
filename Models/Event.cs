using System;
using System.Collections.Generic;

namespace EventRegistrationAPI.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime EventDate { get; set; }

        public int MaxSeats { get; set; }

        public List<Participant> Participants { get; set; } = new List<Participant>();
    }
}
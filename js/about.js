// Selects all timeline events
const timelineEvents = document.querySelectorAll(".timeline-event");

// Adding event listeners to each event "h3"
timelineEvents.forEach((event) => {
  const eventHeader = event.querySelector("h3");

  eventHeader.addEventListener("click", function () {
    // toggles the 'active' class to show/hide the content
    event.classList.toggle("active");
  });
});

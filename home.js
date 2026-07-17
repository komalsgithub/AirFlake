
// Add viewport meta tag based on screen width (runs once on DOM loaded)
window.addEventListener("DOMContentLoaded", function () {
  const width = window.innerWidth;
  let meta = document.createElement("meta");
  meta.name = "viewport";

  if (width <= 600) {
    // 📱 Phone
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1.25, minimum-scale=1, user-scalable=yes";
  } else if (width <= 1024) {
    // 📱 Tablet
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1.5, minimum-scale=1, user-scalable=yes";
  } else {
    // 💻 Desktop
    meta.content = "width=device-width, initial-scale=1";
  }

  document.head.appendChild(meta);
});

// Clock that updates every second
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  // Add leading zero to minutes
  const minsStr = minutes < 10 ? "0" + minutes : minutes;

  // Display the time
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    clockEl.textContent = `${hours}:${minsStr} ${ampm}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

// Greeting based on current hour
const greetingElement = document.getElementById("greeting");
const hour = new Date().getHours();

let greetingText = "Hello";

if (hour >= 22 || hour < 5) {
  greetingText = "Good Night 🌙";
} else if (hour >= 5 && hour < 12) {
  greetingText = "Good Morning";
} else if (hour >= 12 && hour < 17) {
  greetingText = "Good Afternoon";
} else {
  greetingText = "Good Evening";
}

if (greetingElement) {
  greetingElement.textContent = greetingText;
}

// Random quote in card4
const quotes = [
  "Believe you can and you're halfway there.",
  "Do one thing every day that scares you.",
  "Dream big. Start small. Act now.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
const quoteEl = document.getElementById("daily-quote");
if (quoteEl) {
  quoteEl.textContent = randomQuote;
}

// Feelings buttons select handler (single definition)
function selectFeeling(button) {
  const buttons = document.querySelectorAll(".feel-btn");

  buttons.forEach((btn) => {
    if (btn !== button) {
      btn.classList.add("hidden"); // Hide unselected
      btn.classList.remove("selected");
    }
  });

  button.classList.add("selected");
  button.classList.remove("hidden");

  // Show popup circle if "Low" clicked
  if (button.innerText.includes("Low")) {
    const popupCircle = document.getElementById("popup-circle");
    if (popupCircle) {
      popupCircle.style.display = "block";
    }
  }
}

// Popup circle click redirect
const popupCircle = document.getElementById("popup-circle");
if (popupCircle) {
  popupCircle.addEventListener("click", function () {
    window.location.href = "vault.html";
  });
}

// Calendar update every minute
function updateCalendar() {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const now = new Date();

  const dayEl = document.getElementById("day");
  const dateEl = document.getElementById("date");
  const yearEl = document.getElementById("year");

  if (dayEl) dayEl.innerText = dayNames[now.getDay()];
  if (dateEl) dateEl.innerText = `${monthNames[now.getMonth()]} ${now.getDate()}`;
  if (yearEl) yearEl.innerText = now.getFullYear();
}

updateCalendar();
setInterval(updateCalendar, 60000);

// Bubble animations and interaction
const bubbles = document.querySelectorAll(".bubble");

// Load pop sound once
const popSound = new Audio("579206__varlamovk__pop-fx.wav");

function placeRandomly(el) {
  const x = Math.random() * (window.innerWidth - 80);
  const y = Math.random() * (window.innerHeight - 80);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

// Function to animate burst and respawn bubble
function burstBubble(bubble) {
  // Play sound
  popSound.currentTime = 0;
  popSound.play();

  // Animate burst
  bubble.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  bubble.style.transform = "scale(1.3)";
  bubble.style.opacity = "0";

  // After animation, hide and respawn after delay
  setTimeout(() => {
    bubble.style.transition = "";
    bubble.style.transform = "scale(1)";
    bubble.style.opacity = "1";

    placeRandomly(bubble);
    bubble.style.display = "flex";
  }, 300);

  bubble.style.display = "none";
}

// Initialize bubbles and add click listeners
bubbles.forEach((bubble) => {
  placeRandomly(bubble);

  bubble.addEventListener("click", () => {
    burstBubble(bubble);
  });
});

// Play pop sound on bubble click (optional fallback)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("bubble")) {
    popSound.currentTime = 0;
    popSound.play();
  }
});

function goToPage() {
  window.location.href = "https://youtube.com";
}

// Skip button redirect
const skipBtn = document.getElementById("skipBtn");
if (skipBtn) {
  skipBtn.addEventListener("click", () => {
    window.location.href = "tasks.html";
  });
}

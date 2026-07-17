const focusInput = document.getElementById("focusInput");

  function saveFocusTask() {
    // Get task title
    const task = document.getElementById("focusInput").value;
     focusInput.classList.add("saved");

    // Get timer values
    const hours = document.getElementById("hours").textContent;
    const minutes = document.getElementById("minutes").textContent;
    const seconds = document.getElementById("seconds").textContent;

    // Save all to localStorage
    localStorage.setItem("focusTask", task);
    localStorage.setItem("focusTimer", `${hours}:${minutes}:${seconds}`);

    alert("Task and timer saved!");
  }

  // Optional: Load saved data on page load
  window.onload = function () {
    const savedTask = localStorage.getItem("focusTask");
    const savedTimer = localStorage.getItem("focusTimer");

    if (savedTask) document.getElementById("focusInput").value = savedTask;
    if (savedTimer) {
      const [h, m, s] = savedTimer.split(":");
      document.getElementById("hours").textContent = h;
      document.getElementById("minutes").textContent = m;
      document.getElementById("seconds").textContent = s;
       focusInput.classList.add("saved");
    }
  };


let hours = 0;
let minutes = 30;
let seconds = 0;
let breakMinutes = 0;

const format = (num) => String(num).padStart(2, "0");

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const breakEl = document.getElementById("break-minutes");

// Hours scroll
hoursEl.addEventListener("wheel", (e) => {
  e.preventDefault();
  hours += e.deltaY < 0 ? 1 : -1;
  if (hours < 0) hours = 0;
  hoursEl.textContent = format(hours);
});

// Minutes scroll
minutesEl.addEventListener("wheel", (e) => {
  e.preventDefault();
  minutes += e.deltaY < 0 ? 1 : -1;
  if (minutes < 0) minutes = 59;
  if (minutes > 59) minutes = 0;
  minutesEl.textContent = format(minutes);
});

// Seconds scroll
secondsEl.addEventListener("wheel", (e) => {
  e.preventDefault();
  seconds += e.deltaY < 0 ? 1 : -1;
  if (seconds < 0) seconds = 59;
  if (seconds > 59) seconds = 0;
  secondsEl.textContent = format(seconds);
});

document.getElementById("break-timer").addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -1 : 1;

  breakMinutes += delta;
  if (breakMinutes < 0) breakMinutes = 0;
  if (breakMinutes > 60) breakMinutes = 60;

  breakEl.textContent = breakMinutes;
});

//local storage for music
let isPlaying = false;

  function toggleMusic() {
    const music = document.getElementById("focusMusic");
    const button = document.getElementById("musicBtn");

    if (!isPlaying) {
      music.play();
      button.textContent = "⏸️ Pause Music";
      isPlaying = true;
    } else {
      music.pause();
      button.textContent = "🎵 Play Music";
      isPlaying = false;
    }
  }


  function toggleMusic() {
    const music = document.getElementById("focusMusic");
    const btn = document.getElementById("musicBtn");

    if (!isPlaying) {
      music.play();
      btn.textContent = "⏸️"; // Pause icon
      isPlaying = true;
    } else {
      music.pause();
      btn.textContent = "▶️"; // Play icon
      isPlaying = false;
    }
  }

//quote
    function openVault() {
      // go to vault
      window.location.href = "vault.html";
    }

    window.onload = function () {
      // get ?quote=... from URL
      const params = new URLSearchParams(window.location.search);
      const quote = params.get("quote");

      if (quote) {
        // Replace <h2> text with quote
        document.getElementById("quoteText").innerText = decodeURIComponent(quote);
      }
    };

    //enviroment
      // Run after DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn1, .btn2, .btn3");
      clearLeafAnimations(); // ✅ remove leaves if switching from Nature

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove 'selected-button' from all
        buttons.forEach((b) => b.classList.remove("selected-button"));

        // Add to the clicked one
        btn.classList.add("selected-button");
      });
    });
  });

    function applySilentMode() {
        clearLeafAnimations(); // ✅ remove leaves
    const topCard = document.querySelector(".top-card");
    const bottomCard = document.querySelector(".bottom-card");

    // Remove other modes if needed
    topCard.classList.remove("nature-bg", "paper-bg");
    bottomCard.classList.remove("nature-bg", "paper-bg");

    // Apply Silent mode
    topCard.classList.add("silent-bg");
    bottomCard.classList.add("silent-bg");
  }

  function applyNatureMode() {
  const topCard = document.querySelector(".top-card");
  const bottomCard = document.querySelector(".bottom-card");

  // ✅ Remove other mode classes
  topCard.classList.remove("silent-bg", "paper-bg");
  bottomCard.classList.remove("silent-bg", "paper-bg");

  // ✅ Apply Nature mode backgrounds only
  topCard.classList.add("nature-bg");
  bottomCard.classList.add("nature-bg");

  // ✅ Remove any existing leaves from previous click
  document.querySelectorAll('.leaf').forEach(el => el.remove());

  // ✅ Only add leaves to bottomCard
  for (let i = 0; i < 6; i++) {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.animationDelay = Math.random() * 5 + "s";
    bottomCard.appendChild(leaf); // ✅ only on bottomCard
  }
}
function clearLeafAnimations() {
  document.querySelectorAll('.leaf').forEach(el => el.remove());
}


// start button
  function saveFocusTask() {
  // Hide unnecessary elements
  document.getElementById("quoteCard")?.classList.add("hidden");
  document.getElementById("environmentContainer")?.classList.add("hidden");
  document.getElementById("musicPlayer")?.classList.add("hidden");
  document.getElementById("breakTimer")?.classList.add("hidden");
  document.querySelector(".start-button")?.classList.add("hidden");

}

// timer
   let totalSeconds;
    let currentSeconds;
    let interval;
    let chart;

    function updateTimerDisplay() {
      let hrs = Math.floor(currentSeconds / 3600);
      let mins = Math.floor((currentSeconds % 3600) / 60);
      let secs = currentSeconds % 60;

      document.getElementById('hours').textContent = String(hrs).padStart(2, '0');
      document.getElementById('minutes').textContent = String(mins).padStart(2, '0');
      document.getElementById('seconds').textContent = String(secs).padStart(2, '0');
    }

    function updateChart() {
      const remaining = currentSeconds;
      const completed = totalSeconds - currentSeconds;
      chart.data.datasets[0].data = [completed, remaining];
      chart.update();
    }

    function saveFocusTask() {
      const minutes = parseInt(document.getElementById('minutes').textContent);
      const hours = parseInt(document.getElementById('hours').textContent);
      totalSeconds = (hours * 60 + minutes) * 60;
      currentSeconds = totalSeconds;

      if (chart) chart.destroy();
      const ctx = document.getElementById('timeChart');
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [0, totalSeconds],
            backgroundColor: ['#4caf50', '#eee'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            legend: { display: false }
          }
        }
      });

      interval = setInterval(() => {
        if (currentSeconds > 0) {
          currentSeconds--;
          updateTimerDisplay();
          updateChart();
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    
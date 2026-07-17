//zoom in and out prevent
window.addEventListener("keydown", function (e) {
  // For zoom shortcuts with Ctrl or Meta (Cmd)
  if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")) {
    e.preventDefault();
  }

  // For Shift + "+" which is Shift + "=" key
  if (e.shiftKey && e.key === "=") {
    e.preventDefault();
  }
});

window.addEventListener("wheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });


//conatiner

const input = document.getElementById("myInput");

// On desktop: Enter key
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
     event.preventDefault(); 
    input.classList.add("entered");
    // 👇 Removed readOnly and blur — user can keep editing
  }
});

// On mobile: fallback for when "Next" or done is pressed
input.addEventListener("blur", () => {
  if (input.value.trim() !== "") {
    input.classList.add("entered");
  }
});

//priority
const basicBtn = document.querySelector(".basic-priority");
const highBtn = document.querySelector(".high-priority");

basicBtn.addEventListener("click", () => {
  basicBtn.classList.toggle("selected");
  highBtn.classList.remove("selected");
});

highBtn.addEventListener("click", () => {
  highBtn.classList.toggle("selected");
  basicBtn.classList.remove("selected");
});

//card Timer
let selectedGoalTime = 0;

document.querySelectorAll(".time-option").forEach((option) => {
  option.addEventListener("click", () => {
    // Remove 'active' class from all
    document
      .querySelectorAll(".time-option")
      .forEach((el) => el.classList.remove("selected"));

    // Add 'active' to clicked one
    option.classList.add("selected");

    // Store selected time (in minutes)
    selectedGoalTime = parseInt(option.getAttribute("data-minutes"));
    console.log("Selected Time:", selectedGoalTime, "minutes");

    // You'll use `selectedGoalTime` in your focus mode later
  });
});

//Calender days selection
const dayButtons = document.querySelectorAll(".day-circle:not(.all)");
const selectAllBtn = document.getElementById("select-all");

selectAllBtn.addEventListener("click", () => {
  const allSelected = selectAllBtn.classList.contains("selected");

  if (allSelected) {
    // Deselect all
    dayButtons.forEach((btn) => btn.classList.remove("selected"));
    selectAllBtn.classList.remove("selected");
  } else {
    // Select all
    dayButtons.forEach((btn) => btn.classList.add("selected"));
    selectAllBtn.classList.add("selected");
  }
});

dayButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");

    // If all days are selected, activate "All"
    const allAreSelected = Array.from(dayButtons).every((day) =>
      day.classList.contains("selected")
    );
    if (allAreSelected) {
      selectAllBtn.classList.add("selected");
    } else {
      selectAllBtn.classList.remove("selected");
    }
  });
});

//deadline card
const monthYear = document.getElementById("month-year");
const dateGrid = document.getElementById("date-grid");
const countdownDisplay = document.getElementById("countdown");

let currentDate = new Date();
let selectedDate = null;

function renderCalendar(date) {
  date.setDate(1);
  const month = date.getMonth();
  const year = date.getFullYear();
  monthYear.textContent = `${date.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  dateGrid.innerHTML = "";

  // Blank days before start
  for (let i = 0; i < startDay; i++) {
    const blank = document.createElement("div");
    dateGrid.appendChild(blank);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    dayDiv.addEventListener("click", () => {
      selectedDate = new Date(year, month, day, 0, 0, 0);
      updateCountdown();
      document
        .querySelectorAll(".date-grid div")
        .forEach((d) => d.classList.remove("selected"));
      dayDiv.classList.add("selected");
    });

    dateGrid.appendChild(dayDiv);
  }
}

document.getElementById("prev-month").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

document.getElementById("next-month").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

function updateCountdown() {
  if (!selectedDate) return (countdownDisplay.textContent = "--");

  const now = new Date();
  const diff = selectedDate - now;

  if (diff <= 0) {
    countdownDisplay.textContent = "Deadline passed!";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdownDisplay.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

// Live countdown
setInterval(updateCountdown, 1000);

// Init calendar
renderCalendar(currentDate);

//Description box
const descriptionBox = document.getElementById("descriptionBox");
const saveBtn = document.getElementById("saveBtn");
let isSaved = false;

saveBtn.addEventListener("click", () => {
  if (!isSaved) {
    descriptionBox.classList.add("saved");
    descriptionBox.setAttribute("readonly", true);
    saveBtn.textContent = "Edit";
    isSaved = true;
  } else {
    descriptionBox.classList.remove("saved");
    descriptionBox.removeAttribute("readonly");
    saveBtn.textContent = "Save";
    isSaved = false;
  }
});

//Switch Lock
document.getElementById("lockToggle").addEventListener("change", function () {
  const isLocked = this.checked;

  const goalInput = document.getElementById("myInput");
  const description = document.getElementById("descriptionBox");
  const saveBtn = document.getElementById("saveBtn");
  const allTimes = document.querySelectorAll(".time-option");
  const allPriorities = document.querySelectorAll(".high-priority, .basic-priority");
  const allDays = document.querySelectorAll(".day-circle");
  const allDates = document.querySelectorAll(".date-grid div");

  if (isLocked) {
    // Disable inputs & hide save button
    goalInput.setAttribute("disabled", true);
    description.setAttribute("disabled", true);
    saveBtn.style.display = "none";

    // Time options: disable all, blur unselected, highlight selected
    allTimes.forEach((t) => {
      t.style.pointerEvents = "none";  // no clicks
      if (!t.classList.contains("selected")) {
        t.style.opacity = "0.4";  // faded unselected
      } else {
        t.style.opacity = "1";  // full visible selected
      }
    });

    // Priority buttons: disable all, blur unselected, highlight selected
    allPriorities.forEach((p) => {
      p.style.pointerEvents = "none";
      if (!p.classList.contains("selected")) {
        p.style.opacity = "0.4";
      } else {
        p.style.opacity = "1";
      }
    });

    // Days: disable all, blur unselected, highlight selected
    allDays.forEach((d) => {
      d.style.pointerEvents = "none";
      if (!d.classList.contains("selected")) {
        d.style.opacity = "0.4";
      } else {
        d.style.opacity = "1";
      }
    });

    // Dates: disable all, blur unselected, highlight selected
    allDates.forEach((d) => {
      d.style.pointerEvents = "none";
      if (!d.classList.contains("selected")) {
        d.style.opacity = "0.4";
      } else {
        d.style.opacity = "1";
      }
    });

  } else {
    // Unlock everything: enable inputs & show save button
    goalInput.removeAttribute("disabled");
    description.removeAttribute("disabled");
    saveBtn.style.display = "inline-block";

    // Restore all time options: enable and full opacity
    allTimes.forEach((t) => {
      t.style.pointerEvents = "auto";
      t.style.opacity = "1";
    });

    // Restore all priorities: enable and full opacity
    allPriorities.forEach((p) => {
      p.style.pointerEvents = "auto";
      p.style.opacity = "1";
    });

    // Restore all days: enable and full opacity
    allDays.forEach((d) => {
      d.style.pointerEvents = "auto";
      d.style.opacity = "1";
    });

    // Restore all dates: enable and full opacity
    allDates.forEach((d) => {
      d.style.pointerEvents = "auto";
      d.style.opacity = "1";
    });
  }
});


// Function to create a new task
function createTask() {
  const task = document.createElement("div");
  task.className = "task";

  task.innerHTML = `
    <input type="checkbox" class="task-check">
    <input type="text" placeholder="New Task" class="task-input">
    <button class="delete-btn">✕</button>
  `;

  // Checkbox logic
  const checkbox = task.querySelector(".task-check");
  checkbox.addEventListener("change", () => {
    task.classList.toggle("checked", checkbox.checked);
  });

  // Delete logic
  task.querySelector(".delete-btn").addEventListener("click", () => {
    todoContainer.removeChild(task);
  });

  // Enter key logic on text input
  const inputField = task.querySelector(".task-input");
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      createTask(); // Add a new task when Enter is pressed
    }
  });

  todoContainer.appendChild(task);
  inputField.focus(); // Automatically focus the new input
}

// When addTask button is clicked
addTaskBtn.addEventListener("click", createTask);

// Optionally: Create one task on page load
createTask();






  

export let index = "all";
export let directoryID = "all";

function switchdirectory() {
  document.getElementById("today").addEventListener("click", function () {
    index = "today";
    directoryID = "Today";
    sortByDay();
    changeDirectoryText();
    makeCurrentDirectory();
  });

  document.getElementById("week").addEventListener("click", function () {
    index = "tomorrow";
    directoryID = "This Week";
    sortByWeek();
    changeDirectoryText();
    makeCurrentDirectory();
  });

  document.getElementById("important").addEventListener("click", function () {
    index = "important";
    directoryID = "Important";
    sortByImportant();
    changeDirectoryText();
    makeCurrentDirectory();
  });

  document.getElementById("completed").addEventListener("click", function () {
    index = "completed";
    directoryID = "Completed";
    sortByComplete();
    changeDirectoryText();
    makeCurrentDirectory();
  });

  document.getElementById("all").addEventListener("click", function () {
    index = "all";
    directoryID = "All Notes";
    showAll();
    changeDirectoryText();
    makeCurrentDirectory();
  });
}

export function hideItems() {
  const elements = document.getElementsByClassName("card");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.classList.contains(index)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}

export function sortByDay() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let elements = document.querySelectorAll("[data-date]");

  currentDate = year + "-" + month + "-" + day;


  elements.forEach(function (element) {
    let dateValue = element.getAttribute("data-date");
    let closestCard = element.closest(".card");

    if (dateValue == currentDate) {
      closestCard.style.display = "";
    } else {
      closestCard.style.display = "none";
    }
  });
}

export function sortByWeek() {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let elements = document.querySelectorAll("[data-date]");

  elements.forEach(function (element) {
    let dateValue = new Date(element.getAttribute("data-date"));
    dateValue.setHours(0, 0, 0, 0);

    let closestCard = element.closest(".card");
    let timeDiff = Math.abs(dateValue - currentDate);
    let diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays <= 6) {
      closestCard.style.display = "";
    } else {
      closestCard.style.display = "none";
    }
  });
}

function sortByComplete() {
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    let projectAttribute = card.getAttribute("data-complete");

    if (projectAttribute === "true") {
      projectAttribute = true;
    } else if (projectAttribute === "false") {
      projectAttribute = false;
    }

    if (projectAttribute == true) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
}

function sortByImportant() {
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    let projectAttribute = card.getAttribute("data-important");

    if (projectAttribute === "true") {
      projectAttribute = true;
    } else if (projectAttribute === "false") {
      projectAttribute = false;
    }

    if (projectAttribute == true) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
}

export function makeCurrentDirectory() {
  event.target.classList.add("current");
  const buttons = document.querySelectorAll(".directory");

  buttons.forEach((button) => {
    if (button != event.target) {
      button.classList.remove("current");
    }
  });
}

function showAll() {
  const elements = document.getElementsByClassName("card");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.style.display = "";
  }
}

export function changeDirectoryText() {
  const indexID = document.getElementById("which-directory");
  indexID.innerHTML = directoryID;
}

export default switchdirectory;

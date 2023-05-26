import { myLibrary } from "./myLibraryObject";

///TODO: this needs to be different.
export let index = "all";

//TODO: TODAY AND TOMORROW DIRECTORIES NEED TO FILTER BY DATE NOT BY STRING

function switchdirectory() {
  document.getElementById("today").addEventListener("click", function () {
    index = "today";
    // hideItems();
    sortByDay();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("week").addEventListener("click", function () {
    index = "tomorrow";
    // hideItems();
    sortByWeek();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("important").addEventListener("click", function () {
    index = "important";
    hideItems();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("completed").addEventListener("click", function () {
    index = "completed";
    hideItems();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("all").addEventListener("click", function () {
    index = "all";
    showAll();
    makeCurrentDirectory();
    console.log(index);
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
  currentDate = year + "-" + month + "-" + day;

  console.log(`CURRENT DATE: ${currentDate}`);

  let elements = document.querySelectorAll("[data-date]");
  console.log(elements);

  elements.forEach(function (element) {
    let dateValue = element.getAttribute("data-date");
    console.log(dateValue);

    let closestCard = element.closest(".card");
    console.log(closestCard);

    if (dateValue == currentDate) {
      closestCard.style.display = "";
    } else {
      closestCard.style.display = "none";
    }
  });
}

export function sortByWeek() {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  let elements = document.querySelectorAll("[data-date]");

  elements.forEach(function (element) {
    let dateValue = new Date(element.getAttribute("data-date"));
    dateValue.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    let closestCard = element.closest(".card");

    // Calculate the time difference in milliseconds
    let timeDiff = Math.abs(dateValue - currentDate);
    // Convert the time difference to days
    let diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Include the current day and the next 6 days
    if (diffDays >= 0 && diffDays <= 6) {
      closestCard.style.display = "";
    } else {
      closestCard.style.display = "none";
    }
  });
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

export default switchdirectory;

import { myLibrary } from "./myLibraryObject";


///TODO: this needs to be different.
export let index = "all";

//TODO: TODAY AND TOMORROW DIRECTORIES NEED TO FILTER BY DATE NOT BY STRING

function switchdirectory() {
  document.getElementById("today").addEventListener("click", function () {
    index = "today";
    hideItems();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("tomorrow").addEventListener("click", function () {
    index = "tomorrow";
    hideItems();
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

// export function newFilterItems() {
//   const elements = myLibrary.getAllObjects();
//   elements.forEach((item) => {
//     if(item.filter.contains(filter)) {
//       item.style.display = "";
//     } else {
//       element.style.display = "none";
//     }
//   });

  // for (let i = 0; i < elements.length; i++) {
  //   const element = elements[i];

  //   if (element.classList.contains(index)) {
  //     element.style.display = "";
  //   } else {
  //     element.style.display = "none";
  //   }
//   // }
// }

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
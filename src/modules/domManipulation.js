import { myLibrary } from "./modalPopulate";
import { libraryDirectories } from "./modalPopulate";
import { index } from "./switchdirectory";

function pushtoDom() {
  const lastObj = myLibrary[index][myLibrary[index].length - 1];
  const notetitle = lastObj.title;
  const notedate = lastObj.date;
  const notedescription = lastObj.description;

  const note = document.createElement("div");
  note.setAttribute("data-titledate", `${lastObj.title}${lastObj.date}`);
  note.setAttribute("data-date", `${lastObj.date}`);
  note.classList.add("card");
  note.classList.add(index);

  note.addEventListener("click", function () {
    // Event handler code
    console.log(`clicked`);
    if (description.style.display != "none") {
      description.style.display = "none";
    } else {
      description.style.display = "";
    }
  });

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = `Title: ${notetitle}`;

  const date = document.createElement("div");
  date.classList.add("date");
  date.innerHTML = `Due: ${notedate}`;

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerHTML = notedescription;
  description.style.display = "none";

  const buttonBox = document.createElement("div");
  const removeBtn = deleteButton(notetitle, notedate);
  buttonBox.classList.add("buttonbox");

  note.appendChild(title);
  note.appendChild(date);
  note.appendChild(description);
  buttonBox.appendChild(removeBtn);
  note.appendChild(buttonBox);

  document.getElementById("main-content").appendChild(note);
}

export default pushtoDom;

function deleteButton(notetitle, notedate, notedescription) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("button");
  removeBtn.classList.add("rmv");
  removeBtn.innerHTML = "X";

  removeBtn.setAttribute("data-title", notetitle);
  removeBtn.setAttribute("data-date", notedate);
  removeBtn.setAttribute("data-desc", notedescription);

  removeBtn.addEventListener("click", (event) => {
    const clickedBtn = event.target;
    const title = clickedBtn.getAttribute("data-title");
    const date = clickedBtn.getAttribute("data-date");
    const desc = clickedBtn.getAttribute("data-desc");
    deleteObjectfromLibrary(title, date);
    removeBtn.closest(".card").remove();
    console.log(myLibrary.getAllObjects());
  });

  return removeBtn;
}

export function pushAllItemstoDom() {
  let init = myLibrary.getAllObjects();

  init.forEach((item) => {
    console.log(item);
    const notetitle = item.title;
    const notedate = item.date;
    const notedescription = item.description;
    const note = document.createElement("div");
    note.classList.add("card");
    note.classList.add(index);
    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML = `Title: ${notetitle}`;
    const date = document.createElement("div");
    date.classList.add("date");
    date.innerHTML = `Due: ${notedate}`;
    const description = document.createElement("div");
    description.classList.add("description");
    description.innerHTML = notedescription;
    description.style.display = "none";

    note.addEventListener("click", function () {
      // Event handler code
      console.log(`clicked`);
      if (description.style.display != "none") {
        description.style.display = "none";
      } else {
        description.style.display = "";
      }
    });

    const buttonBox = document.createElement("div");
    const removeBtn = deleteButton(notetitle, notedate);
    buttonBox.classList.add("buttonbox");
    note.appendChild(title);
    note.appendChild(date);
    note.appendChild(description);
    buttonBox.appendChild(removeBtn);
    note.appendChild(buttonBox);
    document.getElementById("main-content").appendChild(note);
  });
}

function deleteObjectfromLibrary(title, date) {
  for (let key in myLibrary) {
    if (Array.isArray(myLibrary[key])) {
      const index = myLibrary[key].findIndex(
        (item) => item.title == title && item.date == date
      );
      if (index !== -1) {
        myLibrary[key].splice(index, 1);
        return;
      }
    }
  }
}

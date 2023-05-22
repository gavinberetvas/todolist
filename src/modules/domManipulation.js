import { myLibrary } from "./modalPopulate";
import { libraryDirectories } from "./modalPopulate";
import { index } from "./switchdirectory";

const overlay = document.getElementById('overlay');

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
  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = `Title: ${notetitle}`;

  const date = document.createElement("div");
  date.classList.add("date");
  date.innerHTML = `Due: ${notedate}`;

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerHTML = ` ${notedescription}`;
  description.style.display = "none";

  const buttonBox = document.createElement("div");
  const removeBtn = deleteButton(notetitle, notedate, notedescription);
  // const editBtn = editButton(notetitle, notedate, notedescription);
  buttonBox.classList.add("buttonbox");

  note.appendChild(title);
  note.appendChild(date);
  note.appendChild(description);
  // buttonBox.appendChild(editBtn);
  buttonBox.appendChild(removeBtn);
  note.appendChild(buttonBox);

  document.getElementById("main-content").appendChild(note);
}

function deleteButton(notetitle, notedate, notedescription) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("button");
  removeBtn.classList.add("rmv");
  removeBtn.innerHTML = "X";

  removeBtn.setAttribute("data-title", notetitle);
  removeBtn.setAttribute("data-date", notedate);
  removeBtn.setAttribute("data-desc", notedescription);

  removeBtn.addEventListener("click", function (event) {
    const clickedBtn = event.target;
    const item = document.getElementById("overlay");
    const title = clickedBtn.getAttribute("data-title");
    const date = clickedBtn.getAttribute("data-date");
    const desc = clickedBtn.getAttribute("data-desc");
    overlay.classList.remove("active");
  
    // deleteObjectfromLibrary(title, date);
    // overlay.classList.remove("active");
    // removeBtn.closest(".card").remove();
    // console.log(myLibrary.getAllObjects());
    setTimeout(function() {
      deleteObjectfromLibrary(title, date);
      overlay.classList.remove("active");
      removeBtn.closest(".card").remove();
      console.log(myLibrary.getAllObjects());
    }, 100);
  });

  return removeBtn;
}

export function pushAllItemstoDom() {
  let init = myLibrary.getAllObjects();

  init.forEach((item) => {
    console.log(item);
    let notetitle = item.title;
    let notedate = item.date;
    let notedescription = item.description;
    const note = document.createElement("div");

    note.setAttribute("data-titledate", `${notetitle}_${notedate}`);

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

    note.addEventListener("click", function (event) {
        note.classList.add("focus");
        description.style.display = "";
        note.style.zIndex = 10;
        note.style.position = "relative";
        // note.focus();
        overlay.classList.add("active");
        title.contentEditable = true;
        date.contentEditable = true;
        description.contentEditable = true;
        removeBtn.style.display = "";
        overlay.addEventListener("click", function () {


          
          overlay.classList.remove("active");
          note.style.zIndex = 1;
          note.style.position = "relative";
          note.classList.remove("focus");
          description.style.display = "none";
        });
    });

    const buttonBox = document.createElement("div");
    const removeBtn = deleteButton(notetitle, notedate, notedescription);
    removeBtn.style.display = "none"
    // const editBtn = editButton(notetitle, notedate, notedescription);
    buttonBox.classList.add("buttonbox");
    note.appendChild(title);
    note.appendChild(date);
    note.appendChild(description);
    // buttonBox.appendChild(editBtn);
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

export default pushtoDom;

// import { remove } from "lodash";
import { myLibrary } from "./myLibraryObject";
// import { libraryDirectories } from "./modalPopulate";
import { index } from "./switchdirectory";
// import { v4 as uuidv4 } from "uuid";

const overlay = document.getElementById("overlay");

function pushtoDom() {
  const lastObj = myLibrary[index][myLibrary[index].length - 1];
  let notetitle = lastObj.title;
  let notedate = lastObj.date;
  let notedescription = lastObj.description;
  let noteID = lastObj.id;

  const newNote = createElements(notetitle, notedate, notedescription, noteID);
  document.getElementById("main-content").appendChild(newNote);
}

export function pushAllItemstoDom() {
 ///newcode////

  // let storedObject = localStorage.getItem("myLibrary");

  // if (storedObject === null || storedObject === undefined) {
  //   localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  //   storedObject = JSON.stringify(myLibrary);
  // } else {
  //   myLibrary = JSON.parse(storedObject);
  // }
  // /////newcode//////

  let init = myLibrary.getAllObjects();

  init.forEach((item) => {
    console.log(item);
    let notetitle = item.title;
    let notedate = item.date;
    let notedescription = item.description;
    let noteID = item.id;

    const newNote = createElements(
      notetitle,
      notedate,
      notedescription,
      noteID
    );

    document.getElementById("main-content").appendChild(newNote);
  });
}

function createElements(notetitle, notedate, notedescription, noteID) {
  const note = document.createElement("div");

  note.setAttribute("data-id", `${noteID}`);
  note.classList.add("card");

  note.classList.add(index);
  console.log(`INDEX: ${index}`);
  console.log(`NOTEID: ${noteID}`);

  //Testing the following line of code to see if solves the lack of sorting items properly on init
  //it does...but im not entirely sure how.
  note.classList.add(noteID);

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = `${notetitle}`;

  const date = document.createElement("input");
  date.classList.add("date");
  date.type = "date";
  date.value = `${notedate}`;

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerHTML = notedescription;
  description.style.display = "none";

  title.addEventListener("input", function () {
    notetitle = title.innerHTML;
    console.log(notetitle);
  });

  date.addEventListener("input", function () {
    notedate = date.value;
    console.log(notedate);
  });

  description.addEventListener("input", function () {
    notedescription = description.innerHTML;
    console.log(notedescription);
  });

  note.addEventListener("click", function (event) {
    overlay.classList.add("active");

    note.classList.add("focus");
    note.style.zIndex = 10;
    note.style.position = "relative";

    title.contentEditable = true;
    date.disabled = false;
    description.style.display = "";
    description.contentEditable = true;

    removeBtn.style.display = "";

    overlay.addEventListener("click", function () {
      myLibrary.editNote(note, notetitle, notedate, notedescription, noteID);

      overlay.classList.remove("active");
      note.style.zIndex = 1;
      note.style.position = "relative";
      note.classList.remove("focus");
      description.style.display = "none";

      console.log(myLibrary.getAllObjects());
    });
  });

  const buttonBox = document.createElement("div");
  let removeBtn = deleteButton();
  removeBtn.style.display = "none";
  buttonBox.classList.add("buttonbox");
  note.appendChild(title);
  note.appendChild(date);
  note.appendChild(description);
  buttonBox.appendChild(removeBtn);
  note.appendChild(buttonBox);

  return note;
}

function deleteButton() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("button", "rmv");
  removeBtn.innerHTML = "X";

  removeBtn.addEventListener("click", function () {
    setTimeout(function () {
      myLibrary.deleteNote(removeBtn);

      overlay.classList.remove("active");
      removeBtn.closest(".card").remove();
      console.log(myLibrary.getAllObjects());
    }, 100);
  });

  return removeBtn;
}

export default pushtoDom;

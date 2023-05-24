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
  let noteFilter = lastObj.filter;

  const newNote = createElements(
    notetitle,
    notedate,
    notedescription,
    noteID,
    noteFilter
  );
  document.getElementById("main-content").appendChild(newNote);
}

export function pushAllItemstoDom() {
  let init = myLibrary.getAllObjects();
  console.log(myLibrary.getAllObjects());

  init.forEach((item) => {
    console.log(item);
    let notetitle = item.title;
    let notedate = item.date;
    let notedescription = item.description;
    let noteID = item.id;
    let noteFilter = item.filter;

    const newNote = createElements(
      notetitle,
      notedate,
      notedescription,
      noteID,
      noteFilter
    );

    document.getElementById("main-content").appendChild(newNote);
  });
}

function createElements(
  notetitle,
  notedate,
  notedescription,
  noteID,
  noteFilter
) {
  console.log(noteFilter);

  const note = document.createElement("div");

  note.setAttribute("data-id", `${noteID}`);
  note.classList.add("card");

  //this is becoming redundant...
  note.classList.add(index);

  //ok. This works.
  console.log(noteFilter);

  noteFilter.forEach((filter) => {
    note.classList.add(filter);
  });

  console.log(`INDEX: ${index}`);
  console.log(`NOTEID: ${noteID}`);

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

  //TODO: CREATE TWO BUTTONS. ONE TO MARK SOMETHING AS IMPORTANT. ONE TO MARK AS COMPLETE

  //TODO: figure out why this breaks the code: 

  // let checkbox = document.createElement("input");
  // checkbox.type = "checkbox";
  // checkbox.classList.add("circular-checkbox");

// these three lines above break the local storage for some reason?

  const buttonBox = document.createElement("div");
  let removeBtn = deleteButton();
  removeBtn.style.display = "none";
  buttonBox.classList.add("buttonbox");

  //this as well...
  // note.appendChild(checkbox);

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

//this is what is supposed to be the checkbox, which works when local storage is disabled, but not when local storage is enabled...
// function completedButton() {
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.classList.add("circular-checkbox");

//   // const card = checkbox.closest(".card");

//   // for (let key in myLibrary) {
//   //   if (Array.isArray(myLibrary[key])) {
//   //     const index = myLibrary[key].findIndex((item) => item.id == noteID);
//   //     if (index !== -1 && myLibrary[key][index].filter.includes("completed")) {
//   //      checkbox.checked = true

      
//   //       console.log(myLibrary[key][index].filter);
//   //       break;
//   //     }
//   //   }
//   // }

//   // checkbox.addEventListener("change", function () {
//   //   if (this.checked) {
//   //     console.log("CHECKED");
//   //     for (let key in myLibrary) {
//   //       if (Array.isArray(myLibrary[key])) {
//   //         const index = myLibrary[key].findIndex((item) => item.id == noteID);
//   //         if (index !== -1) {
//   //           myLibrary[key][index].filter.push("completed");

//   //           const card = this.closest(".card");
//   //           if (card && !card.classList.contains("completed")) {
//   //             card.classList.add("completed");
//   //           }

//   //           console.log(myLibrary[key][index].filter);
//   //           break;
//   //         }
//   //       }
//   //     }
//   //   } else {
//   //     for (let key in myLibrary) {
//   //       if (Array.isArray(myLibrary[key])) {
//   //         const index = myLibrary[key].findIndex((item) => item.id == noteID);
//   //         if (index !== -1) {
//   //           const filterIndex =
//   //             myLibrary[key][index].filter.indexOf("completed");
//   //           if (filterIndex !== -1) {
//   //             myLibrary[key][index].filter.splice(filterIndex, 1);

//   //             const card = this.closest(".card");
//   //             if (card && card.classList.contains("completed")) {
//   //               card.classList.remove("completed");
//   //             }

//   //             console.log(myLibrary[key][index].filter);
//   //           }
//   //           break;
//   //         }
//   //       }
//   //     }
//   //   }
//   // });

//   return checkbox;
// }

export default pushtoDom;

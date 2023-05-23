import { remove } from "lodash";
import { myLibrary } from "./modalPopulate";
import { libraryDirectories } from "./modalPopulate";
import { index } from "./switchdirectory";
import { v4 as uuidv4 } from 'uuid';

const overlay = document.getElementById("overlay");

function pushtoDom() {
  const lastObj = myLibrary[index][myLibrary[index].length - 1];
  let notetitle = lastObj.title;
  let notedate = lastObj.date;
  let notedescription = lastObj.description;
  const note = document.createElement("div");

  note.setAttribute("data-titledate", `${lastObj.title}_${lastObj.date}`);

  note.classList.add("card");
  note.classList.add(index);
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
    note.classList.add("focus");
    description.style.display = "";
    note.style.zIndex = 10;
    note.style.position = "relative";
    overlay.classList.add("active");
    title.contentEditable = true;
    date.disabled = false;
    description.contentEditable = true;
    removeBtn.style.display = "";

    overlay.addEventListener("click", function () {
      let titledate = note.getAttribute("data-titledate");
      let [title, date] = titledate.split("_");

      let editedObject = {
        title: `${notetitle}`,
        date: `${notedate}`,
        description: `${notedescription}`,
      };

      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex(
            (item) => item.title === title && item.date === date
          );
          if (index !== -1) {
            myLibrary[key][index] = editedObject;
            break;
          }
        }
      }
      overlay.classList.remove("active");
      note.style.zIndex = 1;
      note.style.position = "relative";
      note.classList.remove("focus");
      description.style.display = "none";
      //newcode
      note.setAttribute("data-titledate", `${notetitle}_${notedate}`);
      ///newcode
      console.log(myLibrary.getAllObjects());
    });
  });


  const buttonBox = document.createElement("div");
  let removeBtn = deleteButton(notetitle, notedate, notedescription);
  removeBtn.style.display = "none";
  buttonBox.classList.add("buttonbox");
  note.appendChild(title);
  note.appendChild(date);
  note.appendChild(description);
  buttonBox.appendChild(removeBtn);
  note.appendChild(buttonBox);
  document.getElementById("main-content").appendChild(note);
}

function deleteButton(notetitle, notedate, notedescription) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("button", "rmv");
  removeBtn.innerHTML = "X";

  removeBtn.addEventListener("click", function () {
    //maybethis???????
    console.log(
      removeBtn.closest("[data-titledate]").getAttribute("data-titledate")
    );

    overlay.classList.remove("active");
    setTimeout(function () {
      deleteObjectfromLibrary(notetitle, notedate, removeBtn);
      overlay.classList.remove("active");
      removeBtn.closest(".card").remove();
      console.log(myLibrary.getAllObjects());
    }, 100);
  });

  return removeBtn;
}

//this function works fine before an edit, but then breaks after an edit.

function deleteObjectfromLibrary(notetitle, notedate, removeBtn) {
  ///ATTEMPT
  let testValue = removeBtn
    .closest("[data-titledate]")
    .getAttribute("data-titledate");
  let [title, date] = testValue.split("_");

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

///

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
      note.classList.add("focus");
      description.style.display = "";
      note.style.zIndex = 10;
      note.style.position = "relative";
      overlay.classList.add("active");
      title.contentEditable = true;
      date.disabled = false;
      description.contentEditable = true;
      removeBtn.style.display = "";

      overlay.addEventListener("click", function () {
        let titledate = note.getAttribute("data-titledate");
        let [title, date] = titledate.split("_");

        let editedObject = {
          title: `${notetitle}`,
          date: `${notedate}`,
          description: `${notedescription}`,
        };

        for (let key in myLibrary) {
          if (Array.isArray(myLibrary[key])) {
            const index = myLibrary[key].findIndex(
              (item) => item.title === title && item.date === date
            );
            if (index !== -1) {
              myLibrary[key][index] = editedObject;
              break;
            }
          }
        }
        overlay.classList.remove("active");
        note.style.zIndex = 1;
        note.style.position = "relative";
        note.classList.remove("focus");
        description.style.display = "none";
        //newcode
        note.setAttribute("data-titledate", `${notetitle}_${notedate}`);
        ///newcode
        console.log(myLibrary.getAllObjects());
      });
    });

    const buttonBox = document.createElement("div");
    let removeBtn = deleteButton(notetitle, notedate, notedescription);
    removeBtn.style.display = "none";
    buttonBox.classList.add("buttonbox");
    note.appendChild(title);
    note.appendChild(date);
    note.appendChild(description);
    buttonBox.appendChild(removeBtn);
    note.appendChild(buttonBox);
    document.getElementById("main-content").appendChild(note);
  });
}

// function handleClick(event, removeBtn, description) {
//   let note = event.target;
//   note.classList.add("focus");
//   description.style.display = "";
//   note.style.zIndex = 10;
//   note.style.position = "relative";
//   overlay.classList.add("active");
//   title.contentEditable = true;
//   date.disabled = false;
//   description.contentEditable = true;
//   removeBtn.style.display = "";

//   overlay.addEventListener("click", handleOverlayClick);
// }

// function handleOverlayClick(note) {
//   // let titledate = note.getAttribute("data-titledate");
//   let titledate = = event.target.closest("[data-titledate]");
//   let [title, date] = titledate.split("_");

//   let editedObject = {
//     title: `${notetitle}`,
//     date: `${notedate}`,
//     description: `${notedescription}`,
//   };

//   for (let key in myLibrary) {
//     if (Array.isArray(myLibrary[key])) {
//       const index = myLibrary[key].findIndex(
//         (item) => item.title === title && item.date === date
//       );
//       if (index !== -1) {
//         myLibrary[key][index] = editedObject;
//         break;
//       }
//     }
//   }
//   overlay.classList.remove("active");
//         note.style.zIndex = 1;
//         note.style.position = "relative";
//         note.classList.remove("focus");
//         description.style.display = "none";
//         //newcode
//         note.setAttribute("data-titledate", `${notetitle}_${notedate}`);
//         ///newcode
//         console.log(myLibrary.getAllObjects());
// }

export default pushtoDom;

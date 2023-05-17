import { myLibrary } from "./modalPopulate";

function pushtoDom() {
  const lastObj = myLibrary[myLibrary.length - 1];
  const notetitle = lastObj.title;
  const notedate = lastObj.date;

  const note = document.createElement("div");
  note.classList.add("card");

  note.classList.add("shownote");
  
  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = `Title: ${notetitle}`;
  const date = document.createElement("div");
  date.classList.add("date");
  date.innerHTML = `Due: ${notedate}`;

  note.appendChild(title);
  note.appendChild(date);

  document.getElementById("main-content").appendChild(note);
}

export default pushtoDom;

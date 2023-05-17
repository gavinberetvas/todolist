import { myLibrary } from "./modalPopulate";
import { index } from './notefolders';

// myLibrary = {
//   today: [],
//   tomorrow: [],
// };


function pushtoDom() {
  // const lastObj = myLibrary.index[(myLibrary[index]).length - 1];
  const lastObj = myLibrary[index][myLibrary[index].length - 1];
  const notetitle = lastObj.title;
  const notedate = lastObj.date;

  const note = document.createElement("div");
  note.classList.add("card");

  note.classList.add(index);
  
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

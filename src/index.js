import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
// import { compareAsc, format } from "date-fns";
import { myLibrary } from "./modules/myLibraryObject";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProjectButton";




modal();
switchdirectory();
newProjectButton();

// loadFromLocalStorage();

// window.addEventListener("beforeunload", function () {
//   myLibrary.saveToLocalStorage();
// });

// function loadFromLocalStorage() {
//   const data = localStorage.getItem("myLibrary");
//   console.log(data);
//   if (data) {
//     const savedLibrary = JSON.parse(data);
//     console.log(savedLibrary);
//     //     Object.assign(myLibrary, savedLibrary);
//     //   }
//     // //initialization of object methods:
//     myLibrary.newNote = function (event, index) {
//       event.preventDefault();
//       const { title, date, description } = event.target.elements;
//       const uuid = uuidv4();

//       this[index].push({
//         title: title.value,
//         date: date.value,
//         description: description.value,
//         id: uuid,
//       });
//       console.log(this);
//       modal.classList.remove("active");
//       overlay.classList.remove("active");
//     };

//     myLibrary.editNote = function (note, notetitle, notedate, notedescription) {
//       let itemID = note.getAttribute("data-id");

//       let editedObject = {
//         title: `${notetitle}`,
//         date: `${notedate}`,
//         description: `${notedescription}`,
//       };

//       for (let key in myLibrary) {
//         if (Array.isArray(myLibrary[key])) {
//           const index = myLibrary[key].findIndex((item) => (item.id = itemID));
//           if (index !== -1) {
//             myLibrary[key][index] = editedObject;
//             break;
//           }
//         }
//       }
//     };

//     myLibrary.deleteNote = function (removeBtn) {
//       let idValue = removeBtn.closest("[data-id]").getAttribute("data-id");
//       for (let key in myLibrary) {
//         if (Array.isArray(myLibrary[key])) {
//           const index = myLibrary[key].findIndex((item) => item.id == idValue);
//           if (index !== -1) {
//             myLibrary[key].splice(index, 1);
//             return;
//           }
//         }
//       }
//     };

//     myLibrary.newProject = function (uuid) {
//       myLibrary[uuid] = [];
//     };

//     myLibrary.getAllObjects = function () {
//       const objects = [];

//       for (let key in this) {
//         if (this.hasOwnProperty(key) && Array.isArray(this[key])) {
//           objects.push(...this[key]);
//         }
//       }

//       console.log(objects);
//       return objects;
//     };

//     myLibrary.saveToLocalStorage = function () {
//       localStorage.setItem("myLibrary", JSON.stringify(this));
//     };

//     Object.assign(myLibrary, savedLibrary);
//   }
// }

pushAllItemstoDom();

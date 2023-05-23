import { hideItems } from "./switchdirectory";
import { makeCurrentDirectory } from "./switchdirectory";
import { index } from "./switchdirectory";
import { myLibrary } from "./modalPopulate";
import { v4 as uuidv4 } from "uuid";

export function newProjectButton() {
  document.getElementById("newproject").addEventListener("click", () => {
    let newProject = document.createElement("div");
    newProject.classList.add("directory");
    let newProjectName = document.createElement("p");
    let deleteButton = document.createElement("button");
    const uuid = uuidv4();
    myLibrary[uuid] = [];
    newProject.dataset.project = `${uuid}`;

    newProject.classList.add("projectcard");
    newProjectName.contentEditable = true;

    newProjectName.innerHTML = `New_Project`;
    deleteButton.classList.add("editProject");
    deleteButton.innerHTML = `X`;
    deleteButton.dataset.delete = `${uuid}`;
    deleteButton.style.zIndex = 2;

    newProject.addEventListener("click", () => {
      //   index = newProjectName.innerHTML;
      index = uuid;
      console.log(newProjectName.innerHTML);
      makeCurrentDirectory();
      hideItems();

      newProjectName.contentEditable = true;
      newProjectName.classList.add("activeproject");
      newProjectName.focus();
    });

    newProjectName.addEventListener("blur", () => {
      let projectName = newProjectName.innerHTML;
      newProjectName.classList.remove("activeproject");
      newProjectName.classList.remove("current");
      console.log("Blur event:", projectName);
    });

    deleteButton.addEventListener("click", (event) => {
      const deleteAttributeValue = deleteButton.dataset.delete;

      event.stopPropagation();

      const confirmation = window.confirm(
        "Are you sure you want to delete this project?"
      );

      if (confirmation) {
        delete myLibrary[uuid];
        deleteButton.closest(".projectcard").remove();

        deleteButton.dataset.delete = `${uuid}`;
        const elements = Array.from(
          document.getElementsByClassName(deleteAttributeValue)
        );
        elements.forEach((element) => {
          element.remove();
        });
      }
    });

    let directories = document.querySelector("#projects");
    newProject.appendChild(newProjectName);
    newProject.appendChild(deleteButton);
    directories.appendChild(newProject);
  });
}

// chatgpt cleaned up version
// function newProjectButton() {
//   const newProjectBtn = document.getElementById("newproject");

//   newProjectBtn.addEventListener("click", () => {
//     console.log("HELLO");

//     const newProject = document.createElement("div");
//     newProject.classList.add("directory");

//     const newProjectName = document.createElement("p");
//     newProjectName.contentEditable = true;
//     newProjectName.innerHTML = "New_Project";

//     const deleteButton = document.createElement("button");
//     const uuid = uuidv4();
//     deleteButton.classList.add("editProject");
//     deleteButton.innerHTML = "X";
//     deleteButton.dataset.delete = uuid;
//     deleteButton.style.zIndex = 2;

//     newProject.dataset.project = uuid;
//     newProject.classList.add("projectcard");

//     newProject.addEventListener("click", () => {
//       index = uuid;
//       console.log(newProjectName.innerHTML);
//       makeCurrentDirectory();
//       hideItems();

//       newProjectName.contentEditable = true;
//       newProjectName.classList.add("activeproject");
//       newProjectName.focus();
//     });

//     newProjectName.addEventListener("blur", () => {
//       let projectName = newProjectName.innerHTML;
//       newProjectName.classList.remove("activeproject");
//       newProjectName.classList.remove("current");
//       console.log("Blur event:", projectName);
//     });

//     deleteButton.addEventListener("click", (event) => {
//       const deleteAttributeValue = deleteButton.dataset.delete;

//       event.stopPropagation();

//       const confirmation = window.confirm("Are you sure you want to delete this project?");

//       if (confirmation) {
//         delete myLibrary[uuid];
//         newProject.remove();
//         deleteButton.dataset.delete = uuid;
//         const elements = Array.from(document.getElementsByClassName(deleteAttributeValue));
//         elements.forEach((element) => {
//           element.remove();
//         });
//       }
//     });

//     const directories = document.querySelector("#projects");
//     newProject.appendChild(newProjectName);
//     newProject.appendChild(deleteButton);
//     directories.appendChild(newProject);
//   });
// }

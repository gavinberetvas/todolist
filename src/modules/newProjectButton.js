import { hideItems } from "./switchdirectory";
import { makeCurrentDirectory } from "./switchdirectory";
import { index } from "./switchdirectory";
import { myLibrary } from "./modalPopulate";
import { v4 as uuidv4 } from 'uuid';

export function newProjectButton() {
  document.getElementById("newproject").addEventListener("click", () => {
    console.log("HELLO");

    let newProject = document.createElement("div");
    newProject.classList.add("directory");
    let newProjectName = document.createElement("p");
    let deleteButton = document.createElement("button");
    // let i = document.querySelectorAll(".projectcard p").length + 1;
    // myLibrary[`${uuid}`] = [];
    const uuid = uuidv4();
    myLibrary[uuid] = [];
    newProject.dataset.project = `${uuid}`;

    newProject.classList.add("projectcard");
    newProjectName.contentEditable = true;

    newProjectName.innerHTML = `New_Project`;
    deleteButton.classList.add("editProject");
    deleteButton.innerHTML = `X`;
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

    newProjectName.addEventListener("input", () => {
      let projectName = newProjectName.innerHTML;
      console.log(projectName);
    });

    newProjectName.addEventListener("blur", () => {
      let projectName = newProjectName.innerHTML;
      newProjectName.classList.remove("activeproject");
      console.log("Blur event:", projectName);
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("delete button clicked");
      deleteButton.closest(".projectcard").remove();
    });

    let directories = document.querySelector("#projects");
    newProject.appendChild(newProjectName);
    newProject.appendChild(deleteButton);
    directories.appendChild(newProject);
  });
}

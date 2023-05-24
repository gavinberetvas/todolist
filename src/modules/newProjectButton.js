import { hideItems } from "./switchdirectory";
import { makeCurrentDirectory } from "./switchdirectory";
import { index } from "./switchdirectory";
import { myLibrary } from "./myLibraryObject";
import { v4 as uuidv4 } from "uuid";

export function newProjectButton() {
  document.getElementById("newproject").addEventListener("click", () => {
    const uuid = uuidv4();
    myLibrary.newProject(uuid);

    let newProject = document.createElement("div");
    newProject.classList.add("directory");
    newProject.dataset.project = `${uuid}`;
    newProject.classList.add("projectcard");

    let newProjectName = document.createElement("p");
    newProjectName.contentEditable = true;
    newProjectName.innerHTML = `New_Project`;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("editProject");
    deleteButton.innerHTML = `X`;
    deleteButton.dataset.delete = `${uuid}`;
    deleteButton.style.zIndex = 2;

    newProject.addEventListener("click", () => {
      index = uuid;
      console.log(newProjectName.innerHTML);
      console.log(`INDEX: ${index}`);
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

    //DELETE
    deleteButton.addEventListener("click", (event) => {

      const deleteAttributeValue = deleteButton.dataset.delete;
      event.stopPropagation();

      const confirmation = window.confirm(
        "Are you sure you want to delete this project and all the notes it contains?"
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
      } else {
        console.log("delete cancel");
      }
    });

    let directories = document.querySelector("#projects");
    newProject.appendChild(newProjectName);
    newProject.appendChild(deleteButton);
    directories.appendChild(newProject);
  });
}


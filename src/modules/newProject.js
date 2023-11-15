import { hideItems } from "./switchdirectory";
import { makeCurrentDirectory } from "./switchdirectory";
import { index } from "./switchdirectory";
import { myLibrary } from "./myLibraryObject";
import { v4 as uuidv4 } from "uuid";
import { changeDirectoryText } from "./switchdirectory";
import { directoryID } from "./switchdirectory";
//this is the least clean section I think, but
//Im not sure how to best consolidate the code.

let projectDirectory = [];

export function newProjectButton() {
  document
    .getElementById("newproject")
    .addEventListener("click", newProjectMainClickHandler);
}

function newProjectMainClickHandler() {
  const uuid = uuidv4();
  let projectData = {
    title: "new project",
    key: `${uuid}`,
  };

  projectDirectory.push(projectData);
  localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));
  myLibrary.newProject(uuid);

  newProjectUIElements(uuid);
}

function newProjectUIElements(uuid) {
  let newProject = newProjectCard(uuid);
  let newProjectName = createNewProjectName(uuid);
  const deleteButton = createProjectDeleteButton(uuid);

  newProject.addEventListener("click", () => {
    projectClickHandler(uuid);
  });

  newProjectName.addEventListener("blur", () => {
    projectBlurHandler(uuid, newProjectName.innerHTML);
  });

  deleteButton.addEventListener("click", (event) => {
    deleteButtonClickHandler(uuid, deleteButton, event);
  });

  let directories = document.querySelector("#projects");
  newProject.appendChild(newProjectName);
  newProject.appendChild(deleteButton);
  directories.appendChild(newProject);
}

//subroutines for new project ui elements. 
function newProjectCard(uuid) {
  let item = document.createElement("div");
  item.classList.add("directory");
  item.dataset.project = `${uuid}`;
  item.classList.add("projectcard");
  return item;
}

function createNewProjectName(uuid) {
  let newProjectName = document.createElement("p");
  newProjectName.contentEditable = true;
  newProjectName.innerHTML = `New_Project`;
  return newProjectName;

}

function createProjectDeleteButton(uuid) {
  let deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "trash-can-outline.svg");
  deleteButton.setAttribute("alt", "Delete");
  deleteButton.setAttribute("title", "Delete");
  deleteButton.classList.add("editProject");
  deleteButton.dataset.delete = `${uuid}`;
  deleteButton.style.zIndex = 2;

  return deleteButton;
}

function projectClickHandler(uuid) {
  index = uuid;

  let projectName = newProjectName(uuid).innerHTML; // Use a different variable name here

  directoryID = projectName;
  changeDirectoryText();
  makeCurrentDirectory();
  hideItems();

  let projectNameElement = newProjectName(uuid);
  projectNameElement.contentEditable = true;
  projectNameElement.classList.add("activeproject");
  projectNameElement.focus();
}

function projectBlurHandler(uuid, projectName) {
  projectName = newProjectName.innerHTML;
  newProjectName.classList.remove("activeproject");
  newProjectName.classList.remove("current");

  const objectIdToSearch = uuid;
  const foundObjectIndex = projectDirectory.findIndex(
    (obj) => obj.key === objectIdToSearch
  );

  if (foundObjectIndex !== -1) {
    projectDirectory[foundObjectIndex].title = projectName;
  }

  directoryID = newProjectName.innerHTML;
  changeDirectoryText();

  localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));
}

function deleteButtonClickHandler(uuid, deleteButton, event) {
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
}

export function loadProjectsFromLS() {
  const data = localStorage.getItem("projectDirectory");
  let projectDir = [];

  if (data) {
    let directories = document.querySelector("#projects");

    projectDir = JSON.parse(data);
    projectDirectory = projectDir;
    projectDir.forEach((item) => {
      let filter = item.key;

      let newProject = document.createElement("div");
      newProject.classList.add("directory");
      newProject.dataset.project = `${item.key}`;
      newProject.classList.add("projectcard");

      let newProjectName = document.createElement("p");
      newProjectName.contentEditable = true;
      newProjectName.innerHTML = item.title;

      const deleteButton = document.createElement("img");
      deleteButton.setAttribute("src", "trash-can-outline.svg");
      deleteButton.setAttribute("alt", "Delete");
      deleteButton.setAttribute("title", "Delete");
      deleteButton.classList.add("editProject");
      deleteButton.dataset.delete = `${item.key}`;
      deleteButton.style.zIndex = 2;

      newProject.addEventListener("click", () => {
        index = item.key;

        directoryID = newProjectName.innerHTML;
        changeDirectoryText();

        makeCurrentDirectory();
        filterByProject(filter);

        newProjectName.contentEditable = true;
        newProjectName.classList.add("activeproject");
        newProjectName.focus();
      });

      newProjectName.addEventListener("blur", () => {
        let projectName = newProjectName.innerHTML;
        newProjectName.classList.remove("activeproject");
        newProjectName.classList.remove("current");

        directoryID = newProjectName.innerHTML;
        changeDirectoryText();

        const objectIdToSearch = item.key;
        const foundObjectIndex = projectDirectory.findIndex(
          (obj) => obj.key === objectIdToSearch
        );

        if (foundObjectIndex !== -1) {
          projectDirectory[foundObjectIndex].title = projectName;
        }

        localStorage.setItem(
          "projectDirectory",
          JSON.stringify(projectDirectory)
        );
      });

      deleteButton.addEventListener("click", (event) => {
        const deleteAttributeValue = deleteButton.dataset.delete;
        event.stopPropagation();

        const confirmation = window.confirm(
          "Are you sure you want to delete this project and all the notes it contains?"
        );

        if (confirmation) {
          const objectIdToSearch = deleteAttributeValue;
          const foundObjectIndex = projectDirectory.findIndex(
            (obj) => obj.key === objectIdToSearch
          );

          if (foundObjectIndex !== -1) {
            projectDirectory.splice(foundObjectIndex, 1);
          }

          delete myLibrary[filter];

          deleteButton.closest(".projectcard").remove();

          const elements = document.querySelectorAll(
            `[data-project="${deleteAttributeValue}"]`
          );
          elements.forEach((element) => {
            element.remove();
          });
        } else {
          console.log("delete cancel");
        }

        localStorage.setItem(
          "projectDirectory",
          JSON.stringify(projectDirectory)
        );
      });

      newProject.appendChild(newProjectName);
      newProject.appendChild(deleteButton);
      directories.appendChild(newProject);
    });
  }
  return projectDir;
}

function filterByProject(filter) {
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const projectAttribute = card.getAttribute("data-project");

    if (projectAttribute == filter) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
}

import { hideItems } from "./switchdirectory";
import { makeCurrentDirectory } from "./switchdirectory";
import { index } from "./switchdirectory";
import { myLibrary } from "./myLibraryObject";
import { v4 as uuidv4 } from "uuid";

let projectDirectory = [];

export function newProjectButton() {
  document.getElementById("newproject").addEventListener("click", () => {
    const uuid = uuidv4();

    let projectData = {
      title: "new project",
      key: `${uuid}`,
    };

    projectDirectory.push(projectData);

    //TODO: IMPLETEMENT PROJECT STORAGE
    localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));

    console.log(projectDirectory);
    console.log(projectData);

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

      const objectIdToSearch = uuid;
      const foundObjectIndex = projectDirectory.findIndex(
        (obj) => obj.key === objectIdToSearch
      );

      if (foundObjectIndex !== -1) {
        projectDirectory[foundObjectIndex].title = projectName;
      }

      // TODO: IMPLEMENT PROJECT STORAGE
      localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));
    });


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

//TODO: 
//WIP
export function loadProjectsFromLS() {
  const data = localStorage.getItem("projectDirectory");
  console.log(`Wowwwwww: ${data}`);
  let projectDir = [];

  if (data) {
    let directories = document.querySelector("#projects");

    projectDir = JSON.parse(data);
    projectDirectory = projectDir;
    projectDir.forEach((item) => {
      console.log(item);

      let testing = item.key
      console.log(`item.key value = ${testing}`)


      let newProject = document.createElement("div");
      newProject.classList.add("directory");
      ///breaks here
      newProject.dataset.project = `${item.key}`;
      newProject.classList.add("projectcard");
  
      let newProjectName = document.createElement("p");
      newProjectName.contentEditable = true;
      ///
      newProjectName.innerHTML = item.title;
  
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("editProject");
      deleteButton.innerHTML = `X`;
      deleteButton.dataset.delete = `${item.key}`;
      deleteButton.style.zIndex = 2;
  
      newProject.addEventListener("click", () => {
        index = item.key;
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
  
        //edit here
        const objectIdToSearch = item.key;
        const foundObjectIndex = projectDirectory.findIndex(
          (obj) => obj.key === objectIdToSearch
        );
  
        if (foundObjectIndex !== -1) {
          projectDirectory[foundObjectIndex].title = projectName;
        }
  
        // TODO: IMPLEMENT PROJECT STORAGE
        localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));
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

          //other stuff to implement
  
          delete myLibrary[item.key];
          deleteButton.closest(".projectcard").remove();
  
          //right?? this will need to be tested further....its pushing an error right now
          //UUID is not defined
          deleteButton.dataset.delete = `${item.key}`;
          const elements = Array.from(
            document.getElementsByClassName(deleteAttributeValue)
          );
          elements.forEach((element) => {
            element.remove();
          });

          //THIS IS NOT WORKING
          // delete this
        } else {
          console.log("delete cancel");
        }
        //testing this code here too
        console.log(`PROJECTDIR == ${projectDir}`)
        localStorage.setItem("projectDirectory", JSON.stringify(projectDirectory));

      });

      newProject.appendChild(newProjectName);
      newProject.appendChild(deleteButton);
      directories.appendChild(newProject);
    });
  }
  return projectDir;
}

// export function pushAllProjectsToDom() {
//   data.forEach((item) => {
//     console.log(item);
//   });
// }

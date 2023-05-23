export function newProjectButton() {
  document.getElementById("newproject").addEventListener("click", () => {
    console.log("HELLO");

    let newProject = document.createElement("div");
    let newProjectName = document.createElement("p");
    let deleteButton = document.createElement("button");

    newProject.classList.add("projectcard");
    newProjectName.contentEditable = true;
    
    newProjectName.innerHTML = "New Project";
    deleteButton.classList.add("editProject");
    deleteButton.innerHTML = `X`;
    deleteButton.style.zIndex = 2;

    

    newProject.addEventListener("click", () => {
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

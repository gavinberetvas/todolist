import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
// import { compareAsc, format } from "date-fns";
import { myLibrary } from "./modules/myLibraryObject";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProject";
import { loadFromLocalStorage } from "./modules/myLibraryObject";
import { sortByDate } from "./modules/switchdirectory";
import { loadProjectsFromLS } from "./modules/newProject";


modal();
switchdirectory();

loadProjectsFromLS();
newProjectButton();

loadFromLocalStorage();
pushAllItemstoDom();

window.addEventListener("beforeunload", function () {
  myLibrary.saveToLocalStorage();
});


import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
// import { compareAsc, format } from "date-fns";
import { myLibrary } from "./modules/myLibraryObject";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProjectButton";
import { loadFromLocalStorage } from "./modules/myLibraryObject";

modal();
switchdirectory();
newProjectButton();

loadFromLocalStorage();
pushAllItemstoDom();

window.addEventListener("beforeunload", function () {
  myLibrary.saveToLocalStorage();
});

//so, when I load from LocalStorage the pushallitemstodom function breaks. 

//its not a problem with the storage its a problem with the checkbox existing/functionality....

//specifically that the createElements function trips up on the checkbox for some reason...
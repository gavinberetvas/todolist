import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
// import { compareAsc, format } from "date-fns";
import { myLibrary } from "./modules/myLibraryObject";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProjectButton";
import { loadFromLocalStorage } from "./modules/myLibraryObject";

// test();
modal();
switchdirectory();
newProjectButton();
loadFromLocalStorage();
pushAllItemstoDom();

window.addEventListener("beforeunload", function () {
  myLibrary.saveToLocalStorage();
});

// window.addEventListener("beforeunload", function () {
//   let domContent = document.getElementById("main-content").innerHTML;
//   localStorage.setItem("domContent", domContent);
// });

// function test() {
//   let domContent = localStorage.getItem("domContent");
//   document.getElementById("main-content").innerHTML = domContent;

//   if (domContent == "" || domContent == undefined || domContent == null) {
//     domContent = document.getElementById("main-content").innerHTML =
//     '<div data-id="93bb33ce-7a58-4523-b660-cc0de999f8f7" class="card all 93bb33ce-7a58-4523-b660-cc0de999f8f7" style="z-index: 1; position: relative;"><div class="title" contenteditable="true">Test Note</div><input class="date" type="date"><div class="description" style="display: none;" contenteditable="true">This is a developer\'s note. </div><div class="buttonbox"><button class="button rmv" style="">X</button></div></div>';
// }

//   // let domContent = document.getElementById("main-content").innerHTML;
//   console.log(`DOMCONTENT VALUE: ${domContent}`);
// }

// //    const data = localStorage.getItem("myLibrary");
// //   console.log(data);

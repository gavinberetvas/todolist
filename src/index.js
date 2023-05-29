// import _, { functions } from "lodash";
import modal from "./modules/modal";
import switchdirectory from "./modules/switchdirectory";
import { myLibrary } from "./modules/myLibraryObject";
import { pushAllItemstoDom } from "./modules/domManipulation";
import { newProjectButton } from "./modules/newProject";
import { loadFromLocalStorage } from "./modules/myLibraryObject";
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

let navbar = false;

toggleNavbar();

function toggleNavbar() {
  document.getElementById("icon").addEventListener("click", () => {
    const navbarElement = document.getElementById("navbar");

    if (navbar == false) {
      navbarElement.style.transform = "translateX(0%)";
      navbarElement.classList.add("active");
      navbar = true;
    } else {
      navbarElement.style.transform = "translateX(-100%)";
      navbarElement.classList.remove("active");
      navbar = false;
    }
  });

  document.addEventListener("click", (event) => {
    const navbarElement = document.getElementById("navbar");
    const iconElement = document.getElementById("icon");

    if (!navbarElement.contains(event.target) && event.target !== iconElement && navbar) {
      navbarElement.style.transform = "translateX(-100%)";
      navbarElement.classList.remove("active");
      navbar = false;
    }
  });
}

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 800) {
//     document.getElementById("navbar").style.transform = "translateX(0%)";
//   } else if (window.innerWidth < 800) {
//     document.getElementById("navbar").style.transform = "translateX(-100%)";
//   }
// });

// function funnnction() {
//   document.getElementById("navbar").style.transform = "translateX(0%)";
//   navbar = true;
// }

// function test2() {
//   if (navbar !== false) {
//     document.getElementById("navbar").style.transform = "translateX(-100%)";
//   }
// }

// window.addEventListener("click", () => {
//   if (navbar !== false) {
//     document.getElementById("navbar").style.transform = "translateX(-100%)";
//     navbar = false;
//   }
// });

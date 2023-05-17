import _ from "lodash";
import modal from "./modules/modal";

modal();




const dumbutton = document.getElementById("hideitems");
dumbutton.addEventListener("click", hideItems);

// function hideItems() {
//   let elements = document.getElementsByClassName("shownote");
//   for (let i = 0; i < elements.length; i++) {
//     elements[i].classList.remove("shownote");
//   }
// }

function hideItems() {
  const elements = document.getElementsByClassName('card');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.style.display === "none") {
      element.style.display = ""; // Show the element
    } else {
      element.style.display = "none"; // Hide the element
    }
  }
}
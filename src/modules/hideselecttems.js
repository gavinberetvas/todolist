import { myLibrary } from "./modalPopulate";



function hideitems() {
    function toggleElements(className) {
        const elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.style.display === "none") {
            element.style.display = ""; // Show the element
          } else {
            element.style.display = "none"; // Hide the element
          }
        }
      }
}
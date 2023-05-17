export let index = 'today';


function switchdirectory() {
document.getElementById("today").addEventListener("click", function() {
    index = 'today';
    hideItems();
    makeCurrentDirectory();
    console.log(index);
  });

  document.getElementById("tomorrow").addEventListener("click", function() {
    index = 'tomorrow';
    hideItems();
    makeCurrentDirectory();
    console.log(index);
  });
}

function hideItems() {
  const elements = document.getElementsByClassName('card');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
  
    if (element.classList.contains(index)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}

function makeCurrentDirectory() {
  event.target.classList.add("current");
  const buttons = document.querySelectorAll(".directory")
  buttons.forEach(button => {
    if (button != event.target) {
      button.classList.remove("current");
    }
  })
  // on click 
  // deletes current from other buttons 
  // and adds current to this button
}

export default switchdirectory;


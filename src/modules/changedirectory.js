export let index = 'today';


function switchdirectory() {
document.getElementById("today").addEventListener("click", function() {
    index = 'today';
    hideItems();
    console.log(index);
  });

  document.getElementById("tomorrow").addEventListener("click", function() {
    index = 'tomorrow';
    hideItems();
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

export default switchdirectory;


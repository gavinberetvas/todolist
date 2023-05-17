export const myLibrary = [];

function modalPopulate() {
  event.preventDefault();

  const { title, date} = event.target.elements;

  myLibrary.push({
    title: title.value,
    date: date.value,

  });
  // formReset();
  console.log(myLibrary)
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

export default modalPopulate;


# todolist
to do list using webpack, module pattern in vanilla js, html, css, eslint, prettier. Practicing SOLID principles



Edit functionality WIP  


const titledate = note.getAttribute("data-titledate");
        const [title, date] = titledate.split("_");

        const editedObject = {
          title: notetitle,
          date: notedate,
          description: notedescription,
        };

        for (let key in myLibrary) {
          if (Array.isArray(myLibrary[key])) {
            const index = myLibrary[key].findIndex(
              (item) => item.title === title && item.date === date
            );
            if (index !== -1) {
              myLibrary[key][index] = editedObject;
              break;
            }
          }
        }


   title.addEventListener("input", function () {
      notetitle = title.innerHTML;
    });

    date.addEventListener("input", function () {
      notedate = date.innerHTML;
    });

    description.addEventListener("input", function () {
      notedescription = description.innerHTML;
    });


function overlayClickHandler() {
  overlay.classList.remove("active");
  note.style.zIndex = 1;
  note.style.position = "relative";
  note.classList.remove("focus");
  description.style.display = "none";
  removeBtn.style.display = "none";

  console.log(notetitle);
  console.log(notedate);
  console.log(notedescription);

  overlay.removeEventListener("click", overlayClickHandler);
}

overlay.addEventListener("click", overlayClickHandler, { once: true });
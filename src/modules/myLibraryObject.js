import { v4 as uuidv4 } from "uuid";

export let myLibrary = {
  all: [],
  today: [
    {
      title: "Sample Note 1",
      date: "2023-05-26",
      description: "\"We are what we repeatedly do. Excellence, then, is not an act, but a habit.\" - Aristotle",
      id: "today",
      complete: false,
    },
    {
      title: "Sample Note 2",
      date: "2023-05-25",
      description: "\"To live is to suffer, to survive is to find meaning in the suffering.\" - Friedrich Nietzsche",
      id: "today2",
      complete: false,
    },
  ],

  tomorrow: [
    {
      title: "Sample Note 3",
      date: "2023-05-27",
      description: "\"I can control my passions and emotions if I can understand their nature.\" - Spinoza",
      id: "tomorrow",
      complete: false,
    },
    {
      title: "Sample Note 4",
      date: "2023-05-30",
      description: "\"It is not death that a man should fear, but he should fear never beginning to live.\" - Marcus Aurelius",
      id: "tomorrow2",
      complete: true,
    },
  ],

  newNote: function (event, index) {
    event.preventDefault();
    const { title, date, description } = event.target.elements;
    const uuid = uuidv4();

    this[index].push({
      title: title.value,
      date: date.value,
      description: description.value,
      id: uuid,
      complete: false,
      // filter: [],
    });
    console.log(this);
    modal.classList.remove("active");
    overlay.classList.remove("active");
  },

  editNote: function (note, notetitle, notedate, notedescription) {
    let itemID = note.getAttribute("data-id");
    let editedObject = {
      title: `${notetitle}`,
      date: `${notedate}`,
      description: `${notedescription}`,
      id: itemID,
    };

    for (let key in myLibrary) {
      if (Array.isArray(myLibrary[key])) {
        const index = myLibrary[key].findIndex((item) => item.id == itemID);
        if (index !== -1) {
          myLibrary[key][index] = editedObject;
          break;
        }
      }
    }
  },

  deleteNote: function (removeBtn) {
    let idValue = removeBtn.closest("[data-id]").getAttribute("data-id");
    for (let key in myLibrary) {
      if (Array.isArray(myLibrary[key])) {
        const index = myLibrary[key].findIndex((item) => item.id == idValue);
        if (index !== -1) {
          myLibrary[key].splice(index, 1);
          return;
        }
      }
    }
  },

  newProject: function (uuid) {
    myLibrary[uuid] = [];
  },

  getAllObjects: function () {
    const objects = [];

    for (let key in this) {
      if (this.hasOwnProperty(key) && Array.isArray(this[key])) {
        objects.push(...this[key]);
      }
    }

    console.log(objects);
    return objects;
  },

  saveToLocalStorage: function () {
    localStorage.setItem("myLibrary", JSON.stringify(this));
  },
};

export function loadFromLocalStorage() {
  const data = localStorage.getItem("myLibrary");
  console.log(data);
  if (data) {
    const savedLibrary = JSON.parse(data);
    console.log(savedLibrary);

    // //initialization of object methods:
    myLibrary.newNote = function (event, index) {
      event.preventDefault();
      const { title, date, description, } = event.target.elements;
      const uuid = uuidv4();

      let filter = index;

      this[index].push({
        title: title.value,
        date: date.value,
        description: description.value,
        id: uuid,
        projectFilter: filter,
        complete: false,
        important: false,
      });
      console.log(this);
      modal.classList.remove("active");
      overlay.classList.remove("active");
    };

    myLibrary.editNote = function (
      note,
      notetitle,
      notedate,
      notedescription,
    ) 
    {
      let itemID = note.getAttribute("data-id");
      let itemComplete = note.getAttribute("data-complete");
      let itemImportant = note.getAttribute("data-important");
      let noteFilter = note.getAttribute("data-project")

      console.log(`WOW: ${itemComplete}`)
      console.log(`WOWWWEE: ${itemImportant}`)

      if (itemComplete === "true") {
        itemComplete = true;
      } else if (itemComplete === "false") {
        itemComplete = false;
      }

      if (itemImportant === "true") {
        itemImportant = true;
      } else if (itemImportant === "false") {
        itemImportant = false;
      }
    
    

      let editedObject = {
        title: `${notetitle}`,
        date: `${notedate}`,
        description: `${notedescription}`,
        id: itemID,
        projectFilter: noteFilter,
        complete: itemComplete,
        important: itemImportant,
      };

      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == itemID);
          if (index !== -1) {
            myLibrary[key][index] = editedObject;
            break;
          }
        }
      }
    };

    myLibrary.deleteNote = function (removeBtn) {
      let idValue = removeBtn.closest("[data-id]").getAttribute("data-id");
      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == idValue);
          if (index !== -1) {
            myLibrary[key].splice(index, 1);
            return;
          }
        }
      }
    };

    myLibrary.newProject = function (uuid) {
      myLibrary[uuid] = [];
    };

    myLibrary.getAllObjects = function () {
      const objects = [];

      for (let key in this) {
        if (this.hasOwnProperty(key) && Array.isArray(this[key])) {
          objects.push(...this[key]);
        }
      }

      console.log(objects);
      return objects;
    };

    myLibrary.saveToLocalStorage = function () {
      localStorage.setItem("myLibrary", JSON.stringify(this));
    };

    Object.assign(myLibrary, savedLibrary);
  }
}

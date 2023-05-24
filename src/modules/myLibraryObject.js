// import { keys } from "lodash";
// import { index } from "./switchdirectory";
import { v4 as uuidv4 } from "uuid";

export let myLibrary = {
  all: [],
  today: [
    {
      title: "Today",
      date: "2023-05-21",
      description: "description.value",
      id: "today",
      filter: ["today"],
    },
    {
      title: "Today",
      date: "2024-07-18",
      description: "description.value",
      id: "today",
      filter: ["today"],
    },
  ],

  tomorrow: [
    {
      title: "completed tomorrow",
      date: "2224-05-18",
      description: "description.value",
      id: "tomorrow",
      filter: ["completed", "tomorrow"],
    },
    {
      title: "tomorrow",
      date: "1924-10-18",
      description: "description.value",
      id: "tomorrow2",
      filter: ["tomorrow"],
    },
  ],

  nextday: [
    {
      title: "important completed",
      date: "1000-07-18",
      description: "description.value",
      id: "tomorrwkewe",
      filter: ["important", "completed"],
    },
    {
      title: "tomorrow completed",
      date: "2024-01-01",
      description: "description.value",
      id: "fddf5b8a-95e6-4fba-b703-dbd8f2edb8b6",
      filter: ["tomorrow", "completed"],
    },
  ],

  //works!
  newNote: function (event, index) {
    event.preventDefault();
    const { title, date, description } = event.target.elements;
    const uuid = uuidv4();

    this[index].push({
      title: title.value,
      date: date.value,
      description: description.value,
      id: uuid,
      filter: []
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
    };

    for (let key in myLibrary) {
      if (Array.isArray(myLibrary[key])) {
        const index = myLibrary[key].findIndex((item) => (item.id = itemID));
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

  saveToLocalStorage: function() {
    localStorage.setItem('myLibrary', JSON.stringify(this));
  }
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
      const { title, date, description } = event.target.elements;
      const uuid = uuidv4();

      this[index].push({
        title: title.value,
        date: date.value,
        description: description.value,
        id: uuid,
        filter: []
      });
      console.log(this);
      modal.classList.remove("active");
      overlay.classList.remove("active");
    };

    myLibrary.editNote = function (note, notetitle, notedate, notedescription) {
      let itemID = note.getAttribute("data-id");

      let editedObject = {
        title: `${notetitle}`,
        date: `${notedate}`,
        description: `${notedescription}`,
      };

      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => (item.id = itemID));
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
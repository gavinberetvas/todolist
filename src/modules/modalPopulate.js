import { keys } from 'lodash';
import { index } from './switchdirectory';

export let myLibrary = {
  "all": [],
  "today": [{
    title: '1title.value',
    date: '2023-05-21',
    description: 'description.value',
  },{
    title: '2title.value',
    date: '2024-07-18',
    description: 'description.value',
  }],

  "tomorrow": [{
    title: '3title.value',
    date: '2224-05-18',
    description: 'description.value',
  },{
    title: '4title.value',
    date: '1924-10-18',
    description: 'description.value',
  }],

 "nextday": [{
    title: '5title.value',
    date: '1000-07-18',
    description: 'description.value',
  },{
    title: '6title.value',
    date: '2024-01-01',
    description: 'description.value',
  }],

  "New_Project": [],

  iterateObjectKeys: function(obj) {
    const keys = [];
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    
    return keys;

  },

  getAllObjects: function() {
    const objects = [];
  
    for (let key in this) {
      if (this.hasOwnProperty(key) && Array.isArray(this[key])) {
        objects.push(...this[key]);
      }
    }
    
    console.log(objects);
    return objects;
  },
};

function modalPopulate() {
  event.preventDefault();

  const { title, date, description } = event.target.elements;

  myLibrary[index].push({
    title: title.value,
    date: date.value,
    description: description.value,

  });
  // formReset();
  console.log(myLibrary)
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

export default modalPopulate;


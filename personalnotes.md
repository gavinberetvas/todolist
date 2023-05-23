
//getting started with Webpack
npm init -y
npm install webpack webpack-cli --save-dev
npm install --save lodash
npm install --save-dev style-loader css-loader

//getting started with eslint
eslint --init

on reflection realizing the entire project would probably be made easier using object methods.

so far I have 6 things I want to do that interact with the library in some way.
Adding, editing, and deleting notes.
adding, editing and deleting projects.

Verysimply: 

the objects need to have 

title
dueDate
Priority
description
(tags?)
UUID
test
alternative test


.makeNewNote
  needs to make a new object within the array corresponding to a key. 

  e.g

  addObjectToKey: function(keyName, newObject) {
    if (Array.isArray(this[keyName])) {
      this[keyName].push(newObject);
    } else {
      console.log(`"${keyName}" is not an array.`);
    }
  }
  
.editNote
  needs to be able to edit the values within the nested objects
.deleteNote
  needs to be able to delete a specific note within the arrays. 

.makeNewProject
  should make a new key with a value of arrays.
.editProject
  should be able to edit the title of the key.
.deleteProject
  should delete a key value pair from the object

.changeindex? or pass (index) as an argument on click like get data-value from button...

  and it would also be good if the DOM was made more streamlined as well/

  //with destucturing
const {name, email, phone} = employee;

//without destucturing
const name = employee.name;
const email = employee.email;
const phone = employee.phone;

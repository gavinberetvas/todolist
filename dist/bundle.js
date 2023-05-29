(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{d:()=>f});const t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let o;const n=new Uint8Array(16);function c(){if(!o&&(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(n)}const l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));const i=function(e,o,n){if(t.randomUUID&&!o&&!e)return t.randomUUID();const i=(e=e||{}).random||(e.rng||c)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,o){n=n||0;for(let e=0;e<16;++e)o[n+e]=i[e];return o}return function(e,t=0){return(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase()}(i)};let a={all:[],today:[{title:"Today",date:"2023-05-26",description:"description.value",id:"today",complete:!1},{title:"Today",date:"2023-05-25",description:"description.value",id:"today",complete:!1}],tomorrow:[{title:"completed tomorrow",date:"2023-05-27",description:"description.value",id:"tomorrow",complete:!1},{title:"tomorrow",date:"1924-10-18",description:"description.value",id:"tomorrow2",complete:!0}],nextday:[{title:"important completed",date:"1000-07-18",description:"description.value",id:"tomorrwkewe",complete:!0},{title:"tomorrow completed",date:"2024-01-01",description:"description.value",id:"fddf5b8a-95e6-4fba-b703-dbd8f2edb8b6",complete:!0}],newNote:function(e,t){e.preventDefault();const{title:o,date:n,description:c}=e.target.elements,l=i();this[t].push({title:o.value,date:n.value,description:c.value,id:l,complete:!1}),console.log(this),modal.classList.remove("active"),overlay.classList.remove("active")},editNote:function(e,t,o,n){let c=e.getAttribute("data-id"),l={title:`${t}`,date:`${o}`,description:`${n}`,id:c};for(let e in a)if(Array.isArray(a[e])){const t=a[e].findIndex((e=>e.id==c));if(-1!==t){a[e][t]=l;break}}},deleteNote:function(e){let t=e.closest("[data-id]").getAttribute("data-id");for(let e in a)if(Array.isArray(a[e])){const o=a[e].findIndex((e=>e.id==t));if(-1!==o)return void a[e].splice(o,1)}},newProject:function(e){a[e]=[]},getAllObjects:function(){const e=[];for(let t in this)this.hasOwnProperty(t)&&Array.isArray(this[t])&&e.push(...this[t]);return console.log(e),e},saveToLocalStorage:function(){localStorage.setItem("myLibrary",JSON.stringify(this))}},s="all",r="all";function d(){document.getElementById("which-directory").innerHTML=r}const u=document.getElementById("overlay");function m(e,t,o,n,c){console.log(c);const l=document.createElement("div"),i=document.createElement("div");i.classList.add("notecontentwrapper"),l.setAttribute("data-id",`${n}`),l.setAttribute("data-project",`${c}`),l.classList.add("card"),l.classList.add(s),console.log(`INDEX: ${s}`),console.log(`NOTEID: ${n}`);const r=document.createElement("div");r.classList.add("title"),r.innerHTML=`${e}`;const d=document.createElement("input");d.classList.add("date"),d.type="date",d.value=`${t}`,d.setAttribute("data-date",`${t}`);const m=document.createElement("div");m.classList.add("description"),m.innerHTML=o,m.style.display="none",r.addEventListener("input",(function(){e=r.innerHTML,console.log(e)})),d.addEventListener("input",(function(){t=d.value,console.log(t)})),m.addEventListener("input",(function(){o=m.innerHTML,console.log(o)})),l.addEventListener("click",(function(i){u.classList.add("active"),l.classList.add("focus"),l.style.zIndex=10,l.style.position="relative",r.contentEditable=!0,d.disabled=!1,m.style.display="",m.contentEditable=!0,g.style.display="",y.style.display="",f.style.display="",u.addEventListener("click",(function(){a.editNote(l,e,t,o,n,c),d.setAttribute("data-date",`${t}`),u.classList.remove("active"),l.style.zIndex=1,l.style.position="relative",l.classList.remove("focus"),m.style.display="none",f.style.display="none",g.style.display="none",y.style.display="none",console.log(a.getAllObjects())}))})),l.setAttribute("data-complete",!1),l.setAttribute("data-important",!1);let p=function(e,t){const o=document.createElement("div");o.classList.add("completedcheckboxwrapper");const n=document.createElement("label");n.setAttribute("for",`completed-checkbox-${e}`);const c=document.createElement("input");c.type="checkbox",c.id=`completed-checkbox-${e}`,c.classList.add("completed-checkbox"),o.appendChild(c),o.appendChild(n);for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&1==a[t][o].complete){c.checked=!0,console.log(a[t][o]);break}}return 1==c.checked&&t.setAttribute("data-complete",!0),c.addEventListener("change",(function(){this.checked?t.setAttribute("data-complete",!0):t.setAttribute("data-complete",!1)})),c.addEventListener("change",(function(){if(this.checked){console.log("CHECKED");for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&0==a[t][o].complete){c.checked=!0,a[t][o].complete=!0,console.log(a[t][o]);break}}}else for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&1==a[t][o].complete){c.checked=!1,a[t][o].complete=!1,console.log(a[t][o]);break}}})),o}(n,l),y=function(e,t){const o=document.createElement("div");o.classList.add("importantcheckboxwrapper");const n=document.createElement("label");n.setAttribute("for",`important-checkbox-${e}`),n.classList.add("checkbox-label");const c=document.createElement("input");c.type="checkbox",c.id=`important-checkbox-${e}`,c.classList.add("important-checkbox"),o.appendChild(c),o.appendChild(n);for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&1==a[t][o].important){c.checked=!0,n.classList.add("checked"),console.log(a[t][o]);break}}return 1==c.checked&&t.setAttribute("data-important",!0),c.addEventListener("change",(function(){this.checked?(n.classList.add("checked"),t.setAttribute("data-important",!0)):(n.classList.remove("checked"),t.setAttribute("data-important",!1))})),c.addEventListener("change",(function(){if(this.checked){console.log("CHECKED");for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&0==a[t][o].important){c.checked=!0,a[t][o].important=!0,console.log(a[t][o]);break}}}else for(let t in a)if(Array.isArray(a[t])){const o=a[t].findIndex((t=>t.id==e));if(-1!==o&&1==a[t][o].important){c.checked=!1,a[t][o].important=!1,console.log(a[t][o]);break}}})),o}(n,l);const f=document.createElement("div");let g=function(){const e=document.createElement("button");e.classList.add("button","rmv");const t=document.createElement("img");return t.setAttribute("src","trash-can-outline.svg"),t.setAttribute("alt","Delete"),t.setAttribute("title","Delete"),e.appendChild(t),e.addEventListener("click",(function(){setTimeout((function(){a.deleteNote(e),u.classList.remove("active"),e.closest(".card").remove(),console.log(a.getAllObjects())}),100)})),e}();return g.style.display="none",y.style.display="none",f.style.display="none",f.classList.add("buttonbox"),i.appendChild(p),i.appendChild(r),i.appendChild(d),f.appendChild(y),f.appendChild(g),l.appendChild(i),l.appendChild(m),l.appendChild(f),l}let p=[];(function(){const e=document.querySelectorAll("[data-modal-target]"),t=document.querySelectorAll("[data-close-button]"),o=document.getElementById("newtask");function n(e){null!=e&&(e.classList.remove("active"),overlay.classList.remove("active"))}e.forEach((e=>{e.addEventListener("click",(()=>{!function(e){null!=e&&(e.classList.add("active"),overlay.classList.add("active"))}(document.querySelector(e.dataset.modalTarget))}))})),overlay.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{n(e)}))})),t.forEach((e=>{e.addEventListener("click",(()=>{n(e.closest(".modal"))}))})),o.addEventListener("submit",(e=>{e.preventDefault(),a.newNote(e,s),function(){const e=a[s][a[s].length-1],t=m(e.title,e.date,e.description,e.id,e.projectFilter);document.getElementById("main-content").appendChild(t)}(),localStorage.setItem("myLibrary",JSON.stringify(a))}))})(),document.getElementById("today").addEventListener("click",(function(){s="today",r="Today",function(){let e=new Date,t=e.getFullYear(),o=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getDate().toString().padStart(2,"0");e=t+"-"+o+"-"+n,console.log(`CURRENT DATE: ${e}`);let c=document.querySelectorAll("[data-date]");console.log(c),c.forEach((function(t){let o=t.getAttribute("data-date");console.log(o);let n=t.closest(".card");console.log(n),n.style.display=o==e?"":"none"}))}(),f(),d(),f(),console.log(s)})),document.getElementById("week").addEventListener("click",(function(){s="tomorrow",r="This Week",function(){let e=new Date;e.setHours(0,0,0,0),document.querySelectorAll("[data-date]").forEach((function(t){let o=new Date(t.getAttribute("data-date"));o.setHours(0,0,0,0);let n=t.closest(".card"),c=Math.abs(o-e),l=Math.floor(c/864e5);n.style.display=l>=0&&l<=6?"":"none"}))}(),f(),d(),f(),console.log(s)})),document.getElementById("important").addEventListener("click",(function(){s="important",r="Important",function(){const e=document.getElementsByClassName("card");console.log(`cards fool: ${e}`);for(let t=0;t<e.length;t++){const o=e[t];let n=o.getAttribute("data-important");"true"===n?n=!0:"false"===n&&(n=!1),console.log(`project attribute fool: ${n}`),o.style.display=1==n?"":"none"}}(),f(),d(),f(),console.log(s)})),document.getElementById("completed").addEventListener("click",(function(){s="completed",r="Completed",function(){const e=document.getElementsByClassName("card");console.log(`cards fool: ${e}`);for(let t=0;t<e.length;t++){const o=e[t];let n=o.getAttribute("data-complete");"true"===n?n=!0:"false"===n&&(n=!1),console.log(`project attribute fool: ${n}`),o.style.display=1==n?"":"none"}}(),f(),d(),f(),console.log(s)})),document.getElementById("all").addEventListener("click",(function(){s="all",r="All Notes",function(){const e=document.getElementsByClassName("card");for(let t=0;t<e.length;t++)e[t].style.display=""}(),f(),d(),f(),console.log(s)})),function(){const e=localStorage.getItem("projectDirectory");console.log(`Wowwwwww: ${e}`);let t=[];if(e){let o=document.querySelector("#projects");t=JSON.parse(e),p=t,t.forEach((e=>{console.log(e);let n=e.key;console.log(`item.key value = ${n}`);let c=document.createElement("div");c.classList.add("directory"),c.dataset.project=`${e.key}`,c.classList.add("projectcard");let l=document.createElement("p");l.contentEditable=!0,l.innerHTML=e.title;const i=document.createElement("img");i.setAttribute("src","trash-can-outline.svg"),i.setAttribute("alt","Delete"),i.setAttribute("title","Delete"),i.classList.add("editProject"),i.dataset.delete=`${e.key}`,i.style.zIndex=2,c.addEventListener("click",(()=>{s=e.key,console.log(l.innerHTML),console.log(`INDEX: ${s}`),r=l.innerHTML,d(),f(),function(e){const t=document.getElementsByClassName("card");console.log(`cards fool: ${t}`),console.log(`testing/project ID fool: ${e}`);for(let o=0;o<t.length;o++){const n=t[o],c=n.getAttribute("data-project");console.log(`project attribute fool: ${c}`),n.style.display=c==e?"":"none"}}(n),l.contentEditable=!0,l.classList.add("activeproject"),l.focus()})),l.addEventListener("blur",(()=>{let t=l.innerHTML;l.classList.remove("activeproject"),l.classList.remove("current"),console.log("Blur event:",t),r=l.innerHTML,d();const o=e.key,n=p.findIndex((e=>e.key===o));-1!==n&&(p[n].title=t),localStorage.setItem("projectDirectory",JSON.stringify(p))})),i.addEventListener("click",(e=>{const o=i.dataset.delete;if(e.stopPropagation(),window.confirm("Are you sure you want to delete this project and all the notes it contains?")){const e=o,t=p.findIndex((t=>t.key===e));-1!==t&&p.splice(t,1),delete a[n],i.closest(".projectcard").remove(),document.querySelectorAll(`[data-project="${o}"]`).forEach((e=>{e.remove()}))}else console.log("delete cancel");console.log(`PROJECTDIR == ${t}`),localStorage.setItem("projectDirectory",JSON.stringify(p))})),c.appendChild(l),c.appendChild(i),o.appendChild(c)}))}}(),document.getElementById("newproject").addEventListener("click",(()=>{const e=i();let t={title:"new project",key:`${e}`};p.push(t),localStorage.setItem("projectDirectory",JSON.stringify(p)),console.log(p),console.log(t),a.newProject(e);let o=document.createElement("div");o.classList.add("directory"),o.dataset.project=`${e}`,o.classList.add("projectcard");let n=document.createElement("p");n.contentEditable=!0,n.innerHTML="New_Project";const c=document.createElement("img");c.setAttribute("src","trash-can-outline.svg"),c.setAttribute("alt","Delete"),c.setAttribute("title","Delete"),c.classList.add("editProject"),c.dataset.delete=`${e}`,c.style.zIndex=2,o.addEventListener("click",(()=>{s=e,console.log(n.innerHTML),console.log(`INDEX: ${s}`),r=n.innerHTML,d(),f(),function(){const e=document.getElementsByClassName("card");for(let t=0;t<e.length;t++){const o=e[t];o.classList.contains(s)?o.style.display="":o.style.display="none"}}(),n.contentEditable=!0,n.classList.add("activeproject"),n.focus()})),n.addEventListener("blur",(()=>{let t=n.innerHTML;n.classList.remove("activeproject"),n.classList.remove("current"),console.log("Blur event:",t);const o=e,c=p.findIndex((e=>e.key===o));-1!==c&&(p[c].title=t),r=n.innerHTML,d(),localStorage.setItem("projectDirectory",JSON.stringify(p))})),c.addEventListener("click",(t=>{const o=c.dataset.delete;t.stopPropagation(),window.confirm("Are you sure you want to delete this project and all the notes it contains?")?(delete a[e],c.closest(".projectcard").remove(),c.dataset.delete=`${e}`,Array.from(document.getElementsByClassName(o)).forEach((e=>{e.remove()}))):console.log("delete cancel")}));let l=document.querySelector("#projects");o.appendChild(n),o.appendChild(c),l.appendChild(o)})),function(){const e=localStorage.getItem("myLibrary");if(console.log(e),e){const t=JSON.parse(e);console.log(t),a.newNote=function(e,t){e.preventDefault();const{title:o,date:n,description:c}=e.target.elements,l=i();let a=t;this[t].push({title:o.value,date:n.value,description:c.value,id:l,projectFilter:a,complete:!1,important:!1}),console.log(this),modal.classList.remove("active"),overlay.classList.remove("active")},a.editNote=function(e,t,o,n){let c=e.getAttribute("data-id"),l=e.getAttribute("data-complete"),i=e.getAttribute("data-important"),s=e.getAttribute("data-project");console.log(`WOW: ${l}`),console.log(`WOWWWEE: ${i}`),"true"===l?l=!0:"false"===l&&(l=!1),"true"===i?i=!0:"false"===i&&(i=!1);let r={title:`${t}`,date:`${o}`,description:`${n}`,id:c,projectFilter:s,complete:l,important:i};for(let e in a)if(Array.isArray(a[e])){const t=a[e].findIndex((e=>e.id==c));if(-1!==t){a[e][t]=r;break}}},a.deleteNote=function(e){let t=e.closest("[data-id]").getAttribute("data-id");for(let e in a)if(Array.isArray(a[e])){const o=a[e].findIndex((e=>e.id==t));if(-1!==o)return void a[e].splice(o,1)}},a.newProject=function(e){a[e]=[]},a.getAllObjects=function(){const e=[];for(let t in this)this.hasOwnProperty(t)&&Array.isArray(this[t])&&e.push(...this[t]);return console.log(e),e},a.saveToLocalStorage=function(){localStorage.setItem("myLibrary",JSON.stringify(this))},Object.assign(a,t)}}(),function(){let e=a.getAllObjects();console.log(a.getAllObjects()),e.forEach((e=>{console.log(e);const t=m(e.title,e.date,e.description,e.id,e.projectFilter);document.getElementById("main-content").appendChild(t)}))}(),window.addEventListener("beforeunload",(function(){a.saveToLocalStorage()}));let y=!1;function f(e){const t=document.querySelectorAll(".directory"),o=e.target;o.classList.contains("current")||(o.classList.add("current"),t.forEach((e=>{e!==o&&e.classList.contains("current")&&e.classList.remove("current")})))}document.getElementById("icon").addEventListener("click",(()=>{const e=document.getElementById("navbar");0==y?(e.style.transform="translateX(0%)",e.classList.add("active"),y=!0):(e.style.transform="translateX(-100%)",e.classList.remove("active"),y=!1)})),document.addEventListener("click",(e=>{const t=document.getElementById("navbar"),o=document.getElementById("icon");!t.contains(e.target)&&e.target!==o&&y&&(t.style.transform="translateX(-100%)",t.classList.remove("active"),y=!1)})),document.querySelectorAll(".directory").forEach((e=>{e.addEventListener("click",f)}))})();
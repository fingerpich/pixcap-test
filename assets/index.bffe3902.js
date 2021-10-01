var O=Object.defineProperty,A=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var g=(t,e,o)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,h=(t,e)=>{for(var o in e||(e={}))N.call(e,o)&&g(t,o,e[o]);if(I)for(var o of I(e))B.call(e,o)&&g(t,o,e[o]);return t},b=(t,e)=>A(t,D(e));import{t as H,h as C,s as G}from"./vendor.b5fedcb2.js";const R=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};R();class ${constructor(){this.history=[],this.pointer=-1}add(e){this.pointer<this.history.length-1&&(this.history=this.history.slice(0,this.pointer+1)),this.history.push(e),this.pointer++}undo(){return this.pointer>-1&&this.pointer--,this.history[this.pointer+1]}redo(){return this.pointer+1<this.history.length&&this.pointer++,this.history[this.pointer]}}function q(t,e){if(t.uniqueId===e)return{employee:t};if(t.subordinates[e])return{employee:t.subordinates[e],supervisor:t};for(let o in t.subordinates)if(t.subordinates.hasOwnProperty(o)){const i=t.subordinates[o],n=q(i,e);if(n)return n}}function w(t){const e=t.subordinates.reduce((o,i)=>(o[i.uniqueId]=w(i),o),{});return b(h({},t),{subordinates:e})}function S(t){const e=Object.values(t.subordinates).map(S);return b(h({},t),{subordinates:e})}class P{constructor(e){this.ceo=w(e),this.history=new $}findEmployee(e){return q(this.ceo,e)||{}}move(e,o,i){if(e==o)return;const{supervisor:n,employee:r}=this.findEmployee(e),{employee:a}=this.findEmployee(o);if(!r)throw`There is not any employee with ID ${e}`;if(!n)throw"According to the given algorithem we are not able to move the root node";if(!a)throw`There is not any supervisor with ID ${e}`;delete n.subordinates[e],n.subordinates=h(h({},n.subordinates),r.subordinates),a.subordinates[e]=r;const u=Object.keys(r.subordinates);if(r.subordinates={},!i){const p={employeeID:e,prevSupervisorID:n.uniqueId,nextSupervisorID:o,employeeSubordinatesIds:u};this.history.add(p)}}undo(){const e=this.history.undo();if(e){const{employeeID:o,prevSupervisorID:i,employeeSubordinatesIds:n}=e,{employee:r}=this.findEmployee(i),{supervisor:a,employee:u}=this.findEmployee(o);if(!u)throw`There is not any employee with ID ${o}`;if(!r)throw"According to the given algorithem we are not able to move the root node";if(!a)throw`There is not any supervisor with ID ${o}`;delete a.subordinates[u.uniqueId],n.forEach(p=>{const f=r.subordinates[p];f||console.log(p,n,r.subordinates),u.subordinates[f.uniqueId]=f,delete r.subordinates[p]}),r.subordinates[u.uniqueId]=u}}redo(){const e=this.history.redo();if(e){const{employeeID:o,nextSupervisorID:i}=e;this.move(o,i,!0)}}}const W={uniqueId:1,name:"Mark Zuckerberg",subordinates:[{uniqueId:2,name:"Sarah Donald",subordinates:[{uniqueId:3,name:"Cassandra Reynolds",subordinates:[{uniqueId:4,name:"Mary Blue",subordinates:[]},{uniqueId:5,name:"Bob Saget",subordinates:[{uniqueId:6,name:"Tina Teff",subordinates:[{uniqueId:7,name:"Will Turner",subordinates:[]}]}]}]}]},{uniqueId:8,name:"Tyler Simpson",subordinates:[{uniqueId:9,name:"Harry Tobs",subordinates:[{uniqueId:10,name:"Thomas Brown",subordinates:[]}]},{uniqueId:11,name:"George Carrey",subordinates:[]},{uniqueId:12,name:"Gary Styles",subordinates:[]}]},{uniqueId:13,name:"Bruce Willis",subordinates:[]},{uniqueId:14,name:"Georgina Flangy",subordinates:[{uniqueId:15,name:"Sophie Turner",subordinates:[]}]}]},T=900,x=450;function j(t,e,o,i){const n=S(e),r=H().size([x,T]);let a=C(n,s=>s.subordinates);const u=r(a);t.selectAll(".node").data(u.descendants(),s=>s.data.uniqueId).enter().append("g").on("click",s=>console.log(s.data)).attr("class",s=>"node"+(s.children?" node--internal":" node--leaf")).append("text").attr("dy","1em").text(s=>s.data.uniqueId+" - "+s.data.name),t.selectAll(".node").attr("transform",s=>"translate("+s.y+","+s.x+")").attr("class",s=>"node"+(s.data.uniqueId===o?" nextEmployee":"")+(s.data.uniqueId===i?" nextSupervisor":""))}const y=new P(W),E=G("body"),k=E.append("div").attr("class","controls"),m=k.append("div").attr("class","moveControls"),L=k.append("div").attr("class","history");function v(){return Math.round(Math.random()*13+2)}function c(){j(F,y.ceo,l,d)}L.append("button").text("Undo").on("click",()=>{y.undo(),c()});L.append("button").text("Redo").on("click",()=>{y.redo(),c()});m.append("label").text("Employee Id :");m.append("input").attr("class","empId").attr("type","number").on("input",t=>{l=+t.target.value,c()});m.append("button").text("-> Move ->").on("click",()=>{console.log(l,d),y.move(l,d),setTimeout(()=>{M(),c()},500),c()});m.append("label").text("Supervisor Id :");m.append("input").attr("class","supId").attr("type","number").on("input",t=>{d=+t.target.value,c()});let l,d;function M(){for(l=v(),d=v();d===l;)d=v();document.querySelector("input.empId").value=l+"",document.querySelector("input.supId").value=d+""}M();const F=E.append("svg").attr("viewBox","0 0 900 450").attr("preserveAspectRatio","xMinYMin meet").attr("width",T).attr("height",x);c();

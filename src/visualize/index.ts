import EmployeeOrgApp from "../EmployeeOrgApp"
import { ceo } from "../../data"
import { updateD3Tree, WIDTH, HEIGHT } from "./update-d3"
import * as d3 from "d3"
import "./index.scss"

const app = new EmployeeOrgApp(ceo)

const body = d3.select("body")
const controls = body.append("div").attr("class", "controls")
const moveControls = controls.append("div").attr("class", "moveControls")
const history = controls.append("div").attr("class", "history")

function generateRandomID() {
  return Math.round(Math.random() * 13 + 2);
}
function updateD3() {
  updateD3Tree(svg, app.ceo, employeeID, supervisorID)
}
//Undo Button
history.append("button").text("Undo").on("click", () => {
  app.undo()
  updateD3()
})
//Redo Button
history.append("button").text("Redo").on("click", () => {
  app.redo()
  updateD3()
})

//employeeID input
moveControls.append("label").text("Employee Id :")
moveControls.append("input").attr("class", "empId").attr("type", "number")
  .on("input", e => { employeeID = +e.target.value; updateD3(); })

//Move Button
moveControls.append("button").text("-> Move ->").on("click", () => {
  console.log(employeeID, supervisorID)
  app.move(employeeID, supervisorID)
  setTimeout(() => {
    randomfill()
    updateD3()
  }, 500)
  updateD3()
})
//supervisorID input
moveControls.append("label").text("Supervisor Id :")
moveControls.append("input").attr("class", "supId").attr("type", "number")
  .on("input", e => { supervisorID = +e.target.value; updateD3(); })


let employeeID: number;
let supervisorID: number;
function randomfill() {
  employeeID = generateRandomID();
  supervisorID = generateRandomID();
  while (supervisorID === employeeID) {
    supervisorID = generateRandomID();
  }
  (<HTMLInputElement>(document.querySelector("input.empId")!)).value = employeeID+"";
  (<HTMLInputElement>(document.querySelector("input.supId")!)).value = supervisorID+"";
}
randomfill()

const svg = body.append("svg")
  .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)

updateD3()

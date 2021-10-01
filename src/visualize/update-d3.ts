import * as d3 from "d3"
import { convertLookupToList } from "../utils/convert-to-lookup"

export const WIDTH = 900;
export const HEIGHT = 450;

export function updateD3Tree(svg: any, tree: any, nextEmployeeID:number, nextSupervisorID: number) {
  const treeData = convertLookupToList(tree)
  const treemap = d3.tree().size([HEIGHT, WIDTH-100]);
  let h = d3.hierarchy(treeData, d => d.subordinates);
  const nodes = treemap(h);

  const dataNodes = svg.selectAll(".node")
    .data(nodes.descendants(), (d: any) => d.data.uniqueId)
  const enterNode = dataNodes
    .enter().append("g")
      .on("click", (d: any) => console.log(d.data))
      .attr("class", (d: any) => "node" + (d.children ? " node--internal" : " node--leaf"))

      enterNode.append("text")
        .attr("dy", "1em")
        .text((t: any) => t.data.uniqueId + " - " + t.data.name  )

  svg.selectAll(".node")
    .attr("transform", (d: any) => "translate(" + d.y + "," + d.x + ")")
    .attr("class", (d: any) => 
      "node"+ 
      (d.data.uniqueId === nextEmployeeID?" nextEmployee":"") +
      (d.data.uniqueId === nextSupervisorID?" nextSupervisor":"")
    )
}
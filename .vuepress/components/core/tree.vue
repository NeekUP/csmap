<template>
  <div>
    <svg ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import mapData from '../../../tree/map.json'
export default {
  data() {
    return {
      width: 954,
      modelex: null,
      data: mapData[0],
    };
  },
  mounted: function () {
    this.draw();
  },
  methods: {
    draw: function () {
      const root = this.tree(this.data);

      let x0 = Infinity;
      let x1 = -x0;
      root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3
        .select(this.$refs.svg)
        .attr("viewBox", [0, 0, this.width, x1 - x0 + root.dx * 2]);

      const g = svg
        .append("g")
        //.attr("font-family", "sans-serif")
        //.attr("font-size", 14)
        .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

      const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#42b983")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 3)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr(
          "d",
          d3
            .linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x)
        );

      const node = g
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      node
        .append("circle")
        .attr("fill", (d) => (d.children ? "#555" : "#999"))
        .attr("r", 2.5);

      // node
      //   .append("svg:foreignObject")
      //   .attr("height", "24px")
      //   .attr("width", "150px")
      //   .attr("x", (d) => (d.children ? -6 : 6))
      //   .attr("y", (d) => (d.children ? 0 : -14))
      //   .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      //   .append("xhtml:div")
      //   .html((d) => this.link(d.data))
      //   .attr("stroke", "white");

      node
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d.children ? -6 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        .html((d) => `<a href="${d.data.url}">${d.data.name}</a>`)
        .clone(true)
        .lower()
        .attr("stroke", "white");

      //return svg.node();
    },
    link: function (data) {
      return `<a href="http://ya.ru" >${data.name}</a>`;
    },
    tree: function (data) {
      const root = d3.hierarchy(data);
      root.dx = 30;
      root.dy = this.width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    },
  },
};
</script>

<style>
</style>
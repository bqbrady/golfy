import React, { Component } from 'react';
import './Style/Scatter.css';
import * as d3 from "d3";
import d3Tip from "d3-tip";
import test from '../data/predictions_test.csv'

class Scatter extends Component {
 componentDidMount() {
   this.drawChart();
 }

 drawChart() {
    var margin = {
        top: 50,
        right: 150,
        bottom: 50,
        left: 150
    },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]).nice();

    var y = d3.scaleLinear()
        .range([height, 0]).nice();

    var xAxis = d3.axisBottom(x)
        .tickSize(-height);

    var yAxis = d3.axisLeft(y)
        .tickSize(-width);

    var xCat = "X",
        yCat = "Y";

   d3.csv(test).then((data) => {
     console.log(data)
     data.forEach(function(d) {
        d.X = +d.X;
        d.Y = +d.Y;
        d.r = +d.r;
        d.g = +d.g;
        d.b = +d.b;
        d.a = +d.a;
        d.LocationScorer = d.LocationScorerAgg;
        d.Distance = +d.Distance;
        d.pred = +d.pred;
    });
    var xMax = d3.max(data, function(d) {
            return d[xCat];
        }) + 25,
        xMin = d3.min(data, function(d) {
            return d[xCat];
        }) - 25,
        yMax = d3.max(data, function(d) {
            return d[yCat];
        }) + 25,
        yMin = d3.min(data, function(d) {
            return d[yCat];
        }) - 25;
    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    var tip = d3Tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
            return d["LocationScorer"] + "<br>"
                    + "Distance: " + Math.round(d["Distance"]) + " Yards<br>"
                    + "Expected Strokes: " + d["pred"].toFixed(2);
        });

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.call(tip);
    svg.append("rect")
        .attr("width", width)
        .attr("height", height);
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width/2)
        .attr("y", margin.bottom-15)
        .style("font-size","16px")
        .style("text-anchor", "middle")
        .style("fill", "steelblue")
        .style("font-weight", "bold")
        .text("X Coordinate");
    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("color", "blue")
        .attr("y", -margin.left+80)
        .attr("x", -height / 2)
        .attr("dy", "1.5em")
        .style("font-size","16px")
        .style("text-anchor", "middle")
        .style("fill", "steelblue")
        .style("font-weight", "bold")
        .text("Y Coordinate");
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "steelblue")
        .style("font-weight", "bold")
        .text("TPC Sawgrass Hole 5, Round 1");

    var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);
    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");
    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);
    objects.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .classed("dot", true)
        .attr("r", 3)
        .attr("cx", function(d) {
          return x(d[xCat]);
      })
        .attr("cy", function(d) {
          return y(d[yCat]);
      })
      .style("fill", function(d) {
        return d3.rgb(d["r"]*255, d["g"]*255, d["b"]*255, d["a"]);
    })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
   });

  }
 render(){
   return <div align="center" id="scatter"></div>
 }
}

export default Scatter;

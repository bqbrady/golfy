import React, { Component } from 'react';
import './Style/BarChart.css';
import * as d3 from "d3";
import test from '../data/test.csv'

class BarChart extends Component {
 componentDidMount() {
   this.drawChart();
 }

 drawChart() {
   var margin = {top: 20, right: 30, bottom: 30, left: 40},
       width = 960 - margin.left - margin.right,
       height = 500 - margin.top - margin.bottom;

   var x = d3.scaleBand()
     .range([0, width])
     .round(.1);

   var y = d3.scaleLinear()
       .range([height, 0]);

   var xAxis = d3.axisBottom(x)

   var yAxis = d3.axisLeft(y)


   var chart = d3.select(".chart")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

   d3.csv(test).then((data) => {
     x.domain(data.map(function(d) { return d.name; }));
     y.domain([0, d3.max(data, function(d) { return d.value; })]);

     chart.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

     chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

     chart.selectAll(".bar")
         .data(data)
       .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return x(d.name); })
         .attr("y", function(d) { return y(d.value); })
         .attr("height", function(d) { return height - y(d.value); })
         .attr("width", x.bandwidth());


   });

  }
 render(){
   return <svg class="chart" id={"#" + this.props.id}></svg>
 }
}

export default BarChart;

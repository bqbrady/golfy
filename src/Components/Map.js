import React, { Component } from 'react';
import * as d3 from "d3";
import './Style/Map.css';
import states from "../data/states.json";
import node_data from "../data/nodes.json";

class Map extends Component {
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
    width = 720,
    height = 450,
    outerWidth = 1000,
    outerHeight = 500,
    outerWidth = width + margin.left + margin.right,
    outerHeight = height + margin.top + margin.bottom;

    var svg = d3.select('#map')
        .attr('class', 'svg-container')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("width", width)
          .attr("height", height);

    console.log(states);

    var projection = d3.geoAlbers()
        .fitSize([width, height], states);
        // .center([-91.5, 40])
        // .rotate([4.4, 0])
        // .parallels([50, 60])
        // .scale(300)
        // .translate([width / 2, height / 2]);

    var path = d3.geoPath()
      .projection(projection);

    var nodes = node_data.nodes;

    console.log(nodes["[2001:41d0:2:334e::]:8333"].slice(8, 10));


    svg.selectAll('path')
      .data(states.features)
    .enter()
      .append('path')
      .attr("d", path)
      .attr('class', function(d) {return d.properties.STATE_ABBR});

    svg.selectAll("circle")
  		.data(d3.keys(nodes))
    .enter()
  		.append("circle")
      // .attr("class", function (d) { return nodes[d].slice(9, 8); })
      .attr("cx", function (d) { return projection(nodes[d].slice(8, 10).reverse())[0]; })
      .attr("cy", function (d) { return projection(nodes[d].slice(8, 10).reverse())[1]; })
  		.attr("r", "2px")
  		.style("fill", function(d) {
                  if (nodes[d][7] == "US") {return "green"}
                  else 	{ return "none" }
            ;})

    // svg.selectAll(".subunit")
    //   .data(topojson.feature(states, states.objects.subunits).features)
    // .enter().append("path")
    //   .attr("class", function(d) { return "subunit " + d.id; })
    //   .attr("d", path);

  }
 render(){
   return <svg id="map"></svg>
 }
}
//

export default Map;

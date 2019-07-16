import React, { Component } from 'react';
import * as axios from "axios";
import * as d3 from "d3";
import './Style/Price.css';


class Price extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
    };
  }

  drawChart()  {
    var limit = 25,
        duration = 5000,
        now = new Date(Date.now() - duration);

    var margin = {
        top: 50,
        right: 150,
        bottom: 50,
        left: 150
    },
    outerWidth = 1000,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

    var btc = {
        value: 5000,
        data: d3.range(limit).map(function() {
            return 5000
        })
    };

    var x = d3.scaleTime()
        .domain([now - (limit - 2), now - duration])
        .range([0, width]).nice();

    var y = d3.scaleLinear()
        .range([height, 0]).nice();

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d, i) {
            return x(now - (limit - 1 - i) * duration)
        })
        .y(function(d) {
            return y(d)
        });

    var svgContainer = d3.select('#price')
        .append('svg')
        .attr('class', 'svg-container')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
        .append("g")
        .attr('class', 'inner-container')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = svgContainer
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(x.axis = d3.axisBottom(x).tickSize(5));

    var yAxis = svgContainer
        .append("g")
        .attr('class', 'y-axis')
        .call(y.axis = d3.axisLeft(y).tickSize(5))
        .attr("x", 0);

    xAxis.append("text")
        .classed("label", true)
        .attr("x", width/2)
        .attr("y", 20)
        .attr("dy", "1.5em")
        .style("font-size","16px")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .style("font-weight", "bold")
        .text("Time");

    yAxis.append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -80)
        .attr("dy", "1.5em")
        .style("font-size","16px")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .style("font-weight", "bold")
        .text("Price");

    svgContainer.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "black")
        .style("font-weight", "bold")
        .text("Bitcoin Price");

    var path = svgContainer
        .append('g')
        .attr("clip-path", "url(#clip)")
        .append('path')
        .data([btc.data])
        .attr('class', 'btc-price')
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", 5);

    svgContainer.append("defs").append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", width)
        .attr("height", height);

    function tick() {
        now = new Date()

        axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD")
          .then(results => {
            return results.data.data.amount;
          })
          .then(results => {
            btc.data.push(parseFloat(results));
          });

        // Shift domain
        x.domain([now - (limit - 2) * duration, now - duration])
        console.log(Math.max(...btc.data))
        y.domain([Math.min(...btc.data)-10, Math.max(...btc.data)+10])

        // Slide x-axis left
        xAxis.transition()
            .ease(d3.easeLinear)
            .duration(duration)
            .call(x.axis)

        yAxis.transition()
            .ease(d3.easeLinear)
            .duration(duration)
            .call(y.axis)

        // Slide paths left
        path.attr("d", line)
            .attr('transform', null)
            .transition()
            .ease(d3.easeLinear)
            .duration(duration)
            .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
            .on('end', tick)

        btc.data.shift()
    }
    tick()
  }


  componentDidMount() {
    this.drawChart();
    // setInterval(this.updateData, 5000);
  }

  render() {
    //return <div>{this.state.amount}</div>
    return <div id="price"></div>
  }
}

export default Price;

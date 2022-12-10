//Attack
//Create variables with null
//link data through api
//fill in nulls
//scale for gdp is in billions

const w = 1200;
const h = 475;
const padding = 50;

const dataSearch = fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').
then(response => response.json()).
then(data => {

  const dataset = data.data.map((v, i) => [v[0], v[1]]);

  const svg = d3.select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  console.log(dataset);

  const xScale = d3.scaleLinear().
  domain((d, i) => [new Date(d[0]), new Date(d[0])]).
  range([0, w - 2 * padding]);

  const yScale = d3.scaleLinear().
  domain([0, d3.max(dataset, d => d[1])]).
  range([h - padding, 0]);

  let xAxis = d3.axisBottom(xScale).
  tickFormat(function (date) {
    if (d3.timeYear(date) < date) {
      return d3.timeFormat('%b')(date);
    } else {
      return d3.timeFormat('%Y')(date);
    }
  });

  let yAxis = d3.axisLeft(yScale);

  svg.append("g").
  attr("id", "x-axis").
  attr("transform", "translate(" + padding + ", " + (h - 0.5 * padding) + ")").
  call(xAxis);

  svg.append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + padding + ", " + 0.5 * padding + ")").
  call(yAxis);


  svg.selectAll("rect").
  data(dataset).
  enter().
  append("rect")
  // .attr('class', 'bar')
  .attr('date', (d, i) => d[0]).
  attr('gdp', (d, i) => d[1]).
  attr('width', (d, i) => xScale(d[0])).
  attr('height', (d, i) => yScale(d[1])).
  attr('x', (d, i) => xScale(d[0])).
  attr('y', (d, i) => yScale(d[1]));
  // .append('title')
  // .attr('id', 'tooltip')
  // .text((d) => d[0])


});
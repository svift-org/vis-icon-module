SVIFT.vis.icon = (function (data, xml, container) {
   // Module object
  var module = SVIFT.vis.base(data, container);

  //Grid Function taken from https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739/bd1f4c0c33d8af6f64535b7963b0da2e6499fc31
 
  module.d3config = {
    ease:d3.easeCubicInOut, 
    // interpolate: d3.interpolate(0,data.data.data[0])
  };


  module.setup = function () {


    module.d3config.iconRow = module.g.append('g').selectAll(".row")
      .data(data.data.data)
      .enter().append("g")
      // .attr("transform","translate(80,0)")
      .attr("class", "row");

    module.d3config.rowContent = module.d3config.iconRow
      // .data(function(d) { console.log(d); return d; })
      // .enter()
      .append("rect")
      .attr("class","content")
      .style("fill-opacity", "0")
      .style("stroke", "#000")


    module.d3config.rowText = module.d3config.iconRow
      .append("text")
      .text(function(d,i) { return d[0]})
      .attr("font-family", "sans-serif")
      .attr("fill", "#71609B")
      // .attr("text-anchor", "middle");

  };


  module.resize = function () {

    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right,
    height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom;
    var maxSize = Math.min(width,height);
    var rowHeight = maxSize / (data.data.data.length);

    //Move every icon row down by row height
    module.d3config.iconRow.attr("transform",function(d,i) { return "translate(0,"+rowHeight * i+")"})

    module.d3config.rowText.attr("transform",function(d,i) { return "translate(0,"+rowHeight * i+")"})

    module.d3config.rowContent
      .attr("x", function(d,i) { return 0 })
      .attr("y", 10)
      .attr("width", width)
      .attr("height", rowHeight)

    // //ToDo: prevent text from being cut out
    // var fontSize = cellSize/1.5;
    // module.d3config.text
    //   .attr("x", maxSize / 2)
    //   .attr("y", maxSize + fontSize)
    //   .attr("font-size", fontSize)


    // document.body.appendChild(xml.documentElement);


  };

  module.drawBars = function(t){

    // var interpolation = Math.round(module.d3config.interpolate(module.d3config.ease(t))) -1;
    // var rects = d3.selectAll("rect")
    //     .filter(function(d, i) { return i <= interpolation; })
    //     .style("fill", "#71609B")

  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });


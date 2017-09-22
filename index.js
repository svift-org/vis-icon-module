SVIFT.vis.icon = (function (data, xml, container) {

   // Module object
  var module = SVIFT.vis.base(data, container);

 
  module.d3config = {
    ease:d3.easeCubicInOut, 
    // interpolate: d3.interpolate(0,data.data.data[0])
    amountIcons: 10,
    interpolate: []
  };


  module.setup = function () {

    module.d3config.interpolate = d3.interpolate(0,module.d3config.amountIcons);

    //setup main title
    module.d3config.mainTitle = module.g.append('g')
      .append("text")
      .text(data.data.title)
      .attr("id", "title")
      .attr("fill", "#71609B")
      .attr("font-family", "sans-serif")


    //setup container for all rows
    module.d3config.iconRowContainer = module.g.append('g')
      .attr("id", "rowContainer")

    //setup a container for each row
    module.d3config.iconRow = module.d3config.iconRowContainer
      .selectAll(".row")
      .data(data.data.data)
      .enter().append("g")
      .attr("class", "row");

    //Set up desctription text
    module.d3config.rowText = module.d3config.iconRow
      .append("text")
      .text(function(d,i) { return d[0].toUpperCase()} )
      .attr("font-family", "sans-serif")
      .attr("fill", "#71609B")

    //Set up value text
    module.d3config.rowValueText = module.d3config.iconRow
      .append("text")
      .text(function(d,i) { return d[1]} )
      .attr("font-family", "sans-serif")
      .attr("fill", "#71609B")

    //Check out how many icons are needed for each entry
    var IconData = function(d){
      var data = [];
      var noIcons = Math.round(d[1]/module.d3config.amountIcons);
      for (var i = 0; i < noIcons; i++) {
        data.push(i);
      }
      return data;
    }


    module.d3config.icons = module.d3config.iconRow
      .append('g')
      .selectAll(".icons")
      .data(function(d){return IconData(d)})
      .enter()
      .append(function(d){return xml.documentElement.cloneNode( true );})
      .attr("display", "none")

    module.d3config.icons.selectAll("g").style("stroke", "#71609B") //just in case: chnage the stroke color of icon


    // module.d3config.rowRects = module.d3config.iconRow
    //   .append("rect")
    //   .attr("class","content")
    //   .style("fill-opacity", "0")
    //   .style("stroke", "#E2E2E2")
  };


  module.resize = function () {

    var amountRows = data.data.data.length;
    
    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right;
    var height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom;

    var textSize = width/15;
    var heightAllRows = height - textSize;
    var maxSize = Math.min(width,heightAllRows);
    var amountRows = data.data.data.length;
    var rowHeight = maxSize / amountRows;

    module.d3config.mainTitle
      .attr("y",textSize)
      .attr("x",width/2)
      .attr("text-anchor", "middle")
      .attr("font-size",width/15)

    module.d3config.iconRowContainer
      .attr("transform","translate(0,"+textSize+")")

    //Set position of every row
    module.d3config.iconRow
      .attr("transform",function(d,i) { return "translate(0,"+rowHeight * i+")"})


    //Calc the sizes
    var maxTextWidth = width * 0.3;
    var maxValueWidth = width * 0.1;


    //Fit text within a row
    module.d3config.rowText
      .attr("y",(rowHeight/2) + (rowHeight/8))
      .attr("font-size", function(d) {return rowHeight/8})
      // .attr("font-size", function(d) { return this.getComputedTextLength() + "px"; })

    //Value Text - the number
    module.d3config.rowValueText 
      .attr("y",(rowHeight/2) + (rowHeight/8))
      .attr("x",maxTextWidth )
      .attr("font-size",rowHeight/8)


    var allIconsWidth = width * 0.6;
    var nonIconsWidth = width * 0.4;
    var amountOfPadding = 0.2;
    var iconWidth = (allIconsWidth / module.d3config.amountIcons);
    var iconPadding = iconWidth*amountOfPadding;
    iconWidth = iconWidth - iconPadding;

    module.d3config.icons
      .attr("y",(rowHeight/2) - (iconWidth /4) )
      .attr("x", function(d,i) {return i * iconWidth + nonIconsWidth + (i*iconPadding) }) //(i*2) 
      .attr("font-size",rowHeight/4)
      .attr("height",iconWidth)
      .attr("width",iconWidth);


    // module.d3config.rowRects
    //   .attr("width", width)
    //   .attr("height", rowHeight)

  };

  module.drawBars = function(t){

    var interpolation = Math.round(module.d3config.interpolate(module.d3config.ease(t)));
    var icons = module.d3config.icons
        .filter(function(d, i) {return i <= interpolation; })
        .attr("display", "show")
  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });


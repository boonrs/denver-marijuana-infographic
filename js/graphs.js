function populateVenn(id){
  var csvFile = "data/" + id + ".csv"
  var selector = "#" + id
  d3.csv(csvFile, function(data){
    // define sets and set set intersections
    var formatted = formatSets(data);

    // // get positions for each set
    var sets = venn.venn(formatted.sets, formatted.overlaps);

    venn.drawD3Diagram(d3.select(selector), sets, "100%", "100%");
  });
}

function formatSets(data) {
  var sets = [];
  var overlaps = [];
  var setMap = {};
  // By getting sets seperately from overlaps we ensure we have all data to calculate overlaps
  // if the data isn't ordered appropriately
  $.each(data, function(index, value){
    var set = value.label.split('and');
    if(set.length == 1){
      sets.push(value);
      setMap[value.label.trim()] = sets.length - 1;
    }
  });

  $.each(data, function(index, value){
    var set = value.label.split('and');
    if(set.length > 1){
      var setIndexes = [];
      $.each(set, function(index, setName){
        setIndexes.push(setMap[setName.trim()]);
      });
      overlaps.push({"sets": setIndexes, "size": value.size})
    }
  });

  return {"sets" : sets, "overlaps" : overlaps};
}

function populatePieGraph(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, '100%', '100%');
  d3.csv(csvFile, function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds (0, 60, "80%", "80%");
    myChart.addMeasureAxis("p", "value");
    var ring = myChart.addSeries("label", dimple.plot.pie);

    // Tooltip
    ring.getTooltipText = function (e) {
      return [ e.aggField[0], formatPercent(e.piePct) ];
    };

    // TODO: Investigate moving these colors to css
    myChart.defaultColors = [
      new dimple.color("#06191e"),
      new dimple.color("#468394"),
      new dimple.color("#124b5b"),
      new dimple.color("#a3c1ca")
    ];
    myChart.addLegend("0",20,"50%","100%","left");
    myChart.draw();
  });
}

function populateLineGraph(id, xTitle, yTitle, series) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, "100%", 500);
  d3.csv(csvFile, function(data) {

    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%");

    var x = myChart.addCategoryAxis("x", xTitle);
    x.addOrderRule("year");
    x.addOrderRule("q");
    x.title = xTitle.toUpperCase();

    var y = myChart.addMeasureAxis("y", yTitle);
    y.title = yTitle.toUpperCase();

    var lines = myChart.addSeries(series, dimple.plot.line);

    // Tooltip
    lines.getTooltipText = function (e) {
    return [e.aggField[0] + ' ' + e.cx, e.cy];
    };

    // TODO: 
    myChart.defaultColors = [
      new dimple.color("#06191e"),
      new dimple.color("#468394"),
      new dimple.color("#124b5b"),
      new dimple.color("#a3c1ca")
    ];

    var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    myChart.draw();

    // Rotate the X-axis labels
    x.shapes.selectAll("text").attr("transform", function (d) {
        return d3.select(this).attr("transform") + " translate(0, 20) rotate(-45)";
      });

    // Add a method to draw the chart on resize of the window.
    // Needs to be an anonymous to avoid conflicts with other resize functions
    $(window).resize(function(){
      // As of 1.1.0 the second parameter here allows you to draw
      // without reprocessing data. This saves a lot on performance
      // when you know the data won't have changed.
      myChart.draw(0, true);
    });
  });
}

function populateHorizontalStackedBarGraph(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, "100%", 500);
  d3.csv(csvFile, function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%")
    var x = myChart.addMeasureAxis("x", "revenue");
    x.title = "Revenue";

    var y = myChart.addCategoryAxis("y", "month");
    y.title = "Month";
    y.addOrderRule(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);

    var plotBar = myChart.addSeries("type", dimple.plot.bar);
    myChart.addLegend(60, 2, '80%', 50, "left");
    // var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    plotBar.barGap = .5;

    // TODO: Investigate pulling this from css
    myChart.defaultColors = [
      new dimple.color("#06191e"),
      new dimple.color("#468394"),
      new dimple.color("#124b5b"),
      new dimple.color("#a3c1ca")
    ];

    myChart.draw();
    // Add a method to draw the chart on resize of the window.
    // Needs to be an anonymous to avoid conflicts with other resize functions
    $(window).resize(function(){
      myChart.draw(0, true);
      myChart.addLegend(60, 2, '80%', 50, "left");
    });
  });
}

function populateStackedBarGraph(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, "100%", 500);
  d3.csv(csvFile, function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "78%");
    // Create Axes
    var x = myChart.addCategoryAxis("x", "Quarter" );
    x.addOrderRule("year");
    x.addOrderRule("q");

    var y = myChart.addMeasureAxis("y", "Total");

    var bars = myChart.addSeries("Series", dimple.plot.bar);

    // Tooltip
    bars.getTooltipText = function (e) {
      return [e.aggField[0] + ' ' + e.cx, e.cy];
    };
    // TODO: Investigate moving to css
    myChart.defaultColors = [
      new dimple.color("#06191e"),
      new dimple.color("#468394"),
      new dimple.color("#124b5b"),
      new dimple.color("#a3c1ca")
    ];

    var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    myChart.draw();

    // Rotate the X-axis labels
    x.shapes.selectAll("text").attr("transform", "translate(-30, 45) rotate(-45)");
    // Add a method to draw the chart on resize of the window.
    // Needs to be an anonymous to avoid conflicts with other resize functions
    $(window).resize(function(){
      // As of 1.1.0 the second parameter here allows you to draw
      // without reprocessing data. This saves a lot on performance
      // when you know the data won't have changed.
      myChart.draw(0, true);
    });
  });
}
function populatePieGraph(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, '100%', '100%');
  d3.csv(csvFile, function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.addMeasureAxis("p", "value");
    var ring = myChart.addSeries("label", dimple.plot.pie);

    // Tooltip
    ring.getTooltipText = function (e) {
      return [ e.aggField[0], formatPercent(e.piePct) ];
    };

    // TODO: Investigate moving these colors to css
    myChart.defaultColors = [
      new dimple.color("#b1dce8"),
      new dimple.color("#62b9d1"),
      new dimple.color("#2c7e95"),
      new dimple.color("#0f2a31")
    ];
    myChart.addLegend("0",20,"50%","100%","left");
    myChart.draw();
  });
}

function populateLineGraph(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  var svg = dimple.newSvg(selector, "100%", "100%");
  d3.csv(csvFile, function(data) {

    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%");

    var x = myChart.addCategoryAxis("x", "quarter");
    x.addOrderRule("year");
    x.addOrderRule("q");
    x.title = "Quarter";

    var y = myChart.addMeasureAxis("y", "revenue");
    y.title = "Revenue";

    var lines = myChart.addSeries("type", dimple.plot.line);

    // Tooltip
    lines.getTooltipText = function (e) {
    return [e.aggField[0] + ' ' + e.cx, e.cy];
    };

    // TODO: 
    myChart.defaultColors = [
    new dimple.color("#b1dce8"),
    new dimple.color("#62b9d1"),
    new dimple.color("#2c7e95"),
    new dimple.color("#0f2a31")
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
  var svg = dimple.newSvg(selector, "100%", 400);
  d3.csv(csvFile, function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%")
    var x = myChart.addMeasureAxis("x", "revenue");
    x.title = "Revenue";

    var y = myChart.addCategoryAxis("y", "month");
    y.title = "Month";
    y.addOrderRule(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);

    var plotBar = myChart.addSeries("type", dimple.plot.bar);
    myChart.addLegend(60, 2, 560, 20, "left");
    // var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    plotBar.barGap = .5;

    // TODO: Investigate pulling this from css
    myChart.defaultColors = [
      new dimple.color("#b1dce8"),
      new dimple.color("#62b9d1"),
      new dimple.color("#2c7e95"),
      new dimple.color("#0f2a31")
    ];

    myChart.draw();
    // Add a method to draw the chart on resize of the window.
    // Needs to be an anonymous to avoid conflicts with other resize functions
    $(window).resize(function(){
      myChart.draw(0, true);
    });
  });
}
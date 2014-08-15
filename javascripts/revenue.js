
$( document ).ready(function() {
  var big_number = {
    "total-alt": "$22,793,749",
    "total": "$22.79M",
    "bold_description": "Tax revenue from marijuana industry since 2010."
  };

  var description = "Sources of marijuana revenue in Q1 2014";

  revenuesSource("http://data.denvergov.org/dataset/city-and-county-of-denver-marijuana-sales-tax");
  revenueCount(big_number);
  revenueArea();
  revenueDonut(description);
});

function revenuesSource(url) {
  $("#revenue-source").attr('href', url);
}

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
}

function revenueDonut(description) {
  $("#revenue-donut-description").text(description);
  var svg = dimple.newSvg("#revenue-donut", '100%', '100%');
  d3.csv("data/revenue-current-quarter.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.addMeasureAxis("p", "value");
    var ring = myChart.addSeries("label", dimple.plot.pie);

    // Tooltip
    ring.getTooltipText = function (e) {
      return [ e.aggField[0], formatPercent(e.piePct) ];
    };


    ring.innerRadius = "50%";
    myChart.defaultColors = [
      new dimple.color("#4dddff"),
      new dimple.color("#b3eaf4")
    ];
    myChart.addLegend("0",20,"50%","100%","left");
    myChart.draw();
  });
}

function revenueArea(){
  var svg = dimple.newSvg("#revenue-area", "100%", "100%");

  d3.csv("data/revenue-over-time.csv", function(data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%");
    
    var x = myChart.addCategoryAxis("x", "quarter");
    x.addOrderRule("year");
    x.addOrderRule("q");

    
    var y = myChart.addMeasureAxis("y", "revenue");
    // y.tickFormat(d3.format("$"));
    var lines = myChart.addSeries("type", dimple.plot.line);

    // Tooltip
    lines.getTooltipText = function (e) {
      return [e.aggField[0] + ' ' + e.cx, e.cy];
    };


    x.title = "Quarter";
    y.title = "Revenue";
    myChart.defaultColors = [
      new dimple.color("#fff"),
      new dimple.color("#b3dce8")
    ];
    var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    myChart.draw();

    x.shapes.selectAll("text").attr("transform",
    function (d) {
      return d3.select(this).attr("transform") + " translate(0, 20) rotate(-45)";
    });

    // Add a method to draw the chart on resize of the window.
    // Needs to be an anonymous to avoid conflicts with other resize functions
    $(window).resize(function(){
      // As of 1.1.0 the second parameter here allows you to draw
      // without reprocessing data.  This saves a lot on performance
      // when you know the data won't have changed.
      myChart.draw(0, true);
    });
  });
}

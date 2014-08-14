
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

    // Styling: Change this Kavi!
    ring.innerRadius = "50%";
    myChart.defaultColors = [
      new dimple.color("#4dddff"),
      new dimple.color("#b3eaf4")
    ];
    myChart.addLegend("20%,20px","1%,20px","10%,20px","10%,20px");
    myChart.draw();
  });
}

function revenueArea(){
  var svg = dimple.newSvg("#revenue-area", 590, 450);

  d3.csv("data/revenue-over-time.csv", function(data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 505, 305);
    var x = myChart.addCategoryAxis("x", "quarter");
    x.addOrderRule("year");
    x.addOrderRule("q");
    var y = myChart.addMeasureAxis("y", "revenue");
    var lines = myChart.addSeries("type", dimple.plot.line);

    // Tooltip
    lines.getTooltipText = function (e) {
      return [e.aggField[0] + ' ' + e.cx, e.cy];
    };

    // Styling: Change this Kavi!
    x.title = "Quarter";
    y.title = "Revenue";
    myChart.defaultColors = [
      new dimple.color("#fff"),
      new dimple.color("#b3dce8")
    ];
    myChart.addLegend("10%,150px","1%,400px","10%,150px","10%,20px");
    myChart.draw();
  });
}


$( document ).ready(function() {
  var big_number = {
    "total": 160,
    "description_bold": "... marijuana related crimes have been reported this year.",
    "description": "This is the sum total of Industry and Nonindustry."
  };
  // crimeCount(big_number);
  // crimeOffenses();
  crimePossession();
});

function crimePossession() {
  var svg = dimple.newSvg("#crime-possession", 590, 600);
  d3.csv("data/open-crime.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 510, 330)
    var x = myChart.addCategoryAxis("x", "Quarter" );
    x.addOrderRule("year");
    x.addOrderRule("q");
    myChart.addMeasureAxis("y", "Total");
    var bars = myChart.addSeries("Series", dimple.plot.bar);

    // Tooltip
    bars.getTooltipText = function (e) {
      return [e.aggField[0] + ' ' + e.cx, e.cy];
    };

    // Styling: Change this Kavi!
    myChart.defaultColors = [
      new dimple.color("#e5e9ea"),
      new dimple.color("#8eb5bc"),
      new dimple.color("#287f93"),
      new dimple.color("#154651")
    ];
    myChart.addLegend("20%,20px","1%,20px","10%,20px","10%,20px");
    myChart.draw();
  });
}

function crimeOffenses() {
  var svg = dimple.newSvg("#crime-stacked", 590, 400);
  d3.csv("/data/offenses.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, 510, 330)
    var x = myChart.addCategoryAxis("x", ["Quarter", "Type"]);
    x.addOrderRule("year");
    x.addOrderRule("q");
    myChart.addMeasureAxis("y", "Total");
    var bars = myChart.addSeries("Type", dimple.plot.bar);

    // Tooltip
    bars.getTooltipText = function (e) {
      return [e.aggField[0] + ' ' + e.cx, e.cy];
    };

    // Styling: Change this Kavi!
    myChart.defaultColors = [
      new dimple.color("#e5e9ea"),
      new dimple.color("#8eb5bc"),
      new dimple.color("#287f93"),
      new dimple.color("#154651")
    ];
    myChart.addLegend("20%,20px","1%,20px","10%,20px","10%,20px");
    myChart.draw();
  });
}

function crimeCount(big_number) {
  $("#crime-number").text(big_number.total)
  $("#crime-number-strong").text(big_number.description_bold)
  $("#crime-number-description").text(big_number.description)
}



$( document ).ready(function() {
  var big_number = {
    "total": 160,
    "description_bold": "... marijuana related crimes have been reported this year.",
    "description": "This is the sum total of Industry and Nonindustry."
  };
  crimeSource("http://data.denvergov.org/dataset/city-and-county-of-denver-crime");
  // crimeCount(big_number);
  // crimeOffenses();
  crimePossession();
});

function crimeSource(url) {
  $("#crime-source").attr('href', url);
}

function crimePossession() {
  var svg = dimple.newSvg("#crime-possession", "100%", "100%");
  d3.csv("data/open-crime.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%");
    
    // Create Axes
    var x = myChart.addCategoryAxis("x", "Quarter" );
    x.addOrderRule("year");
    x.addOrderRule("q");
    var y = myChart.addMeasureAxis("y", "Total");

    //Create Bars
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
    
    // Create a legend
    var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    // var myLegend = myChart.addLegend("-100px", "30px", "100px", "-70px");

    // Draw the chart
    myChart.draw();
    

    // Rotate the X-axis labels
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


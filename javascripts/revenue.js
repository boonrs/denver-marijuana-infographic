
$( document ).ready(function() {
  var big_number = {
    "total-alt": "$3,588,964",
    "total": "$3.59M",
    "bold_description": "Tax revenue from marijuana industry for Q1 2014."
  };

  var description = "Sources of marijuana revenue in Q1 2014";

  revenuesSource("http://data.denvergov.org/dataset/city-and-county-of-denver-marijuana-sales-tax");
  revenueCount(big_number);
  revenueQuarterly();
  revenueMonthly();
});

function revenuesSource(url) {
  $("#revenue-source").attr('href', url);
}

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
}

function revenueMonthly(){
  var svg = dimple.newSvg("#revenue-monthly", "100%", 500);
  d3.csv("data/revenue-monthly.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(60, 30, "85%", "70%")
    var x = myChart.addMeasureAxis("x", "revenue");
    var y = myChart.addCategoryAxis("y", "month");
    x.title = "Revenue";
    y.title = "Month";
    y.addOrderRule(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    var plotBar = myChart.addSeries("type", dimple.plot.bar);
    myChart.addLegend(60, 2, 560, 20, "left");
    //  var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");
    plotBar.barGap = .5;
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

function revenueQuarterly(){
  var svg = dimple.newSvg("#revenue-area", "100%", 500);

  d3.csv("data/revenue-quarterly.csv", function(data) {
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
    
    // Styling
    myChart.defaultColors = [
      new dimple.color("#b1dce8"),
      new dimple.color("#62b9d1"),
      new dimple.color("#2c7e95"),
      new dimple.color("#0f2a31")
    ]; 
    
    // Create a legend
    var myLegend = myChart.addLegend("25%", "1%", "290px", "12px", "right");

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

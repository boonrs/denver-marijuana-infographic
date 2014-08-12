
$( document ).ready(function() {
  facilitiesSource("http://data.denvergov.org/dataset/city-and-county-of-denver-marijuana-facilities");
  facilitiesCount(facilities.big_number);
  facilitiesDonut(facilities.types);
});

function facilitiesSource(url) {
  $("#facilities-source").attr('href', url);
}

function facilitiesCount(big_number) {
  $("#facilities-number").text(big_number.total);
  $("#facilities-number-strong").text(big_number.bold_description);
  $("#facilities-number-description").text(big_number.description);
}

function facilitiesDonut(types) {
  d3.csv("data/facilities-source.csv", function(error, data) {
    nv.addGraph(function() {
      var width = 300, height = 400;
      var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
        .color(["#4dddff", "#b3eaf4"])
        .width(width).height(height);    //Set the height and width of the chart
        chart.legend.rightAlign(true)
        chart.legend.margin({top: 20, right: 20, bottom: 0, left: 0})
        ;

      d3.select("#facilities-donut")
        .append("svg")
        .datum(data)
        .transition().duration(350)
        .call(chart);
      return chart;
    });
  });
}
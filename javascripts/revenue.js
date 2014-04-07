
$( document ).ready(function() {
  revenueCount(revenue.big_number);
  revenueArea(revenue.over_time);
  revenueSource();
  employeesChart();
});

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
}

function revenueSource() {
  $("#revenue-donut-description").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
  d3.csv("data/revenue-source.csv", function(error, data) {
    nv.addGraph(function() {
      var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
        ;

      d3.select("#revenue-donut")
        .append("svg")
        .datum(data)
        .transition().duration(350)
        .call(chart);

      return chart;
    });
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesarea -->
function revenueArea(over_time) {
  $("#revenue-area").dxChart({
    dataSource: over_time.data,
    commonSeriesSettings: {
        type: "area",
        argumentField: over_time.argument
    },
    series: [
        { valueField: over_time.value1, name: over_time.value1_name },
        { valueField: over_time.value2, name: over_time.value2_name }
    ],
    title: over_time.title,
    argumentAxis:{
        valueMarginsEnabled: false
    },
  valueAxis:{
    label: {
      format: over_time.value_label
    }
  },
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    }
  });
}

function employeesChart() {
  d3.csv("data/employees.csv", function(error, data) {
    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.quarter })    //Specify the data accessors.
        .y(function(d) { return d.employees })
        .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
        .tooltips(true)        //Don't show tooltips
        .showValues(false)       //...instead, show the bar value right on top of each bar.
        .transitionDuration(350)
      ;

      var nvd3Formatted = [{
        key: "Employees",
        values: data
      }];

      d3.select('#revenue-bar')
        .append('svg')
        .datum(nvd3Formatted)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  });
}

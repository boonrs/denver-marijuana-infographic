
$( document ).ready(function() {
  revenueCount(revenue.big_number);
  revenueArea(revenue.over_time);
  revenueDonut(revenue.types);
  employeesChart();
});

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
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

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/piecustomappearancedoughnutwithselection -->
function revenueDonut(types) {
  $("#revenue-donut-description").text(types.description);

  $("#revenue-donut").dxPieChart({
    dataSource: types.data,
    palette: "Soft Pastel",
    title: types.title,
    legend: {
        horizontalAlignment: "right",
        verticalAlignment: "top",
        margin: 0
    },
    pointClick: function(point) {
        point.select();
    },
    series: [{
      type: "doughnut",
      argumentField: types.argument,
      valueField: types.value,
      hoverStyle: {
        color: "#ffd700" 
      }
    }]
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

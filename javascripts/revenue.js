
$( document ).ready(function() {
  revenueCount(revenue.total);
  revenueArea(revenue.over_time);
  revenueDonut(revenue.types);
});

function revenueCount(count) {
  $("#revenue-number").text(count);
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


$( document ).ready(function() {
  revenueCount(revenue.big_number);
  revenueArea(revenue.over_time);
  revenueDonut(revenue.types);
  revenueBar(revenue.employees);
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

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriessimplestsingle -->
function revenueBar(employees) {
  $("#revenue-employees").text(employees.description);

  $("#revenue-bar").dxChart({
    dataSource: employees.data,
    title: employees.title,
    series: {
        argumentField: employees.argument,
        valueField: employees.value,
        name: employees.value_name,
        type: "bar",
        color: 'white'
    }
  });
}

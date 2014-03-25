
$( document ).ready(function() {
  facilitiesCount(facilities.total);
  facilitiesLineGraph(facilities.over_time);
  facilitiesDonut(facilities.types);
  facilitiesBar(facilities.employees);
});

function facilitiesCount(count) {
  $("#facilities-number").text(count);
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartslineandpointseriesline -->
function facilitiesLineGraph(over_time) {
  $("#facilities-line").dxChart({
    dataSource: over_time.data,
    commonSeriesSettings: {
        argumentField: over_time.argument
    },
    series: [
        { valueField: over_time.value, name: over_time.value_name }
    ],
    argumentAxis:{
        grid:{
            visible: true
        }
    },
    tooltip:{
        enabled: true
    },
    title: over_time.title,
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    },
    commonPaneSettings: {
        border:{
            visible: true,
            right: false
        }       
    }
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/piesimpledoughnut -->
function facilitiesDonut(types) {
  $("#facilities-donut").dxPieChart({
    dataSource: types.data,
    title: types.title,
    tooltip: {
        enabled: true,
        percentPrecision: 0,
        customizeText: function() { 
            return this.valueText + " - " + this.percentText;
        }
    },
    legend: {
        horizontalAlignment: "right",
        verticalAlignment: "top",
        margin: 0
    },
    series: [{
        type: "doughnut",
        argumentField: types.argument,
        label: {
            visible: true,
            connector: {
                visible: true
            }
        }
    }]
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriessimplestsingle -->
function facilitiesBar(employees) {
  $("#facilities-bar").dxChart({
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


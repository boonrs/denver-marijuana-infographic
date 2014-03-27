
$( document ).ready(function() {

  facilitiesCount(facilities.big_number);
  facilitiesLineGraph(facilities.over_time);
  facilitiesDonut(facilities.types);
  facilitiesRetail(facilities.retail);
  facilitiesMedical(facilities.medical);
  facilitiesGrow(facilities.grow);
});

function facilitiesCount(big_number) {
  $("#facilities-number").text(big_number.total);
  $("#facilities-number-strong").text(big_number.bold_description);
  $("#facilities-number-description").text(big_number.description);
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

function facilitiesRetail(retail) {
    $("#facilities-retail").text(retail.title);
}

function facilitiesMedical(medical) {
    $("#facilities-medical").text(medical.title);
}

function facilitiesGrow(grow) {
    $("#facilities-grow").text(grow.title);
}
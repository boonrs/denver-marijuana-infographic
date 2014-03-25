
$( document ).ready(function() {
  crimeCount(crime.total);
  crimeStacked(crime.offenses);
});

function crimeCount(count) {
  $("#crime-number").text(count)
}

<!-- To theme: http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriesfullstacked -->
function crimeStacked(offenses) {
  $("#crime-stacked").dxChart({
    dataSource: offenses.data,
    commonSeriesSettings: {
        argumentField: offenses.argument,
        type: "fullStackedBar"
    },
    series: [
        { valueField: offenses.value1, name: offenses.value1_name },
        { valueField: offenses.value2, name: offenses.value2_name },
        { valueField: offenses.value3, name: offenses.value3_name },
        { valueField: offenses.value4, name: offenses.value4_name }
    ],
    legend: {
        verticalAlignment: "top",
        horizontalAlignment: "center",
        itemTextPosition: "right"
    },
    title: offenses.title,
    tooltip: {
        enabled: true,
        customizeText: function () {
            return this.percentText + " - " + this.valueText;
        }
    }
  });
}


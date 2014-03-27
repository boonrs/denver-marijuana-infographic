
$( document ).ready(function() {
  crimeCount(crime.big_number);
  crimeStacked(crime.offenses);
  crimeHandcuffs(crime.arrests);
  crimeSpeech(crime.speech);
});

function crimeCount(big_number) {
  $("#crime-number").text(big_number.total)
  $("#crime-number-strong").text(big_number.description_bold)
  $("#crime-number-description").text(big_number.description)
}

<!-- To theme: http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriesfullstacked -->
function crimeStacked(offenses) {
  $("#crime-stacked-description").text(offenses.description)
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

function crimeHandcuffs(handcuffs) {
    $("#crime-handcuffs").text(handcuffs.title);
}

function crimeSpeech(speech) {
    $("#crime-speech").text(speech.title);
}



$( document ).ready(function() {
  faqArea(faq.cases);
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
function faqArea(cases) {

  $("#faq-area").dxChart({
    title: cases.title,
    dataSource: cases.data,
    commonSeriesSettings: {
      type: "splineArea",
      argumentField: cases.argument
    },
    argumentAxis:{
      valueMarginsEnabled: false
    },
    series: [
      { valueField: cases.series1, name: cases.series1_name },
      { valueField: cases.series2, name: cases.series2_name },
      { valueField: cases.series3, name: cases.series3_name },
      { valueField: cases.series4, name: cases.series4_name },
      { valueField: cases.series5, name: cases.series5_name },
      { valueField: cases.series6, name: cases.series6_name },
      { valueField: cases.series7, name: cases.series7_name }
    ],
    legend: {
      verticalAlignment: "bottom",
      horizontalAlignment: "center"
    }
  });
}


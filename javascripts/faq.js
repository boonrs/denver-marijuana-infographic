
$( document ).ready(function() {
  faqArea(faq.cases);
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
function faqArea(cases) {

  var dataSource = [
    { company: "ExxonMobil", y2005: 362.53, y2004: 277.02},
    { company: "GeneralElectric", y2005: 348.45, y2004: 328.54},
    { company: "Microsoft", y2005: 279.02, y2004: 297.02},
    { company: "Citigroup", y2005: 230.93, y2004: 255.3},
    { company: "Royal Dutch Shell plc", y2005: 203.52, y2004: 173.54},
    { company: "Procted & Gamble", y2005: 197.12, y2004: 131.89}
  ];

  $("#faq-area").dxChart({
      title: cases.title,
      dataSource: cases.data,
      commonSeriesSettings: {
          type: "splineArea",
          argumentField: cases.argument
      },
      argumentAxis:{
          valueMarginsEnabled: true
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





$( document ).ready(function() {
  faqArea();
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
function faqArea() {
  var dataSource = [
    { company: "ExxonMobil", y2005: 362.53, y2004: 277.02},
    { company: "GeneralElectric", y2005: 348.45, y2004: 328.54},
    { company: "Microsoft", y2005: 279.02, y2004: 297.02},
    { company: "Citigroup", y2005: 230.93, y2004: 255.3},
    { company: "Royal Dutch Shell plc", y2005: 203.52, y2004: 173.54},
    { company: "Procted & Gamble", y2005: 197.12, y2004: 131.89}
  ];

  $("#faq-area").dxChart({
    title: "Corporations with Highest Market Value",
    dataSource: dataSource,
    commonSeriesSettings: {
      type: "splineArea",
      argumentField: "company"
    },
    argumentAxis:{
      valueMarginsEnabled: false
    },
    series: [
      { valueField: "y2005", name: "2005" },
      { valueField: "y2004", name: "2004" }
    ],
    legend: {
      verticalAlignment: "bottom",
      horizontalAlignment: "center"
    }
  });
}


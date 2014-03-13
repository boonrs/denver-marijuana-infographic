
$( document ).ready(function() {
  revenueArea();
  revenueDonut();
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesarea -->
function revenueArea() {
  var dataSource = [
    { quarter: "Q1 2013", recreational: 0, medical: 120000000 },
    { quarter: "Q2 2013", recreational: 0, medical: 150000000 },
    { quarter: "Q3 2013", recreational: 0, medical: 170000000},
    { quarter: "Q4 2013", recreational: 0, medical: 199000000 },
    { quarter: "Q1 2014", recreational: 500000000, medical: 400000000 }
  ];

  $("#revenue-area").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        type: "area",
        argumentField: "quarter"
    },
    series: [
        { valueField: "recreational", name: "Recreational" },
        { valueField: "medical", name: "Medical" }
    ],
    title: "Marijuana Revenue in Denver",
    argumentAxis:{
        valueMarginsEnabled: false
    },
  valueAxis:{
    label: {
      format: "millions"
    }
  },
    legend: {
        verticalAlignment: "bottom",
        horizontalAlignment: "center"
    }
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/piecustomappearancedoughnutwithselection -->
function revenueDonut() {
  var dataSource = [
    { strain: "Medical", money: 109000000 },
    { strain: "Recreational", money: 19000000}
  ];

  $("#revenue-donut").dxPieChart({
    dataSource: dataSource,
    palette: "Soft Pastel",
    title: "Where Marijuana Revenue Came From",
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
      argumentField: "strain",
      valueField: "money",
      hoverStyle: {
        color: "#ffd700" 
      }
    }]
  });
}

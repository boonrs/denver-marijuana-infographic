
$( document ).ready(function() {
  revenueArea();
  revenueDonut();
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesarea -->
function revenueArea() {
  var dataSource = [
    { country: "China", y014: 320866959, y1564: 853191410, y65: 87774113 },
    { country: "India", y014: 340419115, y1564: 626520945, y65: 47063757 },
    { country: "United States", y014: 58554755, y1564: 182172625, y65: 34835293 },
    { country: "Indonesia", y014: 68715705, y1564: 146014815, y65: 10053690 },
    { country: "Brazil", y014: 50278034, y1564: 113391494, y65: 9190842 },
    { country: "Russia", y014: 26465156, y1564: 101123777, y65: 18412243 }
  ];

  $("#revenue-area").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        type: "area",
        argumentField: "country"
    },
    series: [
        { valueField: "y1564", name: "15-64 years" },
        { valueField: "y014", name: "0-14 years" },
        { valueField: "y65", name: "65 years and older" }
    ],
    title: "Population: Age Structure (2000)",
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
    { country: "USA", medals: 110 },
    { country: "China", medals: 100 },
    { country: "Russia", medals: 72 },
    { country: "Britain", medals: 47 },
    { country: "Australia", medals: 46 },
    { country: "Germany", medals: 41 },
    { country: "France", medals: 40 },
    { country: "South Korea", medals: 31 }
  ];

  $("#revenue-donut").dxPieChart({
    dataSource: dataSource,
    palette: "Soft Pastel",
    title: "Olympic Medals in 2008",
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
      argumentField: "country",
      valueField: "medals",
      hoverStyle: {
        color: "#ffd700" 
      }
    }]
  });
}

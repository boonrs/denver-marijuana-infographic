
$( document ).ready(function() {
  facilitiesLineGraph();
  facilitiesDonut();
  facilitiesBar();
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartslineandpointseriesline -->
function facilitiesLineGraph() {
  var dataSource = [
    { year: 1950, europe: 546, americas: 332, africa: 227 },
    { year: 1960, europe: 605, americas: 417, africa: 283 },
    { year: 1970, europe: 656, americas: 513, africa: 361 },
    { year: 1980, europe: 694, americas: 614, africa: 471 },
    { year: 1990, europe: 721, americas: 721, africa: 623 },
    { year: 2000, europe: 730, americas: 836, africa: 797 },
    { year: 2010, europe: 728, americas: 935, africa: 982 },
    { year: 2020, europe: 721, americas: 1027, africa: 1189 },
    { year: 2030, europe: 704, americas: 1110, africa: 1416 },
    { year: 2040, europe: 680, americas: 1178, africa: 1665 },
    { year: 2050, europe: 650, americas: 1231, africa: 1937 }
  ]; 

  $("#facilities-line").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        argumentField: "year"
    },
    series: [
        { valueField: "europe", name: "Europe" },
        { valueField: "americas", name: "Americas" },
        { valueField: "africa", name: "Africa" }
    ],
    argumentAxis:{
        grid:{
            visible: true
        }
    },
    tooltip:{
        enabled: true
    },
    title: "Historic, Current and Future Population",
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
function facilitiesDonut() {
  var dataSource = [
    {region: "Asia", val: 4119626293},
    {region: "Africa", val: 1012956064},
    {region: "Northern America", val: 344124520},
    {region: "Latin America and the Caribbean", val: 590946440},
    {region: "Europe", val: 727082222},
    {region: "Oceania", val: 35104756}
  ];

  $("#facilities-donut").dxPieChart({
    dataSource: dataSource,
    title: "The Population of Continents and Regions",
    tooltip: {
        enabled: true,
        format:"millions",
        percentPrecision: 2,
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
        argumentField: "region",
        label: {
            visible: true,
            format: "millions",
            connector: {
                visible: true
            }
        }
    }]
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriessimplestsingle -->
function facilitiesBar() {
  $("#facilities-bar").dxChart({
    dataSource: [
        {day: "Monday", oranges: 3},
        {day: "Tuesday", oranges: 2},
        {day: "Wednesday", oranges: 3},
        {day: "Thursday", oranges: 4},
        {day: "Friday", oranges: 6},
        {day: "Saturday", oranges: 11},
        {day: "Sunday", oranges: 4} ],
 
    series: {
        argumentField: "day",
        valueField: "oranges",
        name: "My oranges",
        type: "bar",
        color: '#ffa500'
    }
  });
}


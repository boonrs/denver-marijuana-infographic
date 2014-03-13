
$( document ).ready(function() {
  facilitiesLineGraph();
  facilitiesDonut();
  facilitiesBar();
});

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartslineandpointseriesline -->
function facilitiesLineGraph() {
  var dataSource = [
    { quarter: "Q1 2013", number: 12},
    { quarter: "Q2 2013", number: 50},
    { quarter: "Q3 2013", number: 52},
    { quarter: "Q4 2013", number: 54},
    { quarter: "Q1 2014", number: 110}
  ]; 

  $("#facilities-line").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        argumentField: "quarter"
    },
    series: [
        { valueField: "number", name: "Number" }
    ],
    argumentAxis:{
        grid:{
            visible: true
        }
    },
    tooltip:{
        enabled: true
    },
    title: "Number of Marijuana Facilities in Denver",
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
    {type: "Recreational Retail Stores", val: 28},
    {type: "Medical Centers", val: 28},
    {type: "Grow Facilities", val: 28}
  ];

  $("#facilities-donut").dxPieChart({
    dataSource: dataSource,
    title: "Types of Marijuana Facilities",
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
        argumentField: "type",
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
function facilitiesBar() {
  $("#facilities-bar").dxChart({
    dataSource: [
        {quarter: "Q1 2013", employees: 3},
        {quarter: "Q2 2013", employees: 2},
        {quarter: "Q3 2013", employees: 3},
        {quarter: "Q4 2013", employees: 4},
        {quarter: "Q1 2014", employees: 6} ],
 
    series: {
        argumentField: "quarter",
        valueField: "employees",
        name: "Employees",
        type: "bar",
        color: 'white'
    }
  });
}


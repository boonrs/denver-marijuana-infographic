
$( document ).ready(function() {
  revenueCount(revenue.big_number);
  revenueArea(revenue.over_time);
  revenueSource(revenue.types);
});

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
}

function revenueSource(types) {
  $("#revenue-donut-description").text(types.description);
  d3.csv("data/revenue-source.csv", function(error, data) {
    nv.addGraph(function() {
      var width = 300, height = 400;
      var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
        .color(["#4dddff", "#b3eaf4"])
        .width(width).height(height);    //Set the height and width of the chart
        chart.legend.rightAlign(true)
        chart.legend.margin({top: 20, right: 20, bottom: 0, left: 0})
        ;

      d3.select("#revenue-donut")
        .append("svg")
        .datum(data)
        .transition().duration(350)
        .call(chart);


      return chart;
    });
  });
}

<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesarea -->
function revenueArea(over_time) {
  $("#revenue-area").dxChart({
    dataSource: over_time.data,
    commonSeriesSettings: {
        type: "line",
        argumentField: over_time.argument,
    },
    series: [
        { valueField: over_time.value1, name: over_time.value1_name, color:'#fff' },
        { valueField: over_time.value2, name: over_time.value2_name, color:'#b3dce8'  }
    ],
    title: {
            text: over_time.title,
            font: {
                color: 'white',
                family: 'Helvetica, Arial, sans-serif',
                opacity: 0.9,
                size: 25,
                weight: 400
            }
        },
    argumentAxis:{
        valueMarginsEnabled: false,

    },
    commonAxisSettings: {
            label: {
                overlappingBehavior: {
                    mode: 'rotate',
                    rotationAngle: 45
                }, 
                font: { 
                  color: 'white', 
                  family: 'Helvetica, Arial, sans-serif',
                  size: 12,
                  weight: 100
                }
              
            }
        },
  valueAxis:{
    label: {
      format: over_time.value_label
    }

  },
  legend: {
      verticalAlignment: "bottom",
      horizontalAlignment: "center",
      font: {
        color: 'white', 
        family: 'Helvetica, Arial, sans-serif',
        size: 12,
        weight: 100
      }
  },
  tooltip: {
    enabled: true,
    format: 'currency',
    color: '#5395a5'
  },
  });
}
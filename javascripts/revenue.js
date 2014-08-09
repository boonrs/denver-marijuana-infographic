
$( document ).ready(function() {
  revenuesSource("http://data.denvergov.org/dataset/city-and-county-of-denver-marijuana-sales-tax");
  revenueCount(revenue.big_number);
  revenueArea(revenue.over_time);
  revenueDonut(revenue.types);
});

function revenuesSource(url) {
  $("#revenue-source").attr('href', url);
}

function revenueCount(big_number) {
  $("#revenue-number").text(big_number.total);
  $("#revenue-number-strong").text(big_number.bold_description);
  $("#revenue-number-description").text(big_number.description);
}

function revenueDonut(types) {
  $("#revenue-donut-description").text(types.description);
  var svg = dimple.newSvg("#revenue-donut", 590, 400);
  d3.csv("/data/revenue-current-quarter.csv", function (data) {
    var myChart = new dimple.chart(svg, data);
    myChart.addMeasureAxis("p", "value");
    var ring = myChart.addSeries("label", dimple.plot.pie);
    ring.getTooltipText = function (e) {
      return [ e.aggField[0], formatPercent(e.piePct) ];
    };

    // Styling: Change this Kavi!
    ring.innerRadius = "50%";
    myChart.defaultColors = [
      new dimple.color("#4dddff"),
      new dimple.color("#b3eaf4")
    ];
    myChart.addLegend("20%,20px","1%,20px","10%,20px","10%,20px");
    myChart.draw();
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
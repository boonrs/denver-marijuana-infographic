
$( document ).ready(function() {
  crimeStacked();
});

<!-- To theme: http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsareaseriesspline -->
<!-- http://chartjs.devexpress.com/Demos/VizGallery/#chart/chartsbarseriesfullstacked -->
function crimeStacked() {
  var dataSource = [
    { country: "USA", hydro: 59.8, oil: 937.6, gas: 582, coal: 564.3, nuclear: 187.9 },
    { country: "China", hydro: 74.2, oil: 308.6, gas: 35.1, coal: 956.9, nuclear: 11.3 },
    { country: "Russia", hydro: 40, oil: 128.5, gas: 361.8, coal: 105, nuclear: 32.4 },
    { country: "Japan", hydro: 22.6, oil: 241.5, gas: 64.9, coal: 120.8, nuclear: 64.8 },
    { country: "India", hydro: 19, oil: 119.3, gas: 28.9, coal: 204.8, nuclear: 3.8 },
    { country: "Germany", hydro: 6.1, oil: 123.6, gas: 77.3, coal: 85.7, nuclear: 37.8 }
  ];

  $("#crime-stacked").dxChart({
    dataSource: dataSource,
    commonSeriesSettings: {
        argumentField: "country",
        type: "fullStackedBar"
    },
    series: [
        { valueField: "hydro", name: "Hydro-electric" },
        { valueField: "oil", name: "Oil" },
        { valueField: "gas", name: "Natural gas" },
        { valueField: "coal", name: "Coal" },
        { valueField: "nuclear", name: "Nuclear" }
    ],
    legend: {
        verticalAlignment: "top",
        horizontalAlignment: "center",
        itemTextPosition: "right"
    },
    title: "Criminal Offenses",
    tooltip: {
        enabled: true,
        customizeText: function () {
            return this.percentText + " - " + this.valueText;
        }
    }
  });
}


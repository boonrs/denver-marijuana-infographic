
$( document ).ready(function() {
  crimeCount(crime.big_number);
  crimeHandcuffs(crime.arrests);
  crimeSpeech(crime.speech);
  crimeOffenses();
});

function crimeOffenses() {
  d3.csv("data/offenses.csv", function(error, data) {
    nv.addGraph(function() {
      var chart = nv.models.multiBarChart()
        .transitionDuration(350)
        .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.1)    //Distance between each group of bars.
        .color(["#bce0b0", "#79c161", "#41852b", "#162d0e"])
        .height( 500)
      ;
      
      chart.yAxis
          .tickFormat(d3.format(',.1f'));

      d3.select('#crime-stacked')
        .append("svg")
          .datum(formatOffenseData(data))
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  });
}

function formatOffenseData(data) {
  var consumption = [];
  var industry = [];
  var nonindustry = [];
  var incidentally = [];
  
  data.forEach(function(row) {
    consumption.push({x:row.quarter, y:row.consumption});
    industry.push({x:row.quarter, y:row.industry});
    nonindustry.push({x:row.quarter, y:row.nonindustry});
    incidentally.push({x:row.quarter, y:row.incidentally});
  });

  var formatted = [{
      key: "Public Consumption Tickets",
      values: consumption
    },
    {
      key: "Industry Related Crimes",
      values: industry
    },
    {
      key: "Non-Industry Related Crimes",
      values: nonindustry
    },
    {
      key: "Incidentally Related Crimes",
      values: incidentally
    }
  ];

  return formatted;
}

function crimeCount(big_number) {
  $("#crime-number").text(big_number.total)
  $("#crime-number-strong").text(big_number.description_bold)
  $("#crime-number-description").text(big_number.description)
}

function crimeHandcuffs(handcuffs) {
    $("#crime-handcuffs").text(handcuffs.title);
}

function crimeSpeech(speech) {
    $("#crime-speech").text(speech.title);
}


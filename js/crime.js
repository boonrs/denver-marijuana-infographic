$( document ).ready(function() {
  populateStackedBarGraph("crime-mj-vs-all-stacked-bar-graph");
  populateLineGraph("crime-mj-line-graph", "Quarter", "Total", "Series");
  populateLineGraph("crime-all-line-graph", "Quarter", "Total", "Series");
});
stLight.options({publisher: "46e4833a-a8e0-486e-9849-76d8fee2f6fe", doNotHash: false, doNotCopy: false, hashAddressBar: false});

var app = {} ;

$(document).ready(function(){
  app.hookupScrollShadow();
})

function populateBigNumber(id) {
  var csvFile = "data/" + id + ".csv";
  var selector = "#" + id;
  d3.csv(csvFile, function(error, data) {
    if(error){
      console.log(error);
    }
    else {
      $(selector).text(data[0].big);
      $(".bigtext").bigtext();
    }
  });
}

// Closure
(function(){
/**
* Decimal adjustment of a number.
*
* @param {String} type The type of adjustment.
* @param {Number} value The number.
* @param {Integer} exp The exponent (the 10 logarithm of the adjustment base).
* @returns {Number} The adjusted value.
*/
function decimalAdjust(type, value, exp) {
// If the exp is undefined or zero...
if (typeof exp === 'undefined' || +exp === 0) {
return Math[type](value);
}
value = +value;
exp = +exp;
// If the value is not a number or the exp is not an integer...
if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
return NaN;
}
// Shift
value = value.toString().split('e');
value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
// Shift back
value = value.toString().split('e');
return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
// Decimal round
if (!Math.round10) {
Math.round10 = function(value, exp) {
return decimalAdjust('round', value, exp);
};
}
// Decimal floor
if (!Math.floor10) {
Math.floor10 = function(value, exp) {
return decimalAdjust('floor', value, exp);
};
}
// Decimal ceil
if (!Math.ceil10) {
Math.ceil10 = function(value, exp) {
return decimalAdjust('ceil', value, exp);
};
}
})();
function formatPercent(number){
return (Math.round10(number * 100, -1)) + '%';
}
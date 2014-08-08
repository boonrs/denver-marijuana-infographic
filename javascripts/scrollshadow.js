app.hookupScrollShadow = function() {

  var  mn = $(".main-nav");
  var  ns = "nav-shadow";

  $(window).scroll(function() {
    console.log($(this).scrollTop())
    console.log(mn, ns)
    if( $(this).scrollTop() > 80 ) {
      mn.addClass(ns);

    } else {
      mn.removeClass(ns);
    }
  });

} 

$(".nav a").on("click", function(event) {
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
  if ($(event.target).attr('href').search(/^#/) == 0) {
    event.preventDefault();
    if ($(event.target).attr('href') == "#" || $(event.target).attr('href') == "#top") {
      desiredPosition = 0;
    } else {
      desiredPosition = $($(this).attr('href')).offset().top - parseInt($('body').css('padding-top'));
    }
    $(document).unbind("scroll");
    $("html, body").animate({
      scrollTop: desiredPosition + "px"
    }, function() {
      $(document).on("scroll", scrollHandler);
    });
  }
});

var scrollHandler = function(event) {
  var offsetsToIds = {};
  var bodyPadding = parseInt($('body').css('padding-top'));
  $('.navbar-nav a').each(function() {
    var id = $(this).attr('href');
    offsetsToIds[parseInt($(id).offset().top - bodyPadding)] = id;
  });

  var offsets = Object.keys(offsetsToIds).map(function(elem) {
    return parseInt(elem);
  });

  var highestOffset = 0;

  for (var i = 0; i < offsets.length; i++) {
    if ($(document).scrollTop() < offsets[i]) {
      break;
    } else {
      highestOffset = offsets[i];
    }
  }

  var currentId = offsetsToIds[highestOffset];

  $(".nav").find(".active").removeClass("active");
  $('a[href=' + currentId + ']').parent().addClass("active");
};

$(document).on("scroll", scrollHandler);
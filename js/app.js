// Add custom click handler to navigation anchors.
$(".nav a").on("click", function(event) {
  // Add active class to selected anchor and remove active class from all other anchors.
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");

  // If anchor target is on the current page, disable the default event handler and
  // animate scroll to target location.
  if ($(event.target).attr('href').search(/^#/) == 0) {
    event.preventDefault();

    // If target is the top of page, make the position to scroll to 0.
    if ($(event.target).attr('href') == "#" || $(event.target).attr('href') == "#top") {
      desiredPosition = 0;
    } else {
      // The top padding on the body needs to be added desired position because the
      // navigation bar is a fixed position element.
      desiredPosition = $($(this).attr('href')).offset().top - parseInt($('body').css('padding-top'));
    }

    // Remove scroll event handler until animation is complete. This prevents the active
    // navigation anchor from changing as the page animates the scroll.
    $(document).unbind("scroll");

    // Animate the page scroll and add scroll event handler when complete.
    $("html, body").animate({
      scrollTop: desiredPosition + "px"
    }, function() {
      $(document).on("scroll", scrollHandler);
    });
  }
});

// This scroll event handler sets the active class on the appropriate navigation anchor
// as the page is scrolled.
var scrollHandler = function(event) {
  // An object to hold a map of page section IDs to positions.
  var offsetsToIds = {};
  // Determine current top padding of body element.
  var bodyPadding = parseInt($('body').css('padding-top'));

  // For each navigation anchor target, determine the postion of that ID on the page,
  // subtract the body top padding from that value and add the position and ID key/value
  // pair to the offsetsToIds object.
  $('.navbar-nav a').each(function() {
    var id = $(this).attr('href');
    offsetsToIds[parseInt($(id).offset().top - bodyPadding)] = id;
  });

  // Create array of positions from offsetsToIds object.
  var offsets = Object.keys(offsetsToIds).map(function(elem) {
    return parseInt(elem);
  });

  // Variable to hold highest page section position that is less than current page position.
  var highestOffset = 0;

  // Check each page section position to determine the highest one less than the current
  // page position.
  for (var i = 0; i < offsets.length; i++) {
    if ($(document).scrollTop() < offsets[i]) {
      break;
    } else {
      highestOffset = offsets[i];
    }
  }

  // Retrieve the ID for the previously determine highest page section position.
  var currentId = offsetsToIds[highestOffset];

  // Remove the active class from all the navigation anchors and add it to anchor
  // that has a target of the previously determined page section ID.
  $(".nav").find(".active").removeClass("active");
  $('a[href=' + currentId + ']').parent().addClass("active");
};

$(document).on("scroll", scrollHandler);
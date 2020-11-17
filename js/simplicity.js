(function($) {
Drupal.behaviors.simplicity = {};
Drupal.behaviors.simplicity.attach = function(context, settings) {
  // container id begins with webform-ajax-wrapper
  $('.webform-client-form', context).webformAjaxSlide({
    loadingDummyMsg: Drupal.t('loading'),
    onSlideBegin: function (ajaxOptions) {},
    onSlideFinished: function (ajaxOptions) {},
    onLastSlideFinished: function (ajaxOptions) {}
  });
};

Drupal.behaviors.clickableTeasers = {};
Drupal.behaviors.clickableTeasers.attach = function(context, settings) {
  $('.node-teaser', context).click(function(event) {
    window.location.href = $('.node-readmore a', this).attr('href');
  }).addClass('clickable');
};

Drupal.behaviors.mobilemenu = {};
Drupal.behaviors.mobilemenu.attach = function(context, settings) {
  if ($.fn.mobilemenu) {
    $('#main-menu', context).mobilemenu({
      dimElement: '.campaignion-dialog-wrapper',
      shiftBodyAside: false,
      adaptFullHeightOnResize: false
    });
  }
};

Drupal.behaviors.showMore = {};
Drupal.behaviors.showMore.attach = function (context, settings) {
  // Link for revealing more info.
  $('.show-more', context).each(function () {
    var $toggle = $(this);
    var $target = $($toggle.attr('href'));

    if ($toggle.is(':visible') && $target.length) {
      $target.hide();
      $toggle.on('click', function (e) {
        $toggle.hide();
        $target.slideDown();
        e.preventDefault();
      });
    }
  });
  // Class for smooth scrolling to anchor.
  $('a.scroll', context).on('click', function (e) {
    $('html,body').animate({scrollTop:$(e.currentTarget.hash).offset().top}, 500);
    e.preventDefault();
  });
};

Drupal.behaviors.donationAmount = {};
Drupal.behaviors.donationAmount.attach = function(context, settings) {
  var $components = $('.donation-amount .select-or-other', context);
  // Mark the other checkbox / radio element for styling.
  $components.find('.select-or-other-select input[value="select_or_other"]').closest('.form-item').addClass('other-amount');
  $components.find('.select-or-other').on('select-or-other-update', function (event, data) {
    // Set the .select-or-other-checked class also on the .select-or-other-other.
    $(event.target).find('.select-or-other-other').toggleClass('select-or-other-checked', data.otherSelected);
  });
};

})(jQuery);

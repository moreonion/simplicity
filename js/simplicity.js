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
}

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


Drupal.behaviors.selectOrOther = {};
Drupal.behaviors.selectOrOther.attach = function(context, settings) {
  // always show 'other' textfield for donation amount if select-or-other is enabled
  var $donationComponent = $('.donation-amount', context);
  var $donationSelect = $('.select-or-other-select', $donationComponent);
  var $donationOtherRadio = $('[value="select_or_other"]', $donationSelect);
  var $donationRegularRadios = $('input[type=radio]', $donationSelect).not($donationOtherRadio);
  var $donationOther = $('.select-or-other-other', $donationComponent);
  // hide by js so it will show up, when js is disabled
  // therefor no functionality would be hidden
  $donationOtherRadio.closest('.form-item').addClass('other-amount');

  if ($donationOther.length > 0) {
    // IE 7 needs bind on document for change
    $(document).on('click', '.donation-amount .select-or-other-other', function (e) {
      var value = e.target.value;
      // validation should be done in another place
      // trigger change to get picker to update the state
      $donationOtherRadio.prop('checked', true).trigger('change');
      $donationOther.addClass('select-or-other-checked');
    });
    $donationRegularRadios.on('click', function (e) {
      $donationOther.removeClass('select-or-other-checked');
    });
    // also add class if the other option has already been selected (e.g. when returning to webform page)
    if ($donationOtherRadio.prop('checked')) {
      $donationOther.addClass('select-or-other-checked');
    }
  }
};

})(jQuery);

<?php

/**
 * Implements HOOK_preprocess_field.
 *
 * Overrides pgbar settings for teasers to
 * always display pgbar as progress bar.
 */
function simplicity_preprocess_field(&$vars) {
  $element = &$vars['element'];
 
  if (   $element['#field_type'] == 'pgbar'
      && in_array($element['#view_mode'], array('teaser'))) {
    $vars['items'][0]['#theme'][0] = 'pgbar__pbgar';
  }
}

/**
 * Implements HOOK_element_info_alter.
 */
function simplicity_element_info_alter(&$type) {
  if (!empty($type['select_or_other']['#process'])) {
    $type['select_or_other']['#process'][] = 'simplicity_element_process';
  }
}

/**
 * Helper function to provide a visible label on "donation_amount" for the currency.
 */
function simplicity_element_process($element, &$form_state) {
  if (empty($element['#webform_component'])) {
   return;
  }
  $is_donation_amount = $element['#webform_component']['form_key'] == 'donation_amount';
  $has_other_option = !empty($element['other']);
  $is_type_radio = $element['#select_type'] == 'radios';

  if ($is_donation_amount && $has_other_option) {
    // add a currency symbol as label
    $element['other']['#title'] = t('€');
    unset($element['other']['#title_display']);
    if ($is_type_radio) {
      // always show other textfield (needs opt-out patch for select_or_other)
      $element['#attributes']['class'][] = 'select-or-other-disabled-js';
    }
  }
  return $element;
}


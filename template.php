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
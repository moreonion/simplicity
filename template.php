<?php

/**
 * Implements hook_preprocess_field().
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
 * Implements hook_less_paths_alter().
 *
 * Adds the path of the current theme and all
 * its base themes to the less import paths.
 *
 * If a file imported in a base theme's less file does
 * not exist, the less compiler looks for it in the current
 * theme, then the current theme's base theme, and so on.
 * Using paths relative to the theme instead of the less
 * file allows subthemes to override imported files.
 */
function simplicity_less_paths_alter(&$less_paths, $system_name){
  $themes = $GLOBALS['theme_info']->base_themes;
  $current_theme = $GLOBALS['theme'];
  foreach (array_keys($themes) as $theme){
    $themes[$theme] = DRUPAL_ROOT . '/' . drupal_get_path('theme', $theme);
  }
  $themes[$current_theme] =  DRUPAL_ROOT . '/' . drupal_get_path('theme', $current_theme);

  if (isset($themes[$system_name])) {
    $less_paths += array_reverse(array_values($themes));
  }
}

/**
 * Implements hook_system_info_alter().
 *
 * Use the dynamic LESS file if the less-module is configured correctly.
 */
function simplicity_system_info_alter(&$info, $file, $type) {
  if ($file->name == 'simplicity') {
    if (module_exists('less') && variable_get('less_engine') == 'less.js') {
      foreach ($info['stylesheets']['screen'] as &$stylesheet) {
        if ($stylesheet == 'css/style.css') {
          $stylesheet = 'css/style.less';
        }
      }
    }
  }
}

/**
 * Add extra classes to certain webform elements.
 */
function simplicity_preprocess_webform_element(&$variables) {
  $element = &$variables['element'];
  $component = $element['#webform_component'];

  $wrapper_classes = [];
  if ($component['form_key'] == 'donation_amount') {
    $wrapper_classes[] = 'donation-amount';
  }

  $element['#wrapper_attributes']['class'] = array_merge($element['#wrapper_attributes']['class'], $wrapper_classes);
}

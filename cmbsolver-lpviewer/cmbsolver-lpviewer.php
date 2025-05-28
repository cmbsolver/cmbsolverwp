<?php
/**
 * Plugin Name: CMB Solver LP Viewer
 * Description: A plugin to view page information with image files and text content.
 * Version: 1.0.0
 * Author: CMBSOLVER
 * Text Domain: cmbsolver-lpviewer
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define plugin constants
define('CMBSLPV_VERSION', '1.0.0');
define('CMBSLPV_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CMBSLPV_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue plugin styles and scripts
 */
function cmbslpv_enqueue_scripts() {
    wp_enqueue_style(
        'cmbslpv-styles',
        CMBSLPV_PLUGIN_URL . 'css/lpviewer.css',
        array(),
        CMBSLPV_VERSION
    );

    wp_enqueue_script(
        'cmbslpv-js',
        CMBSLPV_PLUGIN_URL . 'js/lpviewer.js',
        array('jquery'),
        CMBSLPV_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'cmbslpv_enqueue_scripts');

/**
 * Register the shortcode
 */
function cmbslpv_register_shortcode() {
    require_once CMBSLPV_PLUGIN_DIR . 'includes/shortcode.php';
    add_shortcode('lpviewer', 'cmbslpv_shortcode');
}
add_action('init', 'cmbslpv_register_shortcode');

/**
 * Pass variables to JavaScript
 */
function cmbslpv_localize_script() {
    wp_localize_script('cmbslpv-js', 'lpviewer_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'plugin_url' => CMBSLPV_PLUGIN_URL,
    ));
}
add_action('wp_enqueue_scripts', 'cmbslpv_localize_script');

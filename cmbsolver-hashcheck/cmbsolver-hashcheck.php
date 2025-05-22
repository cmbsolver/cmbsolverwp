<?php
/*
Plugin Name: CMB Solver Hash Checker
Description: A tool for checking and displaying hashes using various algorithms
Version: 1.0
Author: CMBSOLVER
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Add WASM MIME type support
function add_wasm_mime_type($mimes) {
    $mimes['wasm'] = 'application/wasm';
    return $mimes;
}
add_filter('mime_types', 'add_wasm_mime_type');

// Enqueue necessary scripts and styles
function cmbsolver_hashcheck_scripts() {
    // Enqueue the main CSS
    wp_enqueue_style('cmbsolver-hashcheck-style', plugins_url('css/style.css', __FILE__));

    // Add our WASM loader fix first (before any WASM-using scripts)
    wp_register_script('cmbsolver-wasm-loader-fix', plugins_url('js/wasm-loader-fix.js', __FILE__), array(), '1.0', true);
    wp_enqueue_script('cmbsolver-wasm-loader-fix');

    // Register and enqueue all hash library scripts in the correct order
    // BLAKE hash
    wp_register_script('cmbsolver-blake-wrapped', plugins_url('js/blake-wrapped.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-blake-wrapped');

    // SHA3 hash
    wp_register_script('cmbsolver-sha3-wrapped', plugins_url('js/sha3-wrapped.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-sha3-wrapped');

    // MD6 hash
    wp_register_script('cmbsolver-md6-wrapped', plugins_url('js/md6-wrapped.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-md6-wrapped');

    // FNV512 hash
    wp_register_script('cmbsolver-fnv512-wrapped', plugins_url('js/fnv512-wrapped.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-fnv512-wrapped');

    // Streebog hash
    wp_register_script('cmbsolver-streebog-wrapped', plugins_url('js/streebog-wrapped.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-streebog-wrapped');

    // Blake2b hash
    wp_register_script('cmbsolver-blake2b', plugins_url('js/blake2b.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-blake2b');

    // SHA512 hash
    wp_register_script('cmbsolver-sha512', plugins_url('js/sha512.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-sha512');

    // Grostl hash
    wp_register_script('cmbsolver-grostl-wasm', plugins_url('js/grostl-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-grostl-wasm');

    // JH hash
    wp_register_script('cmbsolver-jh-wasm', plugins_url('js/jh-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-jh-wasm');

    // Skein hash
    wp_register_script('cmbsolver-skein-wasm', plugins_url('js/skein-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-skein-wasm');

    // LSH hash
    wp_register_script('cmbsolver-lsh-wasm', plugins_url('js/lsh-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-lsh-wasm');

    // Cubehash hash
    wp_register_script('cmbsolver-cubehash-wasm', plugins_url('js/cubehash-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-cubehash-wasm');

    // Whirlpool hash
    wp_register_script('cmbsolver-whirlpool-wasm', plugins_url('js/whirlpool-wasm.js', __FILE__), array('jquery', 'cmbsolver-wasm-loader-fix'), '1.0', true);
    wp_enqueue_script('cmbsolver-whirlpool-wasm');

    // Register hashbox script with all hash libraries as dependencies
    $hash_deps = array(
        'jquery',
        'cmbsolver-blake-wrapped',
        'cmbsolver-sha3-wrapped',
        'cmbsolver-md6-wrapped',
        'cmbsolver-fnv512-wrapped',
        'cmbsolver-streebog-wrapped',
        'cmbsolver-blake2b',
        'cmbsolver-sha512',
        'cmbsolver-grostl-wasm',
        'cmbsolver-jh-wasm',
        'cmbsolver-skein-wasm',
        'cmbsolver-lsh-wasm',
        'cmbsolver-cubehash-wasm',
        'cmbsolver-whirlpool-wasm'
    );

    wp_register_script('cmbsolver-hashbox', plugins_url('js/hashbox.js', __FILE__), $hash_deps, '1.0', true);
    wp_enqueue_script('cmbsolver-hashbox');

    // Register main script with proper dependencies
    wp_register_script('cmbsolver-hashcheck-script', plugins_url('js/script.js', __FILE__), array('jquery', 'cmbsolver-hashbox'), '1.0', true);
    wp_enqueue_script('cmbsolver-hashcheck-script');

    // Add inline script to make HashingBox available globally
    wp_add_inline_script('cmbsolver-hashbox', 'window.HashingBox = HashingBox;', 'after');
}
add_action('wp_enqueue_scripts', 'cmbsolver_hashcheck_scripts');

// Create shortcode for the hash checker
function cmbsolver_hashcheck_shortcode() {
    ob_start();
    ?>
    <div class="hashcheck-container">
        <!-- Input Area -->
        <div class="text-label">Text To Hash</div>
        <textarea id="hash-input-area" rows="4" class="wide-input"></textarea>

        <!-- Hash Mode Selection -->
        <div class="hash-controls-row">
            <select id="hash-mode">
                <option value="min">Minimal Algorithms</option>
                <option value="most" selected>Most Algorithms</option>
                <option value="all">All Algorithms</option>
            </select>
            <button id="check-hash-button" class="button">Check Hash</button>
        </div>

        <!-- Results Area -->
        <div class="hash-results-area">
            <h3>Hash Results</h3>
            <div id="hash-results-list"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('hashcheck', 'cmbsolver_hashcheck_shortcode');